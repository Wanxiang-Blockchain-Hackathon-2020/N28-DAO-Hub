<template>
  <footer class="footer">
    <div class="footer-social">
      <div class="footer-social__block" :class="item.name" v-for="(item, index) in socialList" :key="index">
        <svg-icon :icon-class="item.icon" class="icon" />
      </div>
    </div>
    <p class="footer-copyright">Copyright © DAO JAM</p>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      socialList: [
        {
          name: 'weixin',
          icon: 'weixin'
        },
                {
          name: 'weibo',
          icon: 'weibo'
        },
        {
          name: 'twitter',
          icon: 'twitter'
        },
        {
          name: 'facebook',
          icon: 'fb'
        }
      ]
    }
  }
}
</script>


<style lang="less" scoped>
.footer {
  background: #555555;
  padding: 0 20px;
  text-align: center;
  box-sizing: border-box;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.footer-social {
  margin-bottom: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.footer-social__block {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
  color: #fff;
  float: left;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 40px;
  transition: all .3s;
  &:nth-child(1) {
    margin-left: 0;
  }
  .icon {
    font-size: 34px;
  }
  &.weixin {
    background: #00C800;
    &:hover {
      background: mix(#00C800, #fff, 90%);
    }
  }
  &.weibo {
    background: #EA5D5C;
    &:hover {
      background: mix(#EA5D5C, #fff, 90%);
    }
  }
  &.twitter {
    background: #78CBEF;
    &:hover {
      background: mix(#78CBEF, #fff, 90%);
    }
  }
  &.facebook {
    background: #3C599B;
    &:hover {
      background: mix(#3C599B, #fff, 90%);
    }
  }
}
.footer-copyright {
  text-align: center;
  padding: 0;
  margin: 0;
  font-size:16px;
  font-weight:400;
  color:rgba(255,255,255,1);
  line-height:22px;
}



@media screen and (max-width: 520px) {
  .footer {
    padding: 0 20px;
  }
  .footer-social {
    margin-bottom: 10px;
  }
  .footer-social__block {
    width: 30px;
    height: 30px;
    margin-left: 10px;
    .icon {
      font-size: 16px;
    }
  }
  .footer-copyright {
    font-size:12px;
  }
}

@media screen and (min-width: 520px) {
  .footer {
    padding: 0 20px;
  }
  .footer-social {
    margin-bottom: 20px;
  }
  .footer-social__block {
    width: 40px;
    height: 40px;
    margin-left: 20px;
    .icon {
      font-size: 20px;
    }
  }
  .footer-copyright {
    font-size:14px;
  }
}

@media screen and (min-width: 992px) {
  .footer {
    padding: 0 20px;
  }
  .footer-social {
    margin-bottom: 30px;
  }
  .footer-social__block {
    width: 40px;
    height: 40px;
    margin-left: 30px;
    .icon {
      font-size: 22px;
    }
  }
}

@media screen and (min-width: 1920px) {
  .footer {
    padding: 0 20px;
  }
  .footer-social {
    margin-bottom: 40px;
  }
  .footer-social__block {
    width: 60px;
    height: 60px;
    .icon {
      font-size: 34px;
    }
  }
  .footer-copyright {
    font-size:16px;
  }
}



</style>