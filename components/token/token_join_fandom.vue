<template>
  <div v-loading="loading" class="fandom-card">
    <div class="fl">
      <h2 class="token-title">
        加入{{ tokenSymbol }}粉丝群
      </h2>
      <a @click="showHelp = true" class="help-click">入群指南 <i class="el-icon-arrow-right" /></a>
    </div>
    <!-- 列表 -->
    <div v-for="(fandom, index) in fandomList" :key="index" class="fl fandom-unit">
      <div class="fandom-text">
        <div class="fl title">
          <el-tooltip :content="fandom.title" class="item" effect="dark" placement="top">
            <h2>
              {{ fandom.title }}
            </h2>
          </el-tooltip>
          <span>（{{ fandom.groupSize }}人）</span>
        </div>
        <p class="condition">
          持有的{{ tokenSymbol }}票 ≥{{ getMinBalance(fandom) }} 即可加群
        </p>
      </div>
      <div>
        <el-button v-if="!isLogined || getMinBalance(fandom) <= balance" @click="addFandom(fandom)" class="add-button top10" size="small">
          加群
        </el-button>
        <div v-else class="disable top10">
          持票不足
        </div>
      </div>
    </div>
    <!-- 分页按钮 -->
    <el-pagination
      v-if="fandomData.length > 5"
      :total="fandomData.length"
      :page-size="pageSize"
      @current-change="handleCurrentChange"
      class="pagination"
      small
      background
      layout="prev, pager, next"
    />

    <!-- [弹窗]入群指南 -->
    <el-dialog :visible.sync="showHelp" width="360px" title="入群指南" center custom-class="fandom-popups-title">
      <!-- <p class="subtitle">
        根据以下步骤操作加入Fan票的粉丝群
      </p> -->
      <div class="fl help-step top">
        <div class="help-text">
          <h3>
            步骤
            <svg-icon class="help-serial" icon-class="step1" />
          </h3>
          <p class="introduction">
            绑定Telegram账号
          </p>
          <p>仅需要绑定一次</p>
        </div>
        <div v-if="bindStatus" class="help-touch">
          <a @click="accountSettings()">
            账号变更
            <i class="el-icon-arrow-right" />
          </a>
          <div class="disable top20">
            已绑定
          </div>
        </div>
        <div v-else class="help-touch">
          <el-button @click="setTelegram()" class="add-button top40">
            绑定
          </el-button>
        </div>
      </div>
      <div class="fl help-step top">
        <div class="help-text">
          <h3>
            步骤
            <svg-icon class="help-serial" icon-class="step2" />
          </h3>
          <p class="introduction">
            完成入群条件
          </p>
          <p>购买并持有特定数量的Fan票</p>
        </div>
      </div>
      <div class="fl help-step">
        <div class="help-text">
          <h3>
            步骤
            <svg-icon class="help-serial" icon-class="step3" />
          </h3>
          <p class="introduction">
            点击加群按钮
          </p>
          <p>根据机器人的引导入群</p>
        </div>
      </div>
      <p class="tips">
        使用该功能需要“科学上网”
      </p>
    </el-dialog>
    <p class="tips">
      {{ fandomData.length > 0 ? '使用该功能需要“科学上网”' : '暂无Fan票粉丝群' }}
    </p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import axios from 'axios'
import utils from '@/utils/utils'

