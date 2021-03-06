<template>
  <div class="container">
    <div class="header">
      <h2 class="title">
        相关创作
      </h2>
      <el-dropdown @command="toggleDropdown" class="sort" trigger="click">
        <span class="el-dropdown-link">
          <span v-if="pull.params.sort === 'popular-desc'">按照热度排序</span>
          <span v-else-if="pull.params.sort === 'time-desc'">按照时间排序</span>
          <i class="el-icon-arrow-down el-icon--right" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="popular-desc">
            按照热度排序
          </el-dropdown-item>
          <el-dropdown-item command="time-desc">
            按照时间排序
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-popover class="filter" placement="bottom-end" trigger="click">
        <el-button slot="reference" class="filter-button" type="text">
          <div class="filter-header">
            <img class="filter-icon" src="@/assets/img/filter.svg">过滤
          </div>
        </el-button>
        <div style="font-size: 16px">
          <el-checkbox-group v-model="checkedFilter" :min="1" @change="handleCheckedFilterChanged">
            <div style="margin-bottom: 8px">
              <el-checkbox label="1">
                持票可见
              </el-checkbox>
            </div>
            <div>
              <el-checkbox label="2">
                付费可见
              </el-checkbox>
            </div>
          </el-checkbox-group>
        </div>
      </el-popover>
    </div>

    <div class="list">
      <div v-loading="loading">
        <no-content-prompt :prompt="$t('notArticle')" :list="articles">
          <articleCardListNew
            v-for="(item, index) in articles"
            :key="index"
            :card="item"
          />
        </no-content-prompt>
      </div>
      <user-pagination
        v-show="!loading"
        :url-replace="$route.params.id + ''"
        :current-page="currentPage"
        :params="pull.params"
        :api-url="pull.apiUrl"
        :page-size="10"
        :total="total"
        :need-access-token="false"
        @paginationData="paginationData"
        @togglePage="togglePage"
        class="pagination"
      />
    </div>
  </div>
</template>

<script>
import debounce from 'lodash/debounce'
import articleCardListNew from '@/components/article_card_list_new/index.vue'
import userPagination from '@/components/user/user_pagination.vue'

export default {
  components: {
    articleCardListNew,
    userPagination
  },
  data() {
    return {
      articles: [],
      pull: {
        apiUrl: 'minetokenRelated',
        params: {
          filter: 3,
          sort: 'time-desc'
        }
      },
      currentPage: 1,
      loading: true,
      total: 0,
      checkedFilter: ['1', '2']
    }
  },
  computed: {
    filter() {
      let result = 0
      for (const item of this.checkedFilter) {
        result |= parseInt(item)
      }
      return result
    }
  },
  mounted() {

  },
  methods: {
    buttonLoadMore(res) {
      this.articles = this.articles.concat(res.data.list)
    },
    handleCheckedFilterChanged(value) {
      this.onCheckedFilterChanged()
    },
    onCheckedFilterChanged: debounce(function () {
      this.pull.params.filter = this.filter
      this.currentPage = 1
    }, 500),

    paginationData(res) {
      this.articles = res.data.list
      this.total = res.data.count || 0
      this.loading = false
    },
    togglePage(i) {
      this.loading = true
      this.articles = []
      this.currentPage = i
    },
    toggleDropdown(sort) {
      this.pull.params.sort = sort
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  display: flex;
  flex-direction: column;

  .header {
    display: flex;
    flex-direction: row;

    .title {
      font-size:24px;
      font-weight:bold;
      color:@black;
      line-height:33px;
      padding: 0;
      margin: 0;
      flex: 1;
    }

    .sort {
      margin: 0 16px;

      .el-dropdown-link {
        height: 100%;
        display: flex;
        align-items: center;
      }
    }

    .filter {
      display: flex;
      align-items: center;

      &-button {
        padding: 0;
        color: #606266;
      }
      &-header {
        display: flex;
        align-items: center;
      }
      &-icon {
        width: 25px;
        height: 25px;
        margin-right: 4px;
      }
    }
  }
}

.list {
  clear: left;
  margin-top: 20px;
}
</style>
