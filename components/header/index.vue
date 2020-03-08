<template>
  <header class="header">
    <div class="header-content">
      <a href="/" class="logo-link">
        <img class="logo" src="@/assets/img/daojam_logo.png" alt="logo" />
      </a>

      <svg-icon icon-class="menu" class="menu-icon" @click.stop="showSidebar" />

      <div class="header-right">
        <ul>
          <li>
            <n-link :to="{name: 'index'}">HOME</n-link>
          </li>
          <li>
            <a href="#">ABOUT</a>
          </li>
          <li>
            <n-link :to="{name: 'daos'}">DAOs</n-link>
          </li>
        </ul>
        <a v-if="!isLogined" @click="login" href="javascript:;" class="sign-btn">{{ $t('home.signIn') }}</a>
        <el-dropdown v-else class="user-menu">
          <avatar :src="avatarSrc"></avatar>
          <el-dropdown-menu slot="dropdown" class="user-dorpdown">
            <n-link :to="{name: 'user-id', params:{id: currentUserInfo.id}}" class="link">
              <el-dropdown-item>
                {{ currentUserInfo.nickname || currentUserInfo.name }}
              </el-dropdown-item>
            </n-link>
            <n-link :to="{name: 'setting', params:{id: currentUserInfo.id}}" class="link">
              <el-dropdown-item>
                {{ $t('home.account') }}
              </el-dropdown-item>
            </n-link>
            <div @click="signOut" class="link">
              <el-dropdown-item>
                {{ $t('home.signOut') }}
              </el-dropdown-item>
            </div>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>

    <div class="header-sidebar" :class="toggle && 'open'">
      <div class="header-sidebar__full" @click.stop="toggle = false"></div>
      <div class="header-sidebar__content">
        <avatar class="user-avatar" :src="avatarSrc"></avatar>
        <p class="user-name">{{ currentUserInfo.nickname || currentUserInfo.name }}</p>

        <ul>
          <li>
            <svg-icon icon-class="user" class="icon" />
            <n-link :to="{name: 'user-id', params:{id: currentUserInfo.id}}">我的主页</n-link>
          </li>
          <li>
            <svg-icon icon-class="home" class="icon" />
            <n-link :to="{name: 'setting', params:{id: currentUserInfo.id}}">{{ $t('home.account') }}</n-link>
          </li>
        </ul>

        <div class="user-footer">
          <div class="user-footer__block" @click="signOut">
            <svg-icon icon-class="logout" class="logout-icon" />
            {{ isLogined ? $t('home.signOut') : $t('home.signIn') }}
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { removeCookie } from '@/utils/cookie'
import store from '@/utils/store.js'
import avatar from '@/common/components/avatar/index.vue'
export default {
  components: {
    avatar
  },
  data() {
    return {
      avatarSrc: '',
      toggle: false,
    }
  },
  watch: {
    isLogined(newState) {
      if (newState) this.refreshUser()
    },
  },
  computed: {
    ...mapGetters(['currentUserInfo', 'isLogined', 'isMe']),
  },
  created() {
    const { isLogined, refreshUser } = this
    if (isLogined) refreshUser()
  },
  methods: {
    ...mapActions(['getCurrentUser', 'resetAllStore']),
    async refreshUser() {
      const { avatar } = await this.getCurrentUser()
      if (avatar) this.avatarSrc = this.$ossProcess(avatar, { h: 60 })
    },
    // 显示侧边栏
    showSidebar () {
      if (!this.isLogined) {
        this.login()
      } else {
        this.toggle = true
      }
    },
    // 登录
    login() {
      this.$store.commit('setLoginModal', true)
      this.$emit('login')
    },
    // 退出登录
    signOut() {
      if (confirm(this.$t('warning.confirmLogout'))) {

        // 出错后弹出框提示
        const alertDialog = () => {
          this.$alert('很抱歉，退出登录失败，点击确定刷新', '温馨提示', {
            showClose: false,
            type: 'success',
            callback: action => {
              window.location.reload()
            }
          })
        }

        // 重置all store
        this.resetAllStore()
          .then(res => {
            removeCookie('ACCESS_TOKEN')
            removeCookie('idProvider')
            removeCookie('referral')
            store.clear()
            sessionStorage.clear()

            if (this.$route.name === 'article') {
              this.$router.go(0)
            } else {
              this.$router.replace({
                name: 'article'
              })
            }

            // 通知刷新其他页面
            setTimeout(() => {
              this.$userMsgChannel.postMessage('logout')
            }, 2000)

          }).catch(err => {
            console.log(err)
            alertDialog()
          })
      }
    },
  }
}
</script>

