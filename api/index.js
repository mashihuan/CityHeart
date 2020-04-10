import ajax from './ajax'

// const BASE_URL = 'http://test1.chenzhuo.vip'   //  http://192.168.28.6:10014   http://192.168.31.7:10014
const BASE_URL = 'http://103.36.192.35:10081'  
export {
	BASE_URL
}

// 发送短信验证码
export const getSms = (params) => ajax(BASE_URL + '/api/user/sendsms', params)
// 注册
export const register = (params) => ajax(BASE_URL + '/api/user/register', params)
// 登录
export const login = (params) => ajax(BASE_URL + '/api/user/login', params)
// 修改密码
export const forgetPwd = (params) => ajax(BASE_URL + '/api/user/resetpwd', params)
// 获取首页轮播图
export const getHomeCarousel = (params) => ajax(BASE_URL + '/api/ccarousel/getInfor', params)
// 获取首页店铺分类
export const getHomeClassify = (params) => ajax(BASE_URL + '/api/Cshangclass/getClass', params)
// 获取首页店铺推荐
export const getHomeRecommend = (params) => ajax(BASE_URL + '/api/cshangdetail/newShangRecommend', params)
// 根据分类id获取推荐
export const getHomeRecommendById = (params) => ajax(BASE_URL + '/api/cshangdetail/shangFenlei', params)
// 首页搜索
export const getHomeSearchResult = (params) => ajax(BASE_URL + '/api/Cshangdetail/searchshang', params)

// 获取店铺详情
export const getMerchantDetail = (params) => ajax(BASE_URL + '/api/cshangdetail/getsShangDetail', params)
// 获取店铺的商品
export const getMerchantGoods = (params) => ajax(BASE_URL + '/api/cshangdetail/getClass', params)
// 收藏店铺
export const addFavoriteStore = (params) => ajax(BASE_URL + '/api/ccollection/adSou', params)
// 取消店铺
export const delFavoriteStore = (params) => ajax(BASE_URL + '/api/ccollection/deSou', params)
// 平台评论
export const getPlatformComment = (params) => ajax(BASE_URL + '/api/user/sePingtai', params)
// 评论分类
export const getCommentType = (params) => ajax(BASE_URL + '/api/ccommentclass/seFenlei', params)
// 获取用户评论
export const getUserComment = (params) => ajax(BASE_URL + '/api/ccomment/sePing', params)
// 获取评论分类
export const getCommentClassify = (params) => ajax(BASE_URL + '/api/ccommentclass/seFenlei', params)
// 获取评论分类对应的评论
export const getCommentByClassify = (params) => ajax(BASE_URL + '/api/ccomment/sePingfen', params)
// 发起评价
export const publishComment = (params) => ajax(BASE_URL + '/api/ccomment/addPing', params)

// 分享有礼
export const getShareInfo = (params) => ajax(BASE_URL + '/api/cshare/seFenxiang', params)

// 获取用户信息
export const getUserInfo = (params) => ajax(BASE_URL + '/api/user/seUser', params)
// 修改用户昵称
export const changeUserNickname = (params) => ajax(BASE_URL + '/api/user/upUser', params)
// 修改用户手机号
export const changeUserPhone = (params) => ajax(BASE_URL + '/api/user/changemobile', params)

// 获取用户的收藏
export const getUserFavorite = (params) => ajax(BASE_URL + '/api/ccollection/seSou', params)
// 获取用户的评论
export const getUserComments = (params) => ajax(BASE_URL + '/api/ccomment/sePinguser', params)
// 用户删除评论
export const delUserComments = (params) => ajax(BASE_URL + '/api/ccomment/dePinguser', params)

// 获取用户浏览历史
export const getUserHistory = (params) => ajax(BASE_URL + '/api/cbrowse/seLiulanli', params)
// 用户新增浏览历史
export const addUserHistory = (params) => ajax(BASE_URL + '/api/cbrowse/addLiu', params)
// 清空浏览历史
export const clearUserHistory = (params) => ajax(BASE_URL + '/api/cbrowse/deLiulan', params)

// 申请成为商家
export const applyMerchant = (params) => ajax(BASE_URL + '/api/user/upUsershang', params)

// 修改商家首页图片
export const changeMerchanPhoto = (params) => ajax(BASE_URL + '/api/cshangdetail/upShangtu', params)
// 修改商家轮播图
export const changeMerchanCarousel = (params) => ajax(BASE_URL + '/api/cshangdetail/upShanglun', params)
// 修改商家名称、电话、地址
export const changeMerchantInfo = (params) => ajax(BASE_URL + '/api/cshangdetail/upShang', params)

// 新增商品分类
export const addSort = (params) => ajax(BASE_URL + '/api/ccaiclass/adShangfen', params)
// 删除商品分类
export const delSort = (params) => ajax(BASE_URL + '/api/ccaiclass/deShangfen', params)
// 编辑商品分类
export const editSort = (params) => ajax(BASE_URL + '/api/ccaiclass/upShangfen', params)

// 添加商品
export const addGoods = (params) => ajax(BASE_URL + '/api/cgoods/adGoods', params)
// 修改商品
export const editGoods = (params) => ajax(BASE_URL + '/api/cgoods/upGoods', params)
// 删除商品
export const delGoods = (params) => ajax(BASE_URL + '/api/cgoods/deGoods', params)
// 修改活动
export const editActivity = (params) => ajax(BASE_URL + '/api/cshangdetail/upShanghuo', params)

// 检查更新
export const checkUpdate = (params) => ajax(BASE_URL + '/api/cconfig/seBanben', params)
// 修改密码
export const changePwd = (params) => ajax(BASE_URL + '/api/user/resetpwd_new', params)