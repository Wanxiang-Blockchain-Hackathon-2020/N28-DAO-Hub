<template>
  <div class="dao-list">
    <div class="dao-list__content">
      <slot name="title"></slot>
      <div class="dao-list__block">
        <router-link
          class="dao-block animated"
          :to="{name: 'token-id', params: {id: item.id}}"
          v-for="(item, index) in list"
          :key="index"
          :style="{animationDelay: index * 0.08 + 's'}"
        >
          <div class="dao">
            <avatar :src="cover(item.logo)"></avatar>
            <p>{{ item.symbol }}-{{item.name}}</p>
          </div>
        </router-link>
      </div>
      <router-link class="dao-more" :to="{name: 'daos'}">VIEW MORE</router-link>
    </div>
  </div>
</template>

<script>
import avatar from '@/common/components/avatar/index.vue'
export default {
  components: {
    avatar
  },
  props: {
    list: {
      type: Array,
      required: true
    }
  },
  methods: {
    cover (src) {
      if (!src) return ''
      return src ? this.$ossProcess(src) : ''
    }
  }
}
</script>

<style lang="less" scoped>
.dao-list {
  background-color: #0e2144;
  overflow: hidden;
}

.dao-list__content {
  max-width: 1200px;
  padding: 0 20px;
  margin: 0 auto;
  text-align: center;
}
.dao {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  .components-avatar {
    width: 120px;
    height: 120px;
    border-radius: 8px;
  }
  p {
    font-size: 20px;
    font-weight: 600;
    color: rgba(255, 255, 255, 1);
    line-height: 28px;
    padding: 0;
    margin: 20px 0 0;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    width: 100%;
  }
}
.dao-more {
  display: inline-block;
  text-align: center;
  padding: 0 74px;
  margin: 80px 0 150px;
  height:40px;
  background:rgba(255,255,255,1);
  border-radius:34px;

  font-size:16px;
  font-weight:500;
  color:rgba(98,54,255,1);
  line-height:40px;

  transition: all .3s;
  &:hover {
    background-color: mix(rgba(255,255,255,1), #000, 90%);
  }
}
.dao-list__block {
  margin-top: 20px;
  &::after {
    content: '';
    display: block;
    width: 0;
    height: 0;
    clear: both;
  }
}
.dao-block {
  float: left;
  margin-top: 40px;
  width: 20%;
  &:nth-child(6){
    margin-left: 10%;
  }
  &:nth-child(9){
    margin-right: 10%;
  }
}

@media screen and (max-width: 520px) {
  .dao {
    .components-avatar {
      width: 50px;
      height: 50px;
    }
    p {
      font-size: 12px;
      font-weight: 400;
    }
  }

  .dao-list__content {
    max-width: 90%;
  }
}

@media screen and (min-width: 520px) {
  .dao {
    .components-avatar {
      width: 50px;
      height: 50px;
    }
    p {
      font-size: 14px;
      font-weight: 400;
    }
  }

  .dao-list__content {
    max-width: 80%;
  }
}

@media screen and (min-width: 768px) {
  .dao {
    .components-avatar {
      width: 90px;
      height: 90px;
    }
  }
}

@media screen and (min-width: 992px) {
  .dao {
    .components-avatar {
      width: 100px;
      height: 100px;
    }
  }
}

@media screen and (min-width: 1200px) {
  .dao-list__content {
    max-width: 1200px;
  }
  .dao {
    .components-avatar {
      width: 110px;
      height: 110px;
    }
    p {
      font-size: 18px;
      font-weight: 600;
    }
  }
}

@media screen and (min-width: 1920px) {
  .dao {
    .components-avatar {
      width: 120px;
      height: 120px;
    }
    p {
      font-size: 20px;
    }
  }
}
</style>