<style lang="less" scoped>
.header {
  width: 100%;
  height: 60px;
  box-sizing: border-box;

  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 99;
  padding: 0 20px;

  background: rgba(85, 85, 85, 1);
  box-shadow: 0px 1px 0px 0px rgba(178, 178, 178, 1);
  border-bottom: 1px solid rgba(151, 151, 151, 1);
  .logo {
    height: 36px;
  }

  .header-content {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
  }

  &-right {
      display: flex;
      align-items: center;
    ul {
      margin: 0;
      padding: 0;
      list-style: none;
      li {
        margin-right: 40px;
        display: inline-block;
        a {
          font-size:16px;
          font-weight:400;
          color:rgba(255,255,255,1);
          line-height:22px;
        }
      }
    }
  }

  .sign-btn {
    padding: 0 20px;
    height:36px;
    background:rgba(98,54,255,1);
    border-radius:4px;

    display: block;
    font-size: 16px;
    font-weight: 400;
    color: rgba(255,255,255,1);
    line-height: 36px;
    transition: all .3s;
    cursor: pointer;
    &:hover {
      background:mix(rgba(98,54,255,1), #fff, 90%)
    }
  }
}
.menu-icon {
  color: #fff;
  font-size: 24px;
  display: none;
  opacity: 0;
  visibility: hidden;
}
.header-sidebar {
  &.open {
    .header-sidebar__content {
      transform: translateX(0);
      box-shadow: 0 0 10px rgba(0,0,0,0.6);
    }
    .header-sidebar__full {
      display: block;
      visibility: initial;
      opacity: 1;
    }
  }

}
.header-sidebar__full {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
  display: none;
  visibility: hidden;
  overflow: 0;
  transition: all .2s;
}
.header-sidebar__content {
  transform: translateX(-100%);
  width: 80%;
  background: #fff;
  z-index: 2;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  transition: all .3s;
  padding: 0 0 50px;
  box-sizing: border-box;
  .user-avatar {
    margin: 20px 0 0 20px;
    width: 60px;
    height: 60px;
  }
  .user-name {
    padding: 0;
    margin: 10px 0 0 20px;
    font-size: 16px;
    font-weight: 400;
    letter-spacing: 1px;
  }

  ul {
    padding: 10px 20px 0;
    margin: 30px 0 0 0;
    border-top: 1px solid #e2e2e2;
    list-style: none;
    li {
      padding: 10px 0;
      margin: 10px 0 0 0;
      display: flex;
      align-items: center;
      .icon {
        color: #000;
        font-size: 16px;
        margin: 0 10px 0 0;
      }
      a {
        font-size: 14px;
        display: block;
        color: #000;
        letter-spacing: 1px;
      }
    }
  }
  .user-footer {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    border-top: 1px solid #e2e2e2;
    padding: 0 20px;
    text-align: center;
    font-size: 16px;
    font-weight: 400;
    height: 50px;
    box-sizing: border-box;
    line-height: 50px;
    cursor: pointer;
  }
}
@media screen and (max-width: 520px) {
  .user-menu,
  .logo-link {
    display: none;
    opacity: 0;
    visibility: hidden;
  }

  .sign-btn {
    display: none !important;
    opacity: 0;
    visibility: hidden;
  }
  .header-right ul li:nth-last-child(1) {
    margin-right: 0;
  }
  .menu-icon {
    display: block;
    visibility: initial;
    opacity: 1;
  }
}

@media screen and (max-width: 768px) {
  .header .logo {
    height: 24px;
  }
  .header-right ul li{
    margin-right: 20px;
  }
  .header-right ul li a {
    font-size: 14px;
  }
}
</style>


<style lang="less">
.user-dorpdown {
  background-color: #333333 !important;
  border: 1px solid #333 !important;
  .popper__arrow, .popper__arrow::after {
    border-bottom-color:  #333 !important;
  }
  .el-dropdown-menu__item {
    color: #fff;
    &:hover,
    &:active {
      background-color: #3f3f3f !important;
      color: #fff !important;
    }
  }
}
</style>