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
	[HOME_CAROUSEL] (state, data) {
		state.home_carousel = data || [];
	},
	[HOME_CLASSIFY] (state, data) {
		state.home_classify = data || [];
	},
	[HOME_RECOMMEND] (state, data) {
		if(data.first) {
			state.home_recommed = []
		}
		state.home_recommed = state.home_recommed.concat(data.data);
	},
	[MERCHANT_DETAIL] (state, data) {
		let merchantCarousel = [];
		let activeCarousel = [];
		if(data.images) {
			if(data.images.includes(',')) {
				merchantCarousel = data.images.split(',')
			}else {
				merchantCarousel = [data.images]
			}
		}
		if(data.huo_image) {
			if(data.huo_image.includes(',')) {
				activeCarousel = data.huo_image.split(',')
			}else {
				activeCarousel = [data.huo_image]
			}
		}
		state.merchant_detail = data || {};
		state.merchantCarousel = merchantCarousel;
		state.activeCarousel = activeCarousel;
		state.collectStatus = data.shouchang;
		state.platform_comment = data.pingtai[0] || {};
		// state.user_comment = data.yonghuping || [];
	},
	[MERCHANT_GOODS] (state, data) {
		let sortList = [];
		let goodsList = [];
		if(data && data.length > 0) {
			data.forEach((val, index) => {
				sortList.push({name: val.name, id: val.id})
				if(val.cgoods && val.cgoods.length > 0) {
					val.cgoods.forEach((v, i) => {
						goodsList.push({id: v.id, img: v.images, name: v.name, price: v.jia, class_id: v.ccaiclass_id})
					})
				}
			})
		}
		state.merchant_goods = data || [];
		state.sortList = sortList || [];
		state.goodsList = goodsList || [];
	},
	[HOME_SEARCH_RESULT] (state, data) {
		state.search_result = data || [];
	},
	[PLATFORM_COMMENT] (state, data) {
		state.platform_comment = data[0] || {};
	},
	[COMMENT_TYPE] (state, data) {
		state.comment_type = data || [];
	},
	[USER_COMMENT] (state, data) {
		state.user_comment = data || [];
	},
	[COMMENT_CLASSIFY] (state, data) {
		state.comment_classify = data || [];
	},
	[SHARE_INFO] (state, data) {
		state.share_info = data || [];
	},
	[USER_INFO] (state, data) {
		state.user_info = data || {};
	},
	[USER_FAVORITE] (state, data) {
		state.user_favorite = data || [];
	},
	[USER_COMMENTS] (state, data) {
		state.user_comments = data || [];
	},
	[USER_HISTORY] (state, data) {
		state.user_history = data || [];
	},
	clearInfo (state) {
		state.home_recommed = [];
		state.user_favorite = [];
		state.user_history = [];
	},
	saveApplyInfo (state, data) {
		state.applyInfo = data || {}
	}
}