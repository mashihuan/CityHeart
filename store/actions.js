import {
	getSms,
	getHomeCarousel,
	getHomeClassify,
	getHomeRecommend,
	getHomeRecommendById,
	getMerchantDetail,
	getMerchantGoods,
	getHomeSearchResult,
	getPlatformComment,
	getCommentType,
	getUserComment,
	getCommentClassify,
	getCommentByClassify,
	getShareInfo,
	getUserInfo,
	getUserFavorite,
	getUserComments,
	getUserHistory
} from '@/api'

import {
	HOME_CAROUSEL,
	HOME_CLASSIFY,
	HOME_RECOMMEND,
	MERCHANT_DETAIL,
	MERCHANT_GOODS,
	HOME_SEARCH_RESULT,
	PLATFORM_COMMENT,
	COMMENT_TYPE,
	USER_COMMENT,
	COMMENT_CLASSIFY,
	SHARE_INFO,
	USER_INFO,
	USER_FAVORITE,
	USER_COMMENTS,
	USER_HISTORY
} from './mutation-types'

export default {
	async reqGetSms ({commit}, params) {
		params.callback(params.that)
		let result = await getSms({phone: params.phone});
		if(result.code == 200) {
			uni.showToast({
				title: '验证码发送成功',
			})
		}
	},
	async reqGetHomeCarousel ({commit}, params) {
		let result = await getHomeCarousel(params);
		commit(HOME_CAROUSEL, result.data)
	},
	async reqGetHomeClassify ({commit}, params) {
		let result = await getHomeClassify(params);
		commit(HOME_CLASSIFY, result.data)
	},
	async reqGetHomeRecommend ({commit}, params) {
		uni.showLoading({
			title: '正在加载数据...'
		})
		let result = await getHomeRecommend(params.data);
		if(result.code == 200) {
			if(params.callback1 && result.data.length > 0) {params.callback1()}
			if(params.callback2) {
				if(result.data.length <= 0) {
					params.callback2()
				}else {
					
				}
			}
			commit(HOME_RECOMMEND, {data: result.data})
		}
		uni.hideLoading()
	},
	async reqGetHomeRecommendById ({commit}, params) {
		uni.showLoading({
			title: '正在加载数据...'
		})
		let result = await getHomeRecommendById(params.data);
		if(result.code == 200) {
			if(params.callback1 && result.data.length > 0) {params.callback1()}
			if(params.callback2) {
				if(result.data.length <= 0) {
					params.callback2()
				}else {
					
				}
			}
			if(params.first) {
				var first = params.first;
			}
			commit(HOME_RECOMMEND, {data: result.data, first: first})
		}
		uni.hideLoading()
	},
	async reqGetMerchantDetail ({commit}, params) {
		let result = await getMerchantDetail({id: params.id, user_id: params.user_id, token: params.token, page: 1, limit: 100});
		if(params.callback) {
			params.callback(result.data[0].shouchang)
		}
		commit(MERCHANT_DETAIL, result.data[0])
	},
	async reqGetMerchantGoods ({commit}, params) {
		uni.showLoading({
			title: '正在加载数据...'
		})
		let result = await getMerchantGoods(params);
		uni.hideLoading()
		commit(MERCHANT_GOODS, result.data)
	},
	async reqGetHomeSearchResult ({commit}, params) {
		uni.showLoading({
			title: '正在加载数据...'
		})
		let result = await getHomeSearchResult(params.data);
		if(params.callback1 && result.data.length <= 0) {
			params.callback1()
		}
		if(params.callback2 && result.data.length > 0) {
			params.callback2()
		}
		uni.hideLoading()
		params.callback3(result.data)
		// commit(HOME_SEARCH_RESULT, result.data)
	},
	async reqGetPlatformComment ({commit}, params) {
		let result = await getPlatformComment(params);
		commit(PLATFORM_COMMENT, result.data[0])
	},
	async reqGetCommentType ({commit}, params) {
		let result = await getCommentType(params);
		commit(COMMENT_TYPE, result.data || [])
	},
	async reqGetUserComment ({commit}, params) {
		uni.showLoading({
			title: '正在加载数据...'
		})
		let result = await getUserComment(params);
		uni.hideLoading()
		commit(USER_COMMENT, result.data || [])
	},
	async reqGetCommentClassify ({commit}, params) {
		uni.showLoading({
			title: '正在加载数据...'
		})
		let result = await getCommentClassify(params);
		uni.hideLoading()
		commit(COMMENT_CLASSIFY, result.data || [])
	},
	async reqGetShareInfo ({commit}, params) {
		uni.showLoading({
			title: '正在加载数据...'
		})
		let result = await getShareInfo(params);
		uni.hideLoading();
		commit(SHARE_INFO, result.data || {})
	},
	async reqGtCommentByClassify ({commit}, params) {
		uni.showLoading({
			title: '正在加载数据...'
		})
		let result = await getCommentByClassify(params);
		uni.hideLoading();
		commit(USER_COMMENT, result.data || [])
	},
	async reqGetUserInfo ({commit}, params) {
		uni.showLoading({
			title: '正在加载数据...'
		})
		let result = await getUserInfo({id: params.id});
		uni.stopPullDownRefresh()
		uni.hideLoading();
		if(params.callback && result.data[0]) {
			params.callback(result.data[0].shenhe)
		}
		
		commit(USER_INFO, result.data[0] || {})
	},
	async reqGetUserFavorite ({commit}, params) {
		uni.showLoading({
			title: '正在加载数据...'
		})
		let result = await getUserFavorite(params.data);
		uni.hideLoading();
		let arr = result.data || [];
		if(arr.length >= params.limit) {
			params.callback1()
		}else {
			params.callback2()
		}
		commit(USER_FAVORITE, result.data || [])
	},
	async reqGetUserComments({commit}, params) {
		uni.showLoading({
			title: '正在加载数据...'
		})
		let result = await getUserComments(params.data);
		console.log(result)
		uni.hideLoading();
		let arr = result.data || [];
		if(arr.length >= params.data.limit) {
			params.callback1()
		}else {
			params.callback2()
		}
		commit(USER_COMMENTS, result.data || [])
	},
	async reqGetUserHistory ({commit}, params) {
		uni.showLoading({
			title: '正在加载数据...'
		})
		let result = await getUserHistory(params.data);
		let arr = result.data || [];
		if(arr.length >= params.data.limit) {
			params.callback1()
		}else {
			params.callback2()
		}
		uni.hideLoading();
		commit(USER_HISTORY, result.data || [])
	},
}