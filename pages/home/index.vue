<template>
  <div class="main">
    <!-- home -->
    <section ref="home" class="home">
      <!-- logo -->
      <img ref="logo" class="home-logo" src="@/assets/img/index/logo.png" alt="logo">
      <img ref="sumary" class="home-sumary" src="@/assets/img/index/sumary.png" alt="sumary">
      <!-- btn -->
      <div ref="btnMenu" class="btn-menu">
        <div @click="showMoreMenu" class="btn">
          <svg-icon
            icon-class="add"
          />
        </div>
        <div class="btn-list">
          <router-link :to="{name: 'article'}">
            <svg-icon
              class="btn-list_btn"
              icon-class="article"
            />
          </router-link>
          <router-link :to="{name: 'sharehall'}">
            <svg-icon
              class="btn-list_btn"
              icon-class="sharehall"
            />
          </router-link>
          <router-link :to="{ name: 'publish-type-id', params: { type: 'draft', id: 'create' } }">
            <svg-icon
              class="btn-list_btn"
              icon-class="write_index"
            />
          </router-link>
          <router-link :to="{name: 'token'}">
            <svg-icon
              class="btn-list_btn"
              icon-class="fan"
            />
          </router-link>
          <router-link :to="{name: 'exchange'}">
            <svg-icon
              class="btn-list_btn"
              icon-class="exchange_home"
            />
          </router-link>
        </div>
      </div>
      <!-- background -->
      <img class="home-background__left" src="@/assets/img/index/main_bg_left.png" alt="matataki home background">
      <img class="home-background__right" src="@/assets/img/index/main_bg_right.png" alt="matataki home background">
    </section>

    <!-- story -->
    <section class="story ">
      <div>
        <!-- story 1 -->
        <section ref="storyOne" class="component-story story-left story_01">
          <section class="component-story__header">
            <article class="component-story__inner">
              <figure class="component-story__inner__title">
                <img src="@/assets/img/index/passion.png" alt="passion">
              </figure>
              <div class="visual-wrap">
                <figure>
                  <img src="@/assets/img/index/story_passion.png" alt="passion">
                </figure>
              </div>
            </article>
          </section>
          <section class="component-story__summary">
            <article class="component-story__inner">
              <figure class="component-story__summary__title">
                <img src="@/assets/img/index/sotry_passion_title.png" alt="passion">
              </figure>
              <ul>
                <li>
                  <p class="summary">
                    我所热爱的就是最大的。
                  </p>
                </li>
                <li>
                  <p class="summary">
                    在未来，我们与AI有什么不同？是生生不息的热爱、探索与执着让我们如此不同！
                  </p>
                </li>
                <li>
                  <p class="summary">
                    投资执着和努力创作的人，未来，一个人就是一家“公司”。
                  </p>
                </li>
              </ul>
            </article>
          </section>
        </section>

        <!-- story 2 -->
        <section ref="storyTwo" class="component-story story-right story_02">
          <section class="component-story__header">
            <article class="component-story__inner">
              <figure class="component-story__inner__title">
                <img src="@/assets/img/index/sustainability.png" alt="sustainability">
              </figure>
              <div class="visual-wrap">
                <figure>
                  <img src="@/assets/img/index/story_sustainability.png" alt="sustainability">
                </figure>
              </div>
            </article>
          </section>
          <section class="component-story__summary">
            <article class="component-story__inner">
              <figure class="component-story__summary__title">
                <img src="@/assets/img/index/sotry_sustainability_title.png" alt="sustainability">
              </figure>
              <ul>
                <li>
                  <p class="summary">
                    利用区块链为创作数据确权，数据资产完全归属作者，不再被平台剥夺、剥削。
                  </p>
                </li>
                <li>
                  <p class="summary">
                    完善的区块链价值工具集，保证作者的创作价值触达更多爱好者，用社区的力量反哺创作，用创作的价值壮大社区。
                  </p>
                </li>
                <li>
                  <p class="summary">
                    区块链上价值透明可传导，保证衍生创作持续输血原作，让优秀的创作生生不息。
                  </p>
                </li>
              </ul>
            </article>
          </section>
        </section>

        <!-- story 3 -->
        <section ref="storyThree" class="component-story story-left story_03">
          <section class="component-story__header">
            <article class="component-story__inner">
              <figure class="component-story__inner__title">
                <img src="@/assets/img/index/boundary.png" alt="boundary">
              </figure>
              <div class="visual-wrap">
                <figure>
                  <img src="@/assets/img/index/story_boundary.png" alt="boundary">
                </figure>
              </div>
            </article>
          </section>
          <section class="component-story__summary">
            <article class="component-story__inner">
              <figure class="component-story__summary__title">
                <img src="@/assets/img/index/sotry_boundary_title.png" alt="boundary">
              </figure>
              <ul>
                <li>
                  <p class="summary">
                    思想高度多样化的群体，智能水平能够超越多年训练的专家
                  </p>
                </li>
                <li>
                  <p class="summary">
                    社交媒体快速抢占我们的注意力，而思考和学习需要慢时间，如何让慢的事情高质量变快？
                  </p>
                </li>
                <li>
                  <p class="summary">
                    市场和经济系统能够奖励优秀的思想，合作能够快速传播思想和带来思想的进化，<b>“市场激励”</b>加<b>“合作”</b>能让群体的“慢”思考变快，提升社会中每个人的能力和收益。
                  </p>
                </li>
              </ul>
            </article>
          </section>
        </section>
      </div>
    </section>

    <div ref="evaluation" class="evaluation_section_div">
      <section class="evaluation_section">
        <div class="evaluation">
          <i @click="pageTurning(-1)" class="el-icon-arrow-left arrow" />
          <n-link
            :to=" {name: 'user-id', params: {id: userReviews[pageNum].id}} "
            target="_blank"
            class="author"
          >
            <avatar :size="'50px'" :src="userReviews[pageNum].avatar" class="avatar" />
          </n-link>
          <div class="bubble">
            <p class="name">
              {{ userReviews[pageNum].name }}：
            </p>
            <p class="content">
              <img src="@/assets/img/index/double_quotes_left.png" class="left" alt="double_quotes_left">
              {{ userReviews[pageNum].content }}
              <img src="@/assets/img/index/double_quotes_right.png" class="right" alt="double_quotes_right">
            </p>
          </div>
          <i @click="pageTurning(1)" class="el-icon-arrow-right arrow" />
        </div>
      </section>
    </div>

    <!-- roadmap -->
    <section class="roadmap">
      <section class="roadmap-content">
        <div class="roadmap-block">
          <img class="roadmap-bg" src="@/assets/img/index/roadmap.png" alt="roadmap-background">
          <!-- <img class="roadmap-text" src="@/assets/img/index/roadmap_text.png" alt="roadmap-text"> -->
        </div>
        <section class="roadmap-time">
          <div class="roadmap-time__block">
            <h4><img src="@/assets/img/index/2019Q4.png" alt="2019.Q4"></h4>
            <ul>
              <li>
                <p class="sumary">
                  用户创作数据区块链时间戳确权，为原创作品保驾护航。
                </p>
              </li>
              <li>
                <p class="sumary">
                  去中心化存储协议保证数据资产权益完全归用户所有。
                </p>
              </li>
              <li>
                <p class="sumary">
                  Fan票 数据价值量化系统上线，丰富数据的商业化应用场景，为创作者商业变现赋能。
                </p>
              </li>
            </ul>
          </div>
          <div class="roadmap-time__block">
            <h4><img src="@/assets/img/index/2020Q1.png" alt="2020.Q1"></h4>
            <ul>
              <li>
                <p class="sumary">
                  FanDAOs 创作者社群去中心化协作工具集上线，帮助创作社群自发、高效运转，让社群专注价值生产。
                </p>
              </li>
            </ul>
          </div>
          <div class="roadmap-time__block">
            <h4><img src="@/assets/img/index/2020Q2.png" alt="2020.Q2"></h4>
            <div class="leftFrame">
              <ul>
                <li>
                  <p class="sumary">
                    上线零工经济系统。
                  </p>
                </li>
                <li>
                  <p class="sumary">
                    完善去中心化存储激励协议层。
                  </p>
                </li>
              </ul>
            </div>
          </div>
          <div class="roadmap-time__block">
            <h4><img src="@/assets/img/index/2020Q3.png" alt="2020.Q3"></h4>
            <ul>
              <li>
                <p class="sumary">
                  全面开放平台API，提供完善的开发工具套件，平台转向社区化运营。
                </p>
              </li>
            </ul>
          </div>
          <div class="roadmap-time__block">
            <h4><img src="@/assets/img/index/2020Q4.png" alt="2020.Q4"></h4>
            <ul>
              <li>
                <p class="sumary">
                  “人类知识共享、创新计划”上线，建设全网开放、通用的语义网络数据集。
                </p>
              </li>
            </ul>
          </div>
          <div class="roadmap-time__line" />
        </section>
      </section>
    </section>
  </div>
