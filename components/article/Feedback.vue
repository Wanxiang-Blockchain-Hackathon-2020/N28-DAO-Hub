<template>
  <el-dialog
    :visible.sync="showModal"
    :show-close="false"
    :lock-scroll="false"
    width="400px"
    custom-class="my-dialog br10"
  >
    <div class="feedback-outer">
      <img :src="fbImg" alt="" class="icon">
      <div v-if="p.reading > 0" class="feedback-title">
        <p>
          {{ $t('p.readArticlePoint', [p.reading]) }}
        </p>
      </div>
      <div v-if="p.reading_new > 0" class="feedback-title">
        <p>
          {{ $t('p.readNewArticleNPoint', [p.reading_new]) }}
        </p>
      </div>
      <p class="bottom-tip">
        {{ $t('p.readThreeDaysNewArticlePoint', [$point.readNew]) }}
      </p>
    </div>
  </el-dialog>
</template>

<script>
/* eslint-disable */
import completedImg from '@/assets/img/completed.svg'
import newImg from '@/assets/img/new.svg'
export default {
  name: "FeedbackModal",
  components: {
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    points: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      showModal: false
    };
  },
  computed: {
    fbImg() {
      return completedImg
    },
    p() {
      const { points } = this
      const l = points.length
      let result = {
        reading_new: 0,
        reading: 0
      }
      for(let i = 0;i < l;i++) {
        if (points[i].type === 'reading_new') {
          result.reading_new = points[i].amount
        }
        if (points[i].type === 'reading_dislike' || points[i].type === 'reading_like') {
          result.reading = points[i].amount
        }
      }
      return result
    }
  },
  watch: {
    showModal(val) {
      this.$emit("input", val);
    },
    value(val) {
      this.showModal = val;
    }
  },
  mounted() {
  },
  methods: {
  }
}
</script>

<style scoped lang="less">
.feedback-outer {
  padding: 20px 40px 40px;
  text-align: center;
}
.icon {
  width: 150px;
}
.feedback-title {
  margin-top: 30px;
  p {
    font-size: 18px;
    color: #000000;
    font-weight: 700;
    line-height: 28px;
    margin: 0;
  }
}
.bottom-tip {
  margin: 30px 0 0 0;
  font-size: 14px;
  color: #B2B2B2;
  line-height: 18px;
}
</style>
