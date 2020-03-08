<template>
  <userLayout>
    <template slot="main">
      <h2 class="tag-title">
        {{ $t('user.userInformation') }}
      </h2>
      <div class="set-main">
        <div class="list center">
          <span class="title">{{ $t('avatar') }}</span>
          <img-upload
            :img-upload-done="imgUploadDone"
            :update-type="'avatar'"
            @doneImageUpload="doneImageUpload"
            class="avatar"
          >
            <div slot="uploadButton" class="user-avatar">
              <div class="edit">
                <i class="el-icon-camera" />
                {{ $t('avatar') }}
              </div>
              <img slot="description" v-if="avatar" :src="avatar" alt="avatar">
            </div>
          </img-upload>
        </div>
        <div class="list center">
          <span class="title">
            {{ $t('nickname') }}
          </span>
          <div class="input">
            <el-input
              v-model="username"
              :placeholder="$t('rule.username')"
              maxlength="12"
              show-word-limit
              clearable
            />
          </div>
        </div>
        <!-- <div class="list center">
          <span class="title"> {{ $t('email') }}</span>
          <div class="input">
            <el-input
              v-model="email"
              :placeholder="$t('rule.loginEmailMessage')"
              show-word-limit
              clearable
            />
          </div>
        </div> -->
        <div class="list">
          <span class="title">{{ $t('profile') }}</span>
          <div class="input">
            <el-input
              v-model="introduction"
              :rows="6"
              :placeholder="$t('rule.content')"
              type="textarea"
              maxlength="200"
              show-word-limit
            />
          </div>
        </div>
        <div class="line" />
        <!-- 相关网站 -->
        <div class="social-div">
          <span class="title">
            相关网站
          </span>
          <div v-for="(item, index) in about" :key="index" class="fl ac about-input social-list">
            <el-input v-model="about[index]" class="input" placeholder="请填写网站链接，包含http(s)://" />
            <div v-if="about.length > 1" @click="abountLess(index)" class="about-input-btn">
              <i class="el-icon-minus" />
            </div>
          </div>
          <div v-if="about.length < 5" @click="aboutAdd" class="about-input-btn add">
            <i class="el-icon-plus" />
          </div>
        </div>
        <!-- 社交账号 -->
        <div class="social-div">
          <span class="title right0">
            社交账号
          </span>
          <span class="title-note">
            仅用于信息展示
          </span>
          <div v-for="(item, index) in social" :key="index" class="social-list">
            <p class="social-title">
              {{ item.name }}
              <span v-html="item.tooltip" />
            </p>
            <div class="fl">
              <div class="social-icons">
                <socialIcon :icon="item.symbol" />
              </div>
              <el-input v-model="item.value" :placeholder="item.placeholder" class="social-input" />
            </div>
          </div>
        </div>
        
        <!-- 身份 -->
        <div class="job">
          <p>身份</p>
          <div v-for="(item, index) in job" class="job-checkbox" :key="index">
            <el-checkbox v-model="item.checked" :label="item.text_english" border size="medium"></el-checkbox>
          </div>
        </div>


        <!-- 技能 -->
        <div class="skill">
          <p>技能</p>
          <div v-for="(item, index) in skill" :key="index" class="skill-checkbox">
            <el-checkbox v-model="item.checked" :label="item.text_english" border size="medium"></el-checkbox>
            <el-input-number style="width: 130px;" v-if="item.checked" size="medium" v-model="item.value" :min="1" :max="100"></el-input-number>
          </div>
        </div>

        <!-- 保存 -->
        <div class="line" />
        <el-button :loading="loading" :class="(setProfile || aboutModify || socialModify || jobModify || skillModify) && 'active'" @click="save" class="save ">
          {{ $t('save') }}
        </el-button>
      </div>
    </template>
    <template slot="nav">
      <myAccountNav />
    </template>
  </userLayout>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import userLayout from '@/components/user/user_layout.vue'
import myAccountNav from '@/components/my_account/my_account_nav.vue'
import socialIcon from '@/components/social_icon/index.vue'

import imgUpload from '@/components/imgUpload/index.vue'

