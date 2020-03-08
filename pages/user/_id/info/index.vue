
<template>
  <userPage>
    <div slot="list" v-loading="loading">
      <div class="dao">
        <myTokenHeader />
      </div>
      <div v-if="userAddress">
        <a :href="'http://rinkeby.etherscan.io/address/' + userAddress" target="_blank">
          <el-button class="link-btn" size="small">
            <svg-icon icon-class="eth_mini" />
            链上查看
          </el-button>
        </a>
      </div>
      <div>
        <p>tags</p>
        <div>
          <el-tag v-for="(item, index) in tags" :key="index" style="margin-right: 10px;">
            <i class="el-icon-price-tag"></i>
            {{item}}
          </el-tag>
        </div>
      </div>
      <div v-if="urls.length !== 0" class="websites">
        <h3 class="inline h3">
          相关网站
        </h3>
        <div class="inline url">
          <p v-for="(item, index ) in urls" :key="index">
            <a :href="formatUrl(item)" target="_blank" class="link">{{ item }} </a>
          </p>
        </div>
      </div>
      <div v-if="social.length !== 0" class="social">
        <h3 class="inline h3">
          社交账号
        </h3>
        <div class="inline">
          <div v-for="(item, index) in social" :key="index" class="social-icons inline">
            <socialIcon :icon="item.icon" :show-tooltip="true" :content="item.content" />
          </div>
        </div>
      </div>
      <div v-if="social.length === 0 && urls.length === 0 && loading === false" class="social no-data">
        <p>
          暂无信息
        </p>
      </div>
    </div>
  </userPage>
</template>

<script>
import { mapGetters } from 'vuex'
import userPage from '@/components/user/user_page.vue'
import socialIcon from '@/components/social_icon/index.vue'
import myTokenHeader from '@/components/token/my_token_header.vue'

export default {
  components: {
    userPage,
    socialIcon,
    myTokenHeader
  },
  data() {
    return {
      loading: false,
      social: [],
      socialTemplate: [
        {
          icon: 'Email',
          type: 'email',
          content: ''
        },
        {
          icon: 'QQ',
          type: 'qq',
          content: ''
        },
        {
          icon: 'Wechat',
          type: 'wechat',
          content: ''
        },
        {
          icon: 'Weibo',
          type: 'weibo',
          content: ''
        },
        {
          icon: 'Telegram',
          type: 'telegram',
          content: ''
        },
        {
          icon: 'Twitter',
          type: 'twitter',
          content: ''
        },
        {
          icon: 'Facebook',
          type: 'facebook',
          content: ''
        },
        {
          icon: 'Github',
          type: 'github',
          content: ''
        }
      ],
      urls: [],
      tags: [], // tag
      userAddress: '',
    }
  },
  computed: {
    ...mapGetters(['currentUserInfo'])
  },
  mounted() {
    this.getMyUserLinks()
  },
  methods: {
    async getMyUserLinks() {
      this.loading = true
      try {
        const resLinks = await this.$API.getUserLinks({ id: this.$route.params.id })
        if (resLinks.code === 0) {
          const data = resLinks.data
          this.urls = data.websites
          data.socialAccounts.forEach(item => {
            this.socialTemplate.find(age => age.type === item.type).content = item.value
          })
          this.social = this.socialTemplate.filter(age => age.content !== '' && age.content != null)
          this.loading = false
        } else console.log('获取用户信息失败')
      } catch (error) {
        console.log(`获取用户信息失败${error}`)
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


      try {
        this.tags.length = 0

        // 获取自己的job
        const daoUserJob = await factory(this.$API.getDaoUserJob({
          uid: this.currentUserInfo.id
        }))

        let job = daoUserJob.map(i => i.text_english)

        this.tags.push(...job)


        // 获取自己的skill
        const daoUserSkill = await factory(this.$API.getDaoUserSkill({
          uid: this.currentUserInfo.id
        }))
        
        let skill = daoUserSkill.map(i => i.text_english)

        this.tags.push(...skill)


        // 获取自己的skill
        this.userAddress = await factory(this.$API.userAddress({
          uid: this.currentUserInfo.id
        }))

      } catch (error) {
        console.log(error)
      }


    },
    formatUrl(url) {
      const isHttp = url.indexOf('http://')
      const isHttps = url.indexOf('https://')
      if (isHttp !== 0 && isHttps !== 0) url = 'http://' + url
      return url
    }
  }
}
</script>

<style lang="less" scoped>
.social-icons {
  width: 60px;
}
.inline {
  display: inline-flex;
  &.h3 {
    margin-right: 20px;
  }
  &.url {
    display: inline-table;
  }
  a {
    text-decoration: underline;
  }
  a:link {color:black}
  a:visited {color: black}
  a:hover {color:dimgrey}
  a:active {color: darkgray}
}
.websites {
  margin-bottom: 20px;
}
.social {
  padding-bottom: 100px;
}
.no-data {
  text-align: center;
  p {
    margin-top: 40px;
    font-size:14px;
    color:rgba(178,178,178,1);
  }
}
</style>

<style lang="less">
.dao .token-card {
  width: 100%;
  box-sizing: border-box;
}
</style>