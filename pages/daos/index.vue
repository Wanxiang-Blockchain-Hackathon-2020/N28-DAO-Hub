<template>
  <div class="dao">
    <g-header />
    <div class="dao-main">
      <div class="dao-content" v-loading="loading">
        <div class="dao-head">
          <h2>DAOs ({{count}})</h2>
            <el-input
              style="width: 192px;"
              size="medium"
              placeholder="Search DAO"
              suffix-icon="el-icon-search"
              v-model="searchVal">
            </el-input>
        </div>

        <div class="dao-cow">
          <div class="dao-col" v-for="(item, index) in pull.list" :key="index">
            <router-link :to="{name: 'token-id', params: {id: item.id}}">
              <div class="dao-block">
                <div class="dao-block__head">
                  <avatar :src="cover(item.logo)"></avatar>
                  <div class="dao-block__head__info">
                    <h3>{{item.symbol}}</h3>
                    <div class="dao-block__info__number dao-number__one">
                      <div class="dao__info__number__block">
                        <svg-icon icon-class="members" class="icon"></svg-icon>
                        {{ item.member || 0 }}
                      </div>
                      <div class="dao__info__number__block">
                        <svg-icon icon-class="daos" class="icon"></svg-icon>
                        {{ formatDecimal(item.liquidity, item.decimals, -1) }}
                      </div>
                      <div class="dao__info__number__block">
                        <svg-icon icon-class="tickets" class="icon"></svg-icon>
                        {{ totalSupply(item.total_supply, item.decimals, -1) }}
                      </div>
                    </div>
                  </div>
                </div>
                <div class="dao-block__info__number dao-number__two">
                  <div class="dao__info__number__block">
                    <svg-icon icon-class="members" class="icon"></svg-icon>
                    {{ item.member }}
                  </div>
                  <div class="dao__info__number__block">
                    <svg-icon icon-class="daos" class="icon"></svg-icon>
                    {{ formatDecimal(item.liquidity, item.decimals, -1) }}
                  </div>
                  <div class="dao__info__number__block">
                    <svg-icon icon-class="tickets" class="icon"></svg-icon>
                    {{ totalSupply(item.total_supply, item.decimals, -1) }}
                  </div>
                </div>
                <div class="dao-block__brief">
                  {{item.brief || '暂无'}}
                </div>
                <div class="dao-footer">
                  <router-link  class="dao-btn" :to="{name: 'token-id', params: {id: item.id}}">VIEW</router-link>
                </div>
              </div>
            </router-link>
          </div>
        </div>

        <user-pagination
          v-show="!loading"
          :current-page="currentPage"
          :params="pull.params"
          :api-url="pull.apiUrl"
          :page-size="9"
          :total="total"
          :need-access-token="true"
          @paginationData="paginationData"
          @togglePage="togglePage"
          class="dao-pagination"
        />
      </div>
    </div>
  </div>
</template>

<script>
import avatar from '@/common/components/avatar/index.vue'
import userPagination from '@/components/user/user_pagination.vue'
import { precision } from '@/utils/precisionConversion'

export default {
  components: {
    avatar,
    userPagination
  },
  data() {
    return {
      tokenList: [],
      searchVal: '',

      pull: {
        params: {
          pagesize: 9
        },
        apiUrl: 'tokenAll',
        list: [
          {},{},{},{},{},{},{},{},{}
        ]
      },
      currentPage: Number(this.$route.query.page) || 1,
      loading: false, // 加载数据
      total: 0,
      assets: {
      },
      viewStatus: 0, // 0 1
      count: 0
    }
  },
  computed: {
  },
  methods: {
    // 转换k
    totalSupply(val, decimals, decimal) {
      let amount = this.formatDecimal(val, decimals, decimal)
      return amount < 10000 ? amount : amount / 1000 + 'K'
    },
    formatDecimal(val, decimals, decimal) {
      const amount = precision(val || 0, 'CNY', decimals)
      // 不会有使用0位小数的传参进来
      if (decimal) return this.$publishMethods.formatDecimal(amount, decimal)
      else return amount
    },
    cover (src) {
      if (!src) return ''
      return src ? this.$ossProcess(src) : ''
    },
    paginationData(res) {
      console.log(1, res)
      this.count = res.data.count
      this.pull.list = res.data.list
      this.total = res.data.count || 0
      this.loading = false
    },
    togglePage(i) {
      this.loading = true
      this.pull.list = []
      this.currentPage = i
      this.$router.push({
        query: {
          page: i
        }
      })
    },
  }
}
</script>

<style lang="less" scoped>
.dao {
  padding: 60px 0 0 0;
  min-height: calc(100% - (60px + 200px));
  background: #0c2143;
}

.dao-main {
  min-height: 1120px;
  background-color: #0E2144;
  background-image: url(../../assets/img/index_head_bg.png);
  background-size: contain;
  background-position: top;
  background-repeat: no-repeat;
  overflow: hidden;
  text-align: center;
}

.dao-content {
  max-width: 1200px;
  padding: 0 20px;
  margin: 0 auto;
}

.dao-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 60px;
  h2 {
    font-size:24px;
    font-weight:500;
    color:rgba(255,255,255,1);
    line-height:33px;
    padding: 0;
    margin: 0;
  }
}