export default {
  components: {
    userLayout,
    imgUpload,
    socialIcon,
    myAccountNav
  },
  data() {
    return {
      userData: null,
      linksData: null,
      username: '',
      introduction: '',
      avatar: '',
      setProfile: false, // 是否编辑信息
      imgUploadDone: 0, // 图片是否上传完成
      loading: false,
      numPage: 1,
      aboutModify: false,
      socialModify: false,
      jobModify: false, // 身份
      skillModify: false, // 技能
      about: [''],
      social: [
        {
          symbol: 'Email',
          type: 'email',
          name: 'Email：',
          tooltip: '',
          placeholder: '邮箱',
          url: '',
          value: ''
        },
        {
          symbol: 'QQ',
          type: 'qq',
          name: 'QQ：',
          tooltip: '',
          placeholder: 'QQ帐号',
          url: '',
          value: ''
        },
        {
          symbol: 'Wechat',
          type: 'wechat',
          name: '微信：',
          tooltip: '',
          placeholder: '微信号',
          url: '',
          value: ''
        },
        {
          symbol: 'Weibo',
          type: 'weibo',
          name: '微博：',
          tooltip: '(https://www.weibo.com/<span>帐号</span>)',
          placeholder: '微博用户名(不需要完整URL)',
          url: 'https://www.weibo.com',
          value: ''
        },
        {
          symbol: 'Telegram',
          type: 'telegram',
          name: 'Telegram：',
          tooltip: '',
          placeholder: 'Telegram用户名',
          url: '',
          value: ''
        },
        {
          symbol: 'Twitter',
          type: 'twitter',
          name: 'Twitter：',
          tooltip: '(https://twitter.com/<span>帐号</span>)',
          placeholder: 'Twitter用户名(不需要完整URL)',
          url: 'https://twitter.com',
          value: ''
        },
        {
          symbol: 'Facebook',
          type: 'facebook',
          name: 'Facebook：',
          tooltip: '(https://facebook.com/<span>帐号</span>)',
          placeholder: 'Facebook用户名(不需要完整URL)',
          url: 'https://facebook.com',
          value: ''
        },
        {
          symbol: 'Github',
          type: 'github',
          name: 'Github：',
          tooltip: '(https://github.com/<span>帐号</span>)',
          placeholder: 'Github用户名(不需要完整URL)',
          url: 'https://github.com',
          value: ''
          // resourcesSocialss: [],
          // resourcesWebsites: [],
        }
      ],
      // 身份
      job: [],
      // 技能
      skill: []
    }
  },
  computed: {
    ...mapGetters(['currentUserInfo'])
  },
  watch: {
    username(newVal) {
      if (
        this.detection(newVal, 'username') ||
        this.detectionIntroduction()) this.setProfile = true
      else this.setProfile = false
    },
    introduction(newVal) {
      if (
        this.detection(newVal, 'introduction') ||
        this.detectionUsername()) this.setProfile = true
      else this.setProfile = false
    },
    about: {
      deep: true,
      handler() {
        this.aboutModify = JSON.stringify(this.linksData.websites) !== JSON.stringify(this.about)
      }
    },
    social: {
      deep: true,
      handler() {
        for (const item of this.social) {
          const oSocial = this.linksData.socialAccounts.find(age => age.type === item.type)
          if (oSocial == null) {
            if (item.value !== '') {
              this.socialModify = true
              return
            }
          } else if (oSocial.value !== item.value) {
            this.socialModify = true
            return
          }
        }
        this.socialModify = false
      }
    },
    // 没有对比 job 和 skill是否修改
    job: {
      deep: true,
      handler() {
        this.jobModify = true
      }
    },
    skill: {
      deep: true,
      handler() {
        this.skillModify = true
      }
    }
    // social(newVal) {

    // }
  },
  created() {
  },
  mounted() {
    this.getMyUserData()
  },
  methods: {
    ...mapActions('user', [
      'refreshUser'
    ]),
    // 检测
    detection(val, type) {
      if (type === 'username') return val !== (this.userData.nickname || this.userData.username)
      if (type === 'introduction') return val !== this.userData.introduction
    },
    detectionUsername() {
      return this.username !== (this.userData.nickname || this.userData.username)
    },
    detectionIntroduction() {
      return this.introduction !== this.userData.introduction
    },
    // 输入框内容检测
    checkSaveParams() {
      const introductionLength = 200
      // 中文 字母 数字 1-12
      const reg = /^[\u4E00-\u9FA5A-Za-z0-9]{1,12}$/
      const regEmail = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
      if (!reg.test(this.username)) {
        throw this.$t('rule.strEnglishNumber', ['1-12'])
      } else if (this.introduction.length > introductionLength) {
        throw this.$t('rule.profileNotExceedStr', [introductionLength])
      }
    },
    setAvatarImage(hash) {
      if (hash) this.avatar = this.$ossProcess(hash)
    },
    // 完成上传
    doneImageUpload(res) {
      // console.log(res)
      this.imgUploadDone += Date.now()
      this.refreshUser({ id: this.currentUserInfo.id })
      this.getMyUserData()
    },
    // 获取用户信息 - 转让状态
    async getMyUserData() {
      const setUser = data => {
        // console.log(data)
        this.userData = data
        this.username = data.nickname || data.username
        this.introduction = data.introduction || ''
        this.setAvatarImage(data.avatar)
      }
      const setLinks = data => {
        this.linksData = data
        this.about = [
          ...data.websites.length !== 0 ? data.websites : ['']
        ]
        data.socialAccounts.forEach(item => {
          this.social.find(age => age.type === item.type).value = item.value
        })
      }


      try {
        // 我的信息
        const res = await this.$API.getMyUserData()
        if (res.code === 0) {
          setUser(res.data)
        } else {
          console.log(res.message)
        }
      } catch (error) {
        console.log(error)
      }
      try {
        // 我的信息链接
        const resLinks = await this.$API.getUserLinks({ id: this.currentUserInfo.id })
        if (resLinks.code === 0) {
          setLinks(resLinks.data)
        } else {
          console.log(res.message)
        }
      } catch (error) {
        console.log(error)
      }


      // 工厂函数 返回接口数据
      const factory = async api => {
        try {
          const res = await api
          if (res.code === 0) {
            return res.data
          } else {
            console.log(res.message)
            return
          }
        } catch (error) {
          console.log(error)
          return
        }
      }


      // 身份
      try {
        // 获取身份可选项options
        const daoJob = await factory(this.$API.daoJobOptions())

        let daoJobList = daoJob.map(i => {
          return {
            // 选择状态
            checked: false,
            ...i
          }
        })

        // 获取自己的job
        const daoUserJob = await factory(this.$API.getDaoUserJob({
          uid: this.currentUserInfo.id
        }))

        // 合并数据
        daoJobList.map(item => {
          for (let i = 0; i < daoUserJob.length; i++) {
            const element = daoUserJob[i]
            if (element.jid === item.id) {
              item.checked = true
            }
          }
        })

        this.job = daoJobList

      } catch (error) {
        console.log(error)
      }

      // 技能
      try {
        // 获取技能可选项options
        const daoSkill = await factory(this.$API.daoSkillOptions())

        const daoSkillList = daoSkill.map(i => {
          return {
            // 选择状态
            checked: false,
            value: 1,
            ...i
          }
        })

        // 获取自己的skill
        const daoUserSkill = await factory(this.$API.getDaoUserSkill({
          uid: this.currentUserInfo.id
        }))

        // 合并数据
        daoSkillList.map(item => {
          for (let i = 0; i < daoUserSkill.length; i++) {
            const element = daoUserSkill[i]
            if (element.sid === item.id) {
              item.checked = true
              item.value = element.value
            }
          }
        })

        this.skill = daoSkillList

      } catch (error) {
        console.log(error)
      }



    },
    // 保存按钮
    async save() {

      if (!this.setProfile && !this.aboutModify && !this.socialModify && !this.jobModify || !this.skillModify) return

      const saveProfile = async () => {
        if (!this.setProfile) return

        this.checkSaveParams()

        const requestData = {
          nickname: this.username,
          introduction: this.introduction
        }
        if (this.username === (this.userData.nickname || this.userData.username)) delete requestData.nickname
        if (this.introduction === this.userData.introduction) delete requestData.introduction

        await this.$backendAPI.setProfile(requestData)

        this.setProfile = false
      }
      const saveLinks = async () => {
        if (!this.aboutModify && !this.socialModify) return

        const requestData = {
          websites: this.about.filter(Boolean),
          socialAccounts: (() => {
            const nSocial = {}
            this.social.forEach(item => {
              if (item.value && item.value !== '') {
                nSocial[item.type] = item.value
              }
            })
            return nSocial
          })()
        }

        await this.$backendAPI.setUserLinks(requestData)

        this.aboutModify = false
        this.socialModify = false
      }
      
      // 保存身份
      const saveJobs = async () => {
        if (!this.jobModify) return
        
        // 筛选
        const filterData = data => data.filter(i => i.checked)
        // 格式化数据
        const format = data => {
          if (!data || !data.length) return []
          return data.map(i => ({
              jid: i.id,
              value: 1, // 默认
            })
          )
        }

        const data = {
          creates: this.$utils.compose(format, filterData)(this.job)
        }

        await this.$API.daoUserJob(data)

        this.jobModify = false
      }

      // 保存技能
      const saveSkills = async () => {
        if (!this.skillModify) return
        
        // 筛选
        const filterData = data => data.filter(i => i.checked)
        // 格式化数据
        const format = data => {
          if (!data || !data.length) return []
          return data.map(i => ({
              sid: i.id,
              value: i.value, // 默认
            })
          )
        }

        const data = {
          creates: this.$utils.compose(format, filterData)(this.skill)
        }

        await this.$API.daoUserSkill(data)

        this.skillModify = false
      }

      this.loading = true
      try {
        await Promise.all([saveProfile(), saveLinks(), saveJobs(), saveSkills()])

        this.refreshUser({ id: this.currentUserInfo.id })
        this.getMyUserData()
        this.$message({
          message: this.$t('success.success'),
          type: 'success'
        })
      } catch (error) {
        if (typeof error === 'string') {
          this.$message.error(error)
        } else if (error.response && error.response.data) {
          this.$message.error(error.response.data.message)
        } else {
          console.error(`修改信息失败 catch error ${error}`)
          this.$message.error(this.$t('error.fail'))
        }
      } finally {
        this.loading = false
      }
    },
    aboutAdd() {
      if (this.about.length >= 5) return
      this.about.push('')
    },
    abountLess(i) {
      if (this.about.length <= 1) return
      this.about.splice(i, 1)
    }
  }
}
</script>