export default {
  components: {
  },
  props: {
    tokenSymbol: {
      type: String,
      required: true
    },
    tokenId: {
      type: Number,
      required: true
    },
    balance: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      showHelp: false,
      bindStatus: false,
      pageNum: 1,
      pageSize: 5,
      fandomData: [],
      loading: true
    }
  },
  computed: {
    ...mapGetters(['isLogined']),
    /** 控制数据是否展开 */
    fandomList() {
      const pageNum = this.pageNum - 1
      return this.fandomData.slice(pageNum * this.pageSize, this.pageNum * this.pageSize)
    }
  },
  watch: {
    isLogined(val) {
      if (val) {
        this.getAccountStatus()
      }
    }
  },
  mounted() {
    if (this.isLogined) {
      this.getAccountStatus()
    }
    this.getFandomList()
  },
  methods: {
    /** 申请加群 */
    addFandom(fandom) {
      // 未登录情况
      if (!this.isLogined) {
        this.$store.commit('setLoginModal', true)
        return
      }
      // 未绑定tg账号情况
      if (!this.bindStatus) {
        this.showHelp = true
        return
      }
      console.log('加群：', fandom.title)
      window.location.href = `tg://resolve?domain=${process.env.TELEGRAM_FANDOM_BOT}&start=${fandom.id}`
    },
    /** 绑定tg账号 */
    setTelegram() {
      // if:未登录弹出登录框，否则如果未绑定tg账号则跳转至绑定页面
      if (!this.isLogined) {
        // 要先关掉弹窗，不然会产生遮挡
        this.showHelp = false
        this.$store.commit('setLoginModal', true)
      } else if (!this.bindStatus) {
        this.showHelp = false
        this.$router.push({ name: 'login-telegram' })
      }
    },
    /** 跳转至账号变更页面 */
    accountSettings() {
      // 要先关掉弹窗，不然页面跳转后会留有黑色遮罩。
      this.showHelp = false
      this.$router.push({ name: 'setting-account' })
    },
    /** 获取账号绑定状态 */
    getAccountStatus() {
      this.$API
        .accountList()
        .then(res => {
          if (res.code === 0) {
            // console.log('账号绑定状态：', res)
            const filterPlatform = res.data.filter(
              j => j.platform === 'telegram'
            )
            // console.log(filterPlatform)
            if (filterPlatform.length > 0) {
              this.bindStatus = !!filterPlatform[0].status
            } else {
              this.bindStatus = false
            }
          } else {
            console.log(res.message)
          }
        })
        .catch(err => {
          console.log('err', err)
        })
    },
    getFandomList() {
      const _axios = axios.create({
        baseURL: process.env.FANDOM_SERVER_API,
        timeout: 20000,
        headers: {}
      })
      _axios.get(`/api/token/${this.tokenId}`).then(res => {
        const { data } = res
        this.loading = false
        if (data.status) {
          this.fandomData = data.result
        } else {
          console.log('获取粉丝群列表失败', data.error)
        }
      }).catch(err => {
        console.log('err', err)
      })
    },
    handleCurrentChange(val) {
      this.pageNum = val
    },
    getMinBalance(fandom) {
      return fandom.requirement.minetoken ? fandom.requirement.minetoken.amount : 0
    }
  }
}
</script>

<style lang="less" scoped>
.fandom-card {
  background: @white;
  padding: 20px;
  border-radius: @br10;
  margin: 20px 0 0;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.04);
}

.token-title {
  font-size:24px;
  font-weight:bold;
  color:@black;
  line-height:33px;
  padding: 0;
  margin: 0;
  flex: 1;
}
.help-click {
  font-size: 14px;
  margin-top: auto;
  color: #4c29ca;
  cursor: pointer;
  &:hover {
    color: #4c29ca;
  }
}
.fandom-unit {
  margin: 20px 0 0;
  .fandom-text {
    flex: 1;
    .title {
      white-space: nowrap;
      max-width: 220px;
      h2 {
        font-size: 16px;
        color: black;
        margin-top: 0;
        margin-bottom: 10px;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      span {
        font-size: 14px;
        font-weight: 400;
        color: #B2B2B2;
      }
    }
    .condition {
      font-size: 14px;
      color: #B2B2B2;
      margin-top: 0;
    }
  }
  .top10 {
    margin-top: 10px;
  }
}
.add-button {
  padding: 7px 25px;
  border-radius:6px;
  border: 1px solid black;
  color: black;
  font-size: 14px;
  &:hover {
    border-color: #4c29ca;
    color: #542DE0;
  }
}

.disable {
  width:80px;
  background:rgba(178,178,178,1);
  border-radius:6px;
  text-align: center;
  color: white;
  padding: 8px 0;
  font-size: 14px;
}

.expand-page {
  text-align: center;
  margin-bottom: 6px;
  font-size: 14px;
}

a{
  color: #4c29ca;
  cursor: pointer;
  &:hover {
    color: #4c29ca;
  }
}
.svg-top{
  transform: rotate(180deg);
}

.subtitle {
  text-align: center;
  color: #B2B2B2;
  margin: 0 0 20px;
  font-size: 14px;
}

.help-step{
  &.top {
    margin-bottom: 20px;
  }
  .help-text {
    flex: 1;
    h3{
      font-size: 16px;
      color: black;
      margin: 0px 0 10px;
    }
    p {
      font-size: 14px;
      color: #B2B2B2;
      margin: 0;
      &.introduction{
        color: black;
        font-size: 16px;
        margin: 0 0 10px;
      }
    }
    .help-serial {
      margin-left: 5px;
    }
  }
  .help-touch {
    text-align: right;
    .top20 {
      margin-top: 20px;
    }
    .top40 {
      margin-top: 40px;
    }
  }
}
.pagination {
  margin-top: 13px;
  text-align: center;
}

.tips {
  font-size: 14px;
  color: #bbb;
  padding: 0;
  margin: 10px 0 0;
}
</style>

<style lang="less">
.fandom-popups-title {
  border-radius: 6px;
  .el-dialog__title {
    font-weight: 600;
  }
}
</style>