</template>

<script>
/* eslint-disable no-undef */
import throttle from 'lodash/throttle'
import avatar from '@/components/avatar/index.vue'
import loadScript from '@/utils/load_script'
export default {
  middleware: 'redirect',
  head: function () {
    return {
      script: [
      // { src: '/gsap.min.js' },
      // { src: '/ScrollMagic.min.js' },
      // { src: '/animation.gsap.min.js' }
      // { src: '/debug.addIndicators.min.js' }
      // { src: 'https://cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.7/ScrollMagic.min.js' },
      // { src: 'https://cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.7/plugins/animation.gsap.min.js' }
      // { src: 'https://cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.7/plugins/debug.addIndicators.min.js' }
      ]
    }
  },
  components: {
    avatar
  },
  data() {
    return {
      pageNum: 0,
      aComment: {
        avatar: '',
        name: '',
        content: ''
      },
      userReviews: [
        {
          id: 82,
          avatar: this.$ossProcess('/avatar/2019/09/06/b4b75ec1f3ab19c74aab668579535848.jpeg'),
          name: 'Ponge',
          content: '优美流畅的UI，方便易用的编辑方式（支持Markdown）是Matataki最吸引我的两个地方。这里没有404，这里没有敏感词，但是这里有无限的可能。粉丝经济、电商……不知道未来Matataki会走向何方，但是每一个“瞬”间都值得“留链”。'
        },
        {
          id: 967,
          avatar: this.$ossProcess('/avatar/2019/11/15/ceac57a33b012302d637f8d9f2927d3d.jpeg'),
          name: '加菲众',
          content: '迄今为止，Matataki是内容价值领域最易用直观的产品。小岛和他的团队已经寻得了内容通证化的最优路径。'
        },
        {
          id: 176,
          avatar: this.$ossProcess('/avatar/2019/08/24/12526397d587c80fcca7f58924d1cc33.png'),
          name: '筷子手',
          content: '用区块链把读者和作者更加紧密地联系起来，这是一个自由写作的平台。山海皆升平，偏偏爱重庆，关注「筷子手」，带你了解最地道的重庆。'
        },
        {
          id: 989,
          avatar: this.$ossProcess('/avatar/2019/11/17/d1c06bec2210f293fa1a8a0576a54efd.jpg'),
          name: 'udspj',
          content: '程序员日常漫画做了很多年，虽然已经完成出本的愿望（我没有跟QB交易），但出本上瘾正在企划2本新刊，身在11区也能通过matataki发行阿宅币在国内贩售新的漫画内容真是太棒了~~~'
        },
        {
          id: 775,
          avatar: this.$ossProcess('/avatar/2019/12/14/51f801a26860752f34dc233e256e03e5.png'),
          name: '行者说币',
          content: '几个月前，我在各种区块链内容、中心化写作平台高频发文，收到仙女座科技工作人员的信息，从此展开与瞬之间的缘分。我认为，瞬是一个做事情的团队。瞬Matataki 采用的是IPFS协议，星际文件存储系统，随着用户量的增多，就会产生大量节点，我们作为其中一个节点，可以利用自己的闲置硬盘存储他人的作品，当然，一个作品提交到IPFS网络，就会被复制成很多分、分割成很多片，存储在不同节点中，每个节点都无法查看具体信息，这样，就保证了，创作者的作品由大家共同存储，同时无法篡改，具备公信力。单一或者部分节点受到毁灭性打击也不影响作者从其他备份节点取得完整作品，具有很好的安全性。'
        }
      ],
      resizeEvent: null,
      scrollEvent: null
    }
  },
  mounted() {
    if (process.browser) {
      this.$nextTick(() => {
        const scriptSrc = [
          'https://cdn.bootcss.com/gsap/latest/TweenMax.min.js',
          'https://cdn.bootcss.com/ScrollMagic/2.0.7/ScrollMagic.min.js',
          'https://cdn.bootcss.com/ScrollMagic/2.0.7/plugins/animation.gsap.min.js'
        ]
        const PromiseLoadScript = scriptSrc.map(i => loadScript(i))
        let timer = null
        Promise.all(PromiseLoadScript)
          .then(res => {
            console.log('done', res)
            clearInterval(timer)
            timer = setInterval(() => {
              if (TweenMax && ScrollMagic) {
                this.initScrollAnimation()
                this.setDefaultStyle()
                clearInterval(timer)
              }
            }, 300)
          })
          .catch(err => {
            console.log('error', err)
          })

        this.resizeEvent = throttle(this.resizeHomeHeight, 300)
        this.scrollEvent = throttle(this.scrollTop, 300)
        window.addEventListener('resize', this.resizeEvent)
        window.addEventListener('scroll', this.scrollEvent)

        this.resizeHomeHeight()
      })
    }
    this.aComment = this.userReviews[this.pageNum]
  },
  destroyed() {
    window.removeEventListener('resize', this.resizeEvent)
    window.removeEventListener('scroll', this.scrollEvent)
  },
  methods: {
    initScrollAnimation() {
      const initStory = () => {
        const componentStory = document.querySelectorAll('.component-story')
        const controller = new ScrollMagic.Controller()
        // const clientHeight = document.body.clientHeight || document.documentElement.clientHeight

        componentStory.forEach((el, i) => {
          const childHeaderInner = el.querySelector('.component-story__header .component-story__inner')
          const childSumaryInner = el.querySelector('.component-story__summary .component-story__inner')
          const tl = new TimelineMax()

          // tl.to(el, 1, { z: 0, ease: Linear.easeNone }, 'story')
          tl.to(childHeaderInner, 1, { y: '30%', ease: Linear.easeNone }, 'story')
          tl.to(childSumaryInner, 1, { y: '-90%', ease: Linear.easeNone }, 'story')

          // tl.to('.roadmap .roadmap-time__block', 1, { z: 0, y: -20, ease: Linear.easeNone })

          const scene = new ScrollMagic.Scene({
            triggerElement: el,
            triggerHook: 1,
            duration: '200%'
          // offset: -clientHeight
          })
            .setTween(tl)
            // .addIndicators({
            //   colorTrigger: 'black',
            //   colorStart: 'black',
            //   colorEnd: 'black',
            //   indent: 10
            // })
            .addTo(controller)
        })
      }

      const initRoadmap = () => {
        const controller = new ScrollMagic.Controller()
        const roadmap = document.querySelector('.roadmap')
        const roadmapBlock = roadmap.querySelectorAll('.roadmap-time__block')
        const tl = new TimelineMax()

        roadmapBlock.forEach((el, i) => {
          tl.to(el, 0.3, {
            x: function () {
              return i % 2 === 0 ? 0 : '100%'
            },
            y: 0,
            opacity: 1,
            ease: Linear.easeNone
          })
        })

        const scene1 = new ScrollMagic.Scene({
          triggerElement: roadmap
          // triggerHook: 1,
          // duration: '160%'
        // offset: -clientHeight
        })
          .setTween(tl)
          // .addIndicators({
          // colorTrigger: 'black',
          // colorStart: 'black',
          // colorEnd: 'black',
          // indent: 10
          // })
          .addTo(controller)
      }
      try {
        initStory()
        initRoadmap()
      } catch (error) {
        console.log(error)
      }
    },
    resizeHomeHeight() {
      const clientHeight = document.body.clientHeight || document.documentElement.clientHeight
      const heightop = 367
      if (clientHeight < 800) {
        this.$refs.evaluation.style['padding-top'] = '0px'
        this.$refs.evaluation.style.height = '780px'
        return false
      } else {
        this.$refs.home.style.height = clientHeight + 'px'
        const top = (clientHeight / 2) - (heightop + 108)
        this.$refs.evaluation.style['padding-top'] = top + 'px'
        this.$refs.evaluation.style.height = ((clientHeight - heightop) - top) + 'px'
        // this.$refs.evaluation.style.height = clientHeight + 'px'
      }
    },
    setDefaultStyle() {
      try {
        const tl = new TimelineMax()
        tl.set('.story', {
          perspective: 1000
        })
        // tl.set('.component-story', {
        //   z: -40
        // })
        tl.set('.component-story .component-story__header .component-story__inner', {
          y: '-10%'
        })
        tl.set('.roadmap .roadmap-time__block', {
          y: 20,
          opacity: 0
        })
      } catch (error) {
        console.log('error', error)
      }
    },
    // 首页第一屏按钮点击显示菜单
    showMoreMenu() {
      const btnMenu = document.querySelector('.btn-menu')
      try {
        btnMenu.classList.contains('open') ? btnMenu.classList.remove('open') : btnMenu.classList.add('open')
      } catch (error) {
        // 万一遇到ie不支持 💀💀💀
        let classVal = btnMenu.getAttribute('class')
        // includes 通杀????
        const hasClass = classVal.includes ? classVal.includes('open') : false
        if (hasClass) {
          classVal = classVal.replace('open', '').trim()
        } else {
          classVal = classVal.concat(' open')
        }
        btnMenu.setAttribute('class', classVal)
      }
    },
    /** 翻页 */
    pageTurning(num) {
      this.pageNum = (num + this.pageNum + this.userReviews.length) % this.userReviews.length
      this.aComment = this.userReviews[this.pageNum]
    },
    /** 滚动后展开按钮 */
    scrollTop() {
      try {
        const btnMenu = document.querySelector('.btn-menu')
        if (!btnMenu) return
        const scroll = document.body.scrollTop || document.documentElement.scrollTop || window.pageXOffset
        const btnVisible = btnMenu.classList.contains('open')
        if (scroll >= 100 && !btnVisible) {
          this.showMoreMenu()
        }
        if (scroll < 100 && btnVisible) {
          this.showMoreMenu()
        }
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style scoped lang="less" src="./index.less">

</style>