.dao-cow {
  min-height: 300px;
  &::after {
    content: '';
    display: block;
    width: 0;
    height: 0;
    clear: both;
  }
}
.dao-col {
  float: left;
  width: calc(33.333% - (80px / 3));
  margin-top: 40px;
  &:nth-of-type(3n+2) {
    margin-left: 40px;
    margin-right: 40px;
  }
}
.dao-block {
  // min-height: 240px;
  border-radius: 16px;
  box-sizing: border-box;
  color: #fff;
  position: relative;
  z-index: 1;
  overflow: hidden;
  transition: all .2s;
  cursor: pointer;
  padding: 20px;
  // background: rgba(98,54,255,0.3);

  background: rgba(98,54,255,0.1);
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  .components-avatar {
    width: 60px;
    height: 60px;
    border-radius: 8px;
    flex: 0 0 60px;
  }
  &:hover {
    background:rgba(98,54,255,1);
  }
  &::after {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: inherit;
    filter: blur(10px);
    z-index: -1;
    margin: -30px;
  }
}

.dao-block__head {
  display: flex;
  align-items: center;
}

.dao-block__head__info {
  width: 100%;
  height: 60px;
  margin: 0 0 0 10px;
  box-sizing: border-box;
  overflow: hidden;
  h3 {
    text-align: left;
    padding: 0;
    margin: 0;
    font-size:24px;
    font-weight:500;
    color:rgba(255,255,255,1);
    line-height:33px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
.dao-block__info__number {
  display: flex;
  align-items: center;
  justify-content: space-between;

  font-size:16px;
  font-weight:400;
  color:rgba(255,255,255,1);
  line-height:22px;
  margin-top: 6px;
  .dao__info__number__block {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .icon {
    font-size: 20px;
  }
}

.dao-block__brief {
  padding: 0;
  margin: 10px 0 0 0;
  color: #000;
  font-size:16px;
  font-weight:400;
  color:rgba(255,255,255,1);
  line-height:22px;
  height: (22px * 4);
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
  overflow: hidden;
  text-align: left;
}

.dao-footer {
  text-align: right;
}

.dao-btn {
  display: inline-block;
  padding: 0 20px;
  margin: 10px 0 0 0;
  height:30px;
  background:rgba(255,255,255,1);
  border-radius:34px;
  font-size:16px;
  font-weight:500;
  color:rgba(98,54,255,1);
  line-height: 30px;
  text-align: center;
  transition: all .2s;
  &:hover {
    background: mix(rgba(255,255,255,1), #000, 90%);
  }
}

.dao-pagination {
  margin: 40px 0;
}

.dao-number__two {
  display: none;
  opacity: 0;
  visibility: hidden;
}



@media screen and (max-width: 520px) {

  .dao-number__one {
    display: none;
    opacity: 0;
    visibility: hidden;
  }
  .dao-number__two {
    display: flex;
    opacity: 1;
    visibility: initial;
  }
  .dao-footer {
    display: none;
    opacity: 0;
    visibility: hidden;
  }


  .dao-head {
    margin-top: 40px;
    h2 {
      font-size:22px;
      font-weight:400;
    }
  }


  .dao-col {
    width: 100%;
    margin-top: 20px;
    margin-left: 0 !important;
    margin-right: 0 !important;
  }

  .dao-block__head__info h3 {
    font-size: 16px;
    line-height: 22px;
    font-weight: 400;
  }

  .dao-block__brief {
    font-size: 14px;
  }
}

@media screen and (min-width: 520px) and (max-width: 768px) {
  .dao-col {
    width: calc(50% - (10px));
    margin-top: 20px;
    &:nth-of-type(odd) {
      margin-left: 0;
      margin-right: 10px;
    }
    &:nth-of-type(even) {
      margin-left: 10px;
      margin-right: 0;
    }
  }

  .dao-block__head__info h3 {
    font-size: 16px;
    line-height: 22px;
  }

  .dao-block__brief {
    font-size: 14px;
  }
}

@media screen and (min-width: 768px) and (max-width: 992px) {
  .dao-content {
    max-width: 85%;
  }
  .dao-col {
    width: calc(33.333% - (40px / 3));
    margin-top: 20px;
    &:nth-of-type(3n+2) {
      margin-left: 20px;
      margin-right: 20px;
    }
  }
  .dao-block__head__info h3 {
    font-size: 16px;
    line-height: 22px;
  }
}
@media screen and (min-width: 520px) and (max-width: 992px) {
  .dao-number__one {
    display: none;
    opacity: 0;
    visibility: hidden;
  }
  .dao-number__two {
    display: flex;
    opacity: 1;
    visibility: initial;
  }
  .dao-footer {
    display: none;
    opacity: 0;
    visibility: hidden;
  }
}

@media screen and (min-width: 768px) and (max-width: 1200px) {
  .dao-block__head__info {
    height: 50px;
  }
  .dao-block .components-avatar {
    width: 50px;
    height: 50px;
    flex: 0 0 50px;
  }
  .dao-block__info__number {
    font-size: 14px;
    line-height: 20px;
    .icon {
      font-size: 16px;
    }
  }

  .dao-block__brief {
    font-size: 14px;
    line-height: 20px;
    height: (20px * 4);
  }
  .dao-btn {
    height: 28px;
    font-size: 14px;
    line-height: 28px;
  }
}

@media screen and (min-width: 992px) and (max-width: 1200px) {
  .dao-content {
    max-width: 80%;
  }
  .dao-block__head__info h3 {
    font-size: 18px;
    line-height: 24px;
  }
}

</style>