<template>
  <div class="people-list">
    <div class="people-list__content">
      <slot name="title"></slot>
      <div class="people-list__block">
        <div
          class="people-block animated"
          v-for="(item, index) in list"
          :key="index"
          :style="{animationDelay: index * 0.2 + 's'}"
        >
          <div class="people">
            <avatar :src="item.photoUrl"></avatar>
            <p>{{ item.name }}</p>
          </div>
        </div>
      </div>
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
  }
}
</script>

<style lang="less" scoped>
.people-list {
  background-color: #0e2144;
  overflow: hidden;
  padding: 0 0 200px 0;
}

.people-list__content {
  max-width: 1200px;
  padding: 0 20px;
  margin: 0 auto;
}
.people {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  .components-avatar {
    width: 120px;
    height: 120px;
    border: none;
  }
  p {
    font-size: 20px;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
    line-height: 28px;
    padding: 0;
    margin: 20px 0 0;
  }
}
.people-list__block {
  &::after {
    content: '';
    display: block;
    width: 0;
    height: 0;
    clear: both;
  }
}
.people-block {
  float: left;
  margin-top: 60px;
  width: 20%;
}

@media screen and (max-width: 520px) {
  .people-block {
    width: 33.333%;
  }
  .people {
    .components-avatar {
      width: 80px;
      height: 80px;
    }
    p {
      font-size: 14px;
    }
  }
}

@media screen and (min-width: 520px) {
  .people-block {
    width: 25%;
  }
  .people {
    .components-avatar {
      width: 100px;
      height: 100px;
    }
    p {
      font-size: 16px;
    }
  }
}

@media screen and (min-width: 768px) {
  .people-block {
    width: 20%;
  }
  .people {
    .components-avatar {
      width: 80px;
      height: 80px;
    }
  }
}

@media screen and (min-width: 992px) {
  .people-block {
    width: 20%;
  }
  .people {
    .components-avatar {
      width: 100px;
      height: 100px;
    }
    p {
      font-size: 16px;
    }
  }
}

@media screen and (min-width: 1200px) {
  .people-block {
    width: 20%;
  }
  .people {
    .components-avatar {
      width: 110px;
      height: 110px;
    }
    p {
      font-size: 18px;
    }
  }
}

@media screen and (min-width: 1920px) {
  .people {
    .components-avatar {
      width: 120px;
      height: 120px;
    }
  }
}
</style>
