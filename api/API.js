/* eslint-disable */
import qs from 'qs'
import request from '@/utils/request'
import utils from '@/utils/utils'
import { getCookie } from '@/utils/cookie'

import endpoint from './endpoint'
import { paginationUrl } from './pagination_url'
import { replaceStr } from '@/utils/reg'

export default {
  /**
   * 获取token
   * @param {Object} params idProvider publickey(toLowerCase) sign username
   */
  auth(params) {
    // 推荐人id
    let referral = utils.getCookie('referral')
    if (referral) Object.assign(params, { referral: referral })

    return request.post(
      `/login/auth`,
      params
    )
  },
  async wx(url) {
    return request.get(
      `${endpoint.wx}?url=${url}`
    )
  },
  getArticleInfo(hashOrId) {
    // post hash获取; p id 短链接;
    const url = /^[0-9]*$/.test(hashOrId) ? 'p' : 'post'
    return request.get(`/${url}/${hashOrId}`)
  },
  // 通过hash获取文章内容
  getIpfsData(hash) {
    return request.get(`/post/ipfs/${hash}`)
  },
  getMyPost(id) {
    return request.get(`/mypost/${id}`)
  },
  // 获取文章的ipfs hash信息
  getArticleIpfs(id) { return request.get(`/p/${id}/ipfs`) },
  getImg(hash) {
    return `${process.env.ssImgAddress}${hash}`
  },
  async getComments(signid) {
    return request.get('/comment/comments', {
      params: {signid}
    })
  },
  async getFans(uid, page = 1) {
    return request.get('/follow/fans', {
      params: {
        uid, page
      }
    })
  },
  async getFollows(uid, page = 1) {
    return request.get('/follow/follows', {
      params: {
        uid, page
      }
    })
  },
  async follow(uid) {
    return request.post('/follow/follow', { uid })
  },
  async unfollow(uid) {
    return request.post('/follow/unfollow', { uid })
  },
  async getMyUserData () {
    return request.get('/user/stats')
  },
  /**
   * BasePull 分页组件
   * @param {Object} param params参数
   */
  async getBackendData({ url, params, urlReplace }) {
    if (!urlReplace) {
      const pullApiUrl = paginationUrl
      return request({
        url: pullApiUrl[url],
        method: 'get',
        noLoading: true,
        params
      })
    } else {
      const pullApiUrl = paginationUrl
      let urlReg = replaceStr(pullApiUrl[url], ':', '/', urlReplace)
      return request({
        url: urlReg,
        method: 'get',
        noLoading: true,
        params
      })
      }
  },
  async getCaptcha(email, { geetest_challenge, geetest_validate, geetest_seccode }) {
    return request.post(`/login/captcha?email=${email}`, {
      geetest_challenge,
      geetest_validate,
      geetest_seccode
    }, { noLoading: true })

    return request.get('/login/captcha', { params: {email}, noLoading: true })
  },
  async verifyEmail(email) {
    return request({
      url: '/login/verify',
      method: 'get',
      params: { email },
      noLoading: true
    })
  },
  async register({email,password,captcha, referral}) {
    return request.post('/login/regist', { email, password, captcha: captcha.toString(), referral })
  },
  async login({username, password}) {
    return request.post('/login/account', { username, password })
  },
  async sendPost({ title, author, desc, content }) {
    const stringifyData = qs.stringify({
      'data[title]': title,
      'data[author]': author,
      'data[desc]': desc,
      'data[content]': content
    })
    return request({
      method: 'post',
      url: `/post/ipfs`,
      data: stringifyData,
      config: { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    })
  },
  async myPoints(params) {
    return request.get(`/user/points`, { params })
  },
  // 增加阅读量
  addReadAmount({ articlehash }) {
    return request({
      method: 'POST',
      url: `/post/show/${articlehash}`
    })
  },
  /**
   * 删除文章
   */
  delDraft({ id }) {
    return request({ method: 'DELETE', url: `/draft/${id}` })
  },
  /**
   * 文章导入
   * @param {String} url 导入地址
   */
  importArticle(url) {
    return request({
      method: 'post',
      url: '/posts/importer',
      data:{ url },
      timeout: 40000,
    })
  },
  // 文章持通证阅读
  addMineTokens(data) {
    return request({
      method: 'post',
      url: '/post/addMineTokens',
      data: data,
    })
  },
  // 文章持通证支付
  articlePrices(id, data) {
    return request({
      method: 'PUT',
      url: `/posts/${id}/prices`,
      data: data,
    })
  },
  // 删除文章持通证支付
  articlePricesDelete(id) {
    return request({
      method: 'DELETE',
      url: `/posts/${id}/prices`,
    })
  },
  /**
   * 发布文章接口 通用方法 私有方法
   * @param {String} url 接口地址
   * @param {Object} param1 文章参数
   */
  _sendArticle(
    url,
    { signId = null, author, data, title, fissionFactor, 
      cover, isOriginal, tags, commentPayPoint, shortContent, cc_license = null,
      requireToken, requireBuy }) {
    // 账号类型
    let idProvider = (utils.getCookie('idProvider')).toLocaleLowerCase()
    return request({
      method: 'POST',
      url,
      data: {
        author,
        cover,
        fissionFactor,
        data,
        platform: idProvider,
        signId,
        title,
        is_original: isOriginal,
        tags,
        cc_license,
        commentPayPoint,
        shortContent,
        requireToken, requireBuy
      },
      timeout: 30000
    })
  },
  /**
   * 发布文章
   * @param {Object} params 参数, 签名 非钱包用户需要签名
   */
  publishArticle({ article }) {
    return this._sendArticle('/post/publish', article)
  },
  /**
   * 编辑文章
   * @param {Object} params 参数, 签名 非钱包用户需要签名
   */
  editArticle({ article }) {
    return this._sendArticle('/post/edit', article)
  },
  // 创建草稿
  createDraft({ title, content, cover, fissionFactor, isOriginal, tags, commentPayPoint }) {
    return request({
      method: 'POST',
      url: '/draft/save',
      data: {
        title,
        content,
        cover,
        fissionFactor,
        is_original: isOriginal,
        tags,
        commentPayPoint
      }
    })
  },
  // 更新草稿
  updateDraft({ id, title, content, cover, fissionFactor, isOriginal, tags, commentPayPoint }) {
    return request({
      method: 'POST',
      url: '/draft/save',
      data: {
        id,
        title,
        content,
        cover,
        fissionFactor,
        is_original: isOriginal,
        tags,
        commentPayPoint
      }
    })
  },
  getDraft({ id }) {
    return request({ url: `/draft/${id}` })
  },
  // 提交积分评论
  postPointComment(data) {
    return request({
      method: 'POST',
      url: '/comment/comment',
      data: data
    })
  },
  /**
   * 上传图片
   * @param {String} type 上传类型
   * @param {Object} data 上传数据
   */
  uploadImage(type, data) {
    const url = {
      avatar: '/user/uploadAvatar',
      artileCover: '/post/uploadImage',
      coins: '/post/uploadImage', // fan票的icon也考虑新开路由
      banner: '/user/uploadBanner'
    }
    const formdata = new FormData()
    formdata.append('image', data)
    return request({
      method: 'POST',
      url: url[type],
      data: formdata
    })
  },
  ossUploadImage(folder, data) {
    const folderOption = {
      avatar: 'avatar', // 头像
      userBanner: 'userBanner', // 用户封面
      articleCover: 'articleCover', // 文章封面
      article: 'article', // 编辑器上传
      temp: 'temp', // 临时文件
      coin: 'coin', // fan票
    }
    const formdata = new FormData()
    // Invalid filename blob
    let filename = data.name ? data.name.split('.') : 'png'
    if (typeof filename !== 'string') {
      filename = filename[filename.length - 1]
    }
    formdata.append('file', data, `${Date.now()}.${filename}`)
    return request({
      method: 'POST',
      url: `/oss/uploadImage?folder=${folderOption[folder]}`,
      data: formdata
    })
  },
  // 通过用户名搜索
  searchUsername(username) {
      return request.get('/user/search', {
        params: {
          q: username
        }
      })
    },
  // 搜索推荐
  searchRecommend(params){
    return request('/search/recommend', params)
  },
  // 推荐作者||用户
  usersRecommend(params){
    return request('/users/recommend', params)
  },
  // 获取任务状态
  userPointStatus() {
    return request('/user/pointStatus')
  },
  // 领取任务积分
  userClaimTaskPoint(data) {
    return request({
      method: 'POST',
      url: '/user/claimTaskPoint',
      data: data
    })
  },
  // 获取首页统计数据
  postsStats() {
    return request('/posts/stats')
  },
  // 阅读获取积分
  postsIdReadnew(id, time) {
    return request.post(`/posts/${id}/readnew`, { time })
  },
  // 购买商品 可能会有区分 暂未合并
  reportOrder(data) {
    let address = { // 缺地址
      'eos': '',
      'ont': '',
      'vnt': process.env.VUE_APP_VNT_CONTRACT
    }
    // 平台类型
    let idProvider = utils.getCookie('idProvider').toLocaleLowerCase()
    let contract = address[idProvider] // 合约地址

    Object.assign(data, {
      contract: contract,
      platform: idProvider,
      symbol: idProvider.toUpperCase()
    })
    return request({ method: 'POST', url: '/order/order', data })
  },
  // 赞赏 可能会有区分 暂未合并
  support(data) {
    let address = { // 缺地址
      'eos': '',
      'ont': '',
      'vnt': process.env.VUE_APP_VNT_CONTRACT
    }
    // 平台类型
    let idProvider = utils.getCookie('idProvider').toLocaleLowerCase()
    let contract = address[idProvider] // 合约地址

    Object.assign(data, {
      contract: contract,
      platform: idProvider,
      symbol: idProvider.toUpperCase()
    })
    return request({ method: 'POST', url: '/support/support', data })
  },
  // 提交订单hash
  orderSaveHash(data) {
    return request({ method: 'POST', url: '/order/saveTxhash', data })
  },
  // 提交订单hash
  supportSaveHash(data) {
    return request({ method: 'POST', url: '/support/saveTxhash', data })
  },
  registerGT() {
    return request({
      url:`/gt/register-slide?t=${(new Date()).getTime()}`,
      method: 'get',
      dataType: "json",
    })
  },
  getWeixinOpenId(code) {
    return request.post('/wx/login', { code })
  },
  wxpay({ total, title, type, token_id, token_amount, limit_value, decimals, min_liquidity = 0, pay_cny_amount }) {
    return request.post('/wx/pay', { total, title, type, token_id, token_amount, limit_value, decimals, min_liquidity, pay_cny_amount })
  },
  allToken({page = 1, pagesize = 10, search = ''}) {
    return request({
      url: '/token/all',
      method: 'get',
      noLoading: true,
      params: {
        page,
        pagesize,
        search
      }
    })
  },
  /**
   * 创建我的token
   * // TODO 有字段后可移除注释
   * @param {Objject} data name symbol decimals // icon 暂无
   */
  minetokenCreate(data) {
    return request({
      method: 'POST',
      url: '/minetoken/create',
      data: data
    })
  },
  /**
   * 发行我的token
   * @param {Object} data amount
   */
  minetokenMint(data) {
    return request({
      method: 'POST',
      url: '/minetoken/mint',
      data: data
    })
  },/**
   * 修改token详情
   * @param {Object} data token详情
   * @param {Number} tokenId token id
   */
  minetokenTokenId(data, tokenId) {
    return request({
      method: 'PUT',
      url: `/minetoken/${tokenId}`,
      data: data
    })
  },
  /**
  * 修改token资源
  * @param {Object} data token资源
  * @param {Number} tokenId token id
  */
minetokenResources(data, tokenId) {
    return request({
      method: 'PUT',
      url: `/minetoken/${tokenId}/resources`,
      data: data
    })
  },
minetokenGetResources(tokenId) {
    return request({
      method: 'GET',
      url: `/minetoken/${tokenId}/resources`,
    })
  },
  /**
   * 转移token
   * @param {*} data tokenId to amount
   */
  transferMinetoken(data) {
    return request({
      method: 'POST',
      url: '/minetoken/transfer',
      data: data
    })
  },
  /**
   * Fan票详情
   * @param {Number} id token id
   */
  minetokenId(id) {
    return request({
      method: 'GET',
      url: `/minetoken/${id}`,
    })
  },
  /**
   * 获取token详情
   * 请求头：x-access-token
   * 用户发行了token，data为对象，没有发行token，data为null
   */
  tokenDetail() {
    return request.get('/token/minetoken')
  },
  // -------------------------------- exchange API --------------------------------
  getCurrentPoolSize(tokenId) {
    return request({
      method: 'get',
      url: '/exchange/currentPoolSize',
      params: {
        tokenId
      }
    })
  },
  getYourPoolSize(tokenId) {
    return request({
      method: 'get',
      url: '/exchange/userPoolSize',
      params: {
        tokenId
      }
    })
  },
  getYourMintToken(tokenId, amount) {
    return request({
      method: 'get',
      url: '/exchange/userMintToken',
      params: {
        tokenId, amount
      }
    })
  },
  getOrderStatus(tradeNo) {
    return request({
      method: 'get',
      url: '/exchange/notify',
      params: {
        trade_no: tradeNo
      }
    })
  },
  getOutputAmount(inputTokenId, outputTokenId, inputAmount) {
    return request({
      method: 'get',
      url: '/exchange/outputAmount',
      params: {
        inputTokenId, outputTokenId, inputAmount
      }
    })
  },
  getInputAmount(inputTokenId, outputTokenId, outputAmount) {
    return request({
      method: 'get',
      url: '/exchange/inputAmount',
      params: {
        inputTokenId, outputTokenId, outputAmount
      }
    })
  },
  // token 换 token / cny接口
  swap({inputTokenId, outputTokenId, amount, limitValue, base}) {
    return request({
      method: 'post',
      url: '/exchange/swap',
      data: {
        inputTokenId, outputTokenId, amount, limitValue, base
      }
    })
  },
  getOutputPoolSize(amount, tokenId) {
    return request({
      method: 'get',
      url: '/exchange/outputPoolSize',
      params: {
        amount, tokenId
      }
    })
  },
  removeLiquidity({ tokenId, amount, min_cny, min_tokens }) {
    return request({
      method: 'post',
      url: '/exchange/removeLiquidity',
      data: {
        tokenId, amount, min_cny, min_tokens
      }
    })
  },
  getPoolCnyToTokenPrice(inputTokenId, outputTokenId, inputAmount) {
    return request({
      method: 'get',
      url: '/exchange/poolCnyToTokenPrice',
      params: {
        outputTokenId, inputAmount
      }
    })
  },
  getUserBalance(tokenId) {
    return request({
      method: 'get',
      url: '/minetoken/balance',
      params: {
        tokenId
      }
    })
  },
  tokenUserId(id) {
    return request({
      method: 'get',
      url: `/token/user/${id}`,
    })
  },
  getCNYBalance() {
    return request({
      method: 'get',
      url: '/asset/balance',
      params: {
        symbol: 'CNY'
      }
    })
  },
  addLiquidityBalance({tokenId, cny_amount, token_amount, min_liquidity, max_tokens, deadline}) {
    return request({
      method: 'post',
      url: '/exchange/addLiquidityBalance',
      data: {
        tokenId, cny_amount, token_amount, min_liquidity, max_tokens, deadline 
      }
    })
  },
  // 以输入为准
  cnyToTokenInputBalance({tokenId, cny_sold, min_tokens, deadline}) {
    return request({
      method: 'post',
      url: '/exchange/cnyToTokenInputBalance',
      data: {
        tokenId, cny_sold, min_tokens, deadline
      }
    })
  },
  // 以输出为准
  cnyToTokenOutputBalance({tokenId, tokens_bought, max_cny, deadline}) {
    return request({
      method: 'post',
      url: '/exchange/cnyToTokenOutputBalance',
      data: {
        tokenId, tokens_bought, max_cny, deadline
      }
    })
  },
  getPurchaseLogs(tokenId) {
    return request({
      method: 'get',
      url: '/token/purchaseLogs',
      params: {
        tokenId
      }
    })
  },
  getMyPurchaseLogs(tokenId) {
    return request({
      method: 'get',
      url: '/token/myPurchaseLogs',
      params: {
        tokenId
      }
    })
  },
  getLiquidityLogs(tokenId) {
    return request({
      method: 'get',
      url: '/token/liquidityLogs',
      params: {
        tokenId
      }
    })
  },
  getMyLiquidityLogs(tokenId) {
    return request({
      method: 'get',
      url: '/token/myLiquidityLogs',
      params: {
        tokenId
      }
    })
  },
  loginWeixin(code) {
    return request({
      method: 'POST',
      url: '/login/weixin',
      data: {
        code
      }
    })
  },
  /**
   * 解析引用网址的title
   * @param {Object} data {url: xxx}
   */
  extractRefTitle(data) {
    return request({
      method: 'POST',
      url: '/posts/extractRefTitle',
      data
    })
  },
  // 添加/修改草稿引用 id: signId
  draftsReferences(id, data) {
    return request({
      method: 'PUT',
      url: `/drafts/${id}/references`,
      data
    })
  },
  // 删除草稿引用 signId number
  removeDraftsReferences(id, number) {
    return request({
      method: 'DELETE',
      url: `/drafts/${id}/references/${number}`
    })
  },
  // 根据草稿Id、number获取文章引用
  getDraftsReferences(id, number){
    return request({
      method: 'GET',
      url: `/drafts/${id}/references/${number}`
    })
  },
  // draftId
  // 草稿发布时发布引用的文章
  draftsReferencesPublish(id, data) {
    return request({
      method: 'POST',
      url: `/drafts/${id}/references/publish`,
      data
    })
  },
  // 删除草稿引用 signId number
  removePostsReferences(id, number) {
    return request({
      method: 'DELETE',
      url: `/posts/${id}/references/${number}`
    })
  },
  // 添加/修改草稿引用 id: signId
  postsReferences(id, data) {
    return request({
      method: 'PUT',
      url: `/posts/${id}/references`,
      data
    })
  },
  // 根据草稿Id、number获取文章引用
  getPostsReferences(id, number) {
    return request({
      method: 'GET',
      url: `/posts/${id}/references/${number}`
    })
  },
  // 根据symbol获取token信息
  getTokenBySymbol(symbol) {
    return request({
      method: 'GET',
      url: '/token/symbol',
      params: {
        symbol
      }
    })
  },

  // 根据id获取个人资料中的社交账号和相关网站
  getUserLinks({id}) {
    return request.get(`/user/${id}/links`);
  },

  //-------------文章支付使用开始-----------------
  wxNativePay(tradeNo, title) {
    return this.orderWxpay({
      tradeNo,
      trade_type: 'NATIVE',
      title
    })
  },
  wxJsapiPay(tradeNo, openid, title) {
    return this.orderWxpay({
      tradeNo,
      trade_type: 'JSAPI',
      title,
      openid
    })
  },
  orderWxpay(order) {
    return request.post('/order/wxpay', order)
  },
  //-------------文章支付使用结束-----------------
  getOrderData(tradeNo) {
    return request({
      method: 'get',
      url: `/orders/${tradeNo}`
    })
  },
  updateOrder(tradeNo, order) {
    return request({
      method: 'put',
      url: `/orders/${tradeNo}`,
      data: order
    })
  },
  createOrder(order) {
    return request({
      method: 'PUT',
      url: '/orders',
      data: order
    })
  },
  handleAmount0(tradeNo) {
    return request({
      method: 'post',
      url: '/orders/handleAmount0',
      data: {
        tradeNo
      }
    })
  },
  // 获取收藏文章
  getBookmarks(orderType = 1) {
    return request.get(`/user/bookmarks`, {
      params: {
        order: orderType
      }
    })
  },
  transferAsset({ symbol = 'cny', to, amount }) {
    return request({
      method: 'POST',
      url: '/asset/transfer',
      data: {
        symbol, to, amount
      }
    })
  },
  fetchNotifications(provider, page = 1, type = 'check_time') {
    return request.get('/notification/fetch', { params: { page, type, provider } })
  },
  getNotificationCounters() {
    return request.get('/notification')
  },
  readNotifications(provider) {
    return request.post('/notification/read', { provider })
  },
  async getResetCaptcha(email, { geetest_challenge, geetest_validate, geetest_seccode }) {
    return request({
      method: 'POST',
      url: `/login/resetPassword/captcha?email=${email}`,
      data: {
        geetest_challenge,
        geetest_validate,
        geetest_seccode
      }
    })
  },
  async resetPassword({ email, password, captcha }) {
    return request({
      method: 'POST',
      url: `/login/resetPassword`,
      data: {
        email,
        password,
        captcha: captcha.toString()
      }
    })
  },
  // -------------------------------- 用户登录 --------------------------------
  // github登录
  loginGitHub(code) {
    let params = { code }
    // 推荐人id
    let referral = getCookie('referral')
    if (referral) Object.assign(params, { referral: referral })
    return request.post('/login/github', params)
  },
  // 得到用户信息
  getUser(id) { return request.get(`/user/${id}`) },
  // 增加阅读量
  read(hash) { return request.post(`/post/show/${hash}`) },
  // 获取当前用户的文章信息
  currentProfile(data) { return request.post('/post/currentProfile', data) },
  // 收藏
  bookmark(id) { return request.post(`/post/${id}/bookmark`) },
  unbookmark(id) { return request.delete(`/post/${id}/bookmark`) },
  // 点赞
  like(id, data) { return request.post(`/posts/${id}/like`, data) },
  dislike(id, data) { return request.post(`/posts/${id}/dislike`, data) },
  // 客户端打开文章后提交，表示开始阅读
  reading(id) { return request.post(`/posts/${id}/reading`) },
  // -------------------------------- 账号绑定 --------------------------------
  // account binding
  accountBind(params) { return request.post('/account/binding', params) },
  // account unbinding
  accountUnbind(params) { return request.post('/account/unbinding', params) },
  // 切换主账号
  accountChange(params) { return request.post('/account/changeMainAccount', params) },
  // 账号列表
  accountList() { return request.get('/account/list') },
  // -------------------------------- 分享 --------------------------------
  // 创建分享
  createShare(data) { return request.post('/share', data) },
  // 分享详情
  // 暂时不用, 后端说用 p 接口
  // shareDetail(id) { return request.get(`/share/${id}`) },
  shareDetail(id) { return request.get(`/p/${id}`) },
  // telegram 登录
  telegramLogin(data) {
    return request({
      method: 'POST',
      url: '/login/telegram',
      data: data
    })
  },
  // twitter 登录
  twitterLogin(data) {
    return request({
      method: 'POST',
      url: '/login/twitter',
      data: data
    })
  },
  // --------------------------- 搜索 ------------------------------------
  search(type, params) {
    return request.get(`/search/${type}`, { params })
  },
  // 常用候选列表
  historyUser(params) {
    return request.get(`/history/user`, { params })
  },
  // --------------------- dao jam -----------------
  // 获取身份可选项options
  daoJobOptions() {
    return request.get(`/dao/job/options`)
  },
  // 获取用户身份
  getDaoUserJob(params) {
    return request.get(`/dao/user/job`, { params })
  },
  // 创建用户身份
  daoUserJob(data) {
    return request.post(`/dao/user/job`, data)
  },
  // 获取技能可选项options
  daoSkillOptions() {
    return request.get(`/dao/skill/options`)
  },
  // 获取用户技能
  getDaoUserSkill(params) {
    return request.get('/dao/user/skill', { params })
  },
  // 创建用户技能
  daoUserSkill(data) {
    return request.post('/dao/user/skill', data)
  },
  // 用户托管地址
  userAddress(params) {
    return request.get('/_daothon_/useraddress', { params })
  }
}