<style lang="less" scoped>
.line {
  width: 100%;
  height: 1px;
  background-color: #eee;
}
.list {
    margin: 40px 0;
    padding: 0;
    display: flex;
    &.center {
      align-items: center;
    }
}
.title {
  font-size:18px;
  font-weight:400;
  color:#333;
  line-height:28px;
  margin-right: 20px;
  &.right0 {
    margin-right: 0;
  }
}
.title-note {
  font-size:12px;
  font-weight:400;
  color:#b2b2b2;
  line-height:28px;
}

@avatarWidth: 90px;
.avatar {
  width: @avatarWidth;
  height: @avatarWidth;
  border-radius: 50%;
  background: #eee;
  overflow: hidden;
  cursor: pointer;
  .user-avatar {
    width: 100%;
    height: 100%;
    cursor: pointer;
  }
  .user-avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    cursor: pointer;
  }
  &:hover .edit {
    display: flex;
  }
  .edit{
    display: none;
    cursor: pointer;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    color: #eee;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: rgba(0,0,0,.6);
    font-size: 14px;
    .el-icon-camera {
      font-size: 24px;
      margin-bottom: 4px;
      color: #eee;
    }
  }
}
.icon-avatar {
  width: @avatarWidth;
  height: @avatarWidth;
  color: #bbb;
}
.input {
  width: 400px;
}
.save {
  display: block;
  width:200px;
  height:40px;
  border-radius: @borderRadius6;
  border: none;
  outline: none;
  color: #fff;
  margin: 100px auto 0;
  background-color: #bfbfbf;
  cursor: pointer;
  &.active {
    background: @purpleDark;
  }
}

.social-title {
  padding: 0;
  margin: 12px 0 10px 60px;
  font-size:14px;
  font-weight:400;
  color:rgba(0,0,0,1);
  line-height:20px;
  span {
    span {
      color: red;
    }
  }
}
.social-icons {
  width: 60px;
}
.social-input {
  width: 340px;
}
.social-div {
  padding-top: 24px;
  padding-bottom: 34px;
  .social-list {
    margin-left: 56px;
  }
}
.about-input {
  margin: 0 0 10px;
  .input {
    width: 400px;
  }
}
.about-input-btn {
  width: 24px;
  height: 24px;
  background-color: @purpleDark;
  color: @white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  margin: 0 0 0 10px;
  cursor: pointer;
  &.add {
    margin-left: 56px;
  }
}
.set-main {
  padding-left: 10px;
}
.tag-title {
  font-weight: bold;
  font-size: 20px;
  padding-left: 10px;
  margin: 0;
}

// job
// skill

.job,
.skill {
  &::after {
    display: block;
    content: '';
    width: 0;
    height: 0;
    clear: both;
  }
}

.job-checkbox,
.skill-checkbox {
  float: left;
  margin: 0 10px 10px 0;
}
</style>
