<template>
	<view class="container">
		<view class="border-radius bg-white shadow">
			<merchant-info :activeCarousel="activeCarousel" :merchantCarousel="merchantCarousel" :merchant_detail="merchant_detail" @onOpenLocationEvent="onOpenLocationEvent"></merchant-info>
			<merchant-menu :merchant_goods="merchant_goods" :onToCommentEvent="onToCommentEvent"></merchant-menu>
		</view>
	</view>
</template>

<script>
	import merchantInfo from './children/merchant-info'
	import merchantMenu from './children/merchant-menu'
	import { mapState, mapActions } from 'vuex'
	import { addFavoriteStore, delFavoriteStore, getMerchantDetail, getMerchantGoods } from '@/api'
	import { dealLogin } from '@/common/js/common'
	export default {
		name: '',
		data() {
			return {
				id: '',
				merchantInfo: {},
				merchantGoods: [],
				collect: 0,
			}
		},
		computed: {
			...mapState(['merchant_detail', 'merchant_goods', 'activeCarousel', 'merchantCarousel', 'collectStatus']),
		},
		onLoad(options) {
			this.id = options.id;
		},
		onReady () {
			console.log(this.id)
			this.reqGetMerchantDetail({id: this.id, user_id: uni.getStorageSync('user_id'), token: uni.getStorageSync('token'), callback: this._dealFavorite}),
			this.reqGetMerchantGoods({id: this.id})
		},
		onNavigationBarButtonTap(e) {
			let that = this;
			let user_id = uni.getStorageSync('user_id');
			let token = uni.getStorageSync('token');
			if(!user_id) {
				uni.navigateTo({
					url: '/pages/login/login'
				})
				return;
			}
			if(this.merchant_detail.shouchang == 0) {   // 添加收藏
				addFavoriteStore({
					cshangdetail_id: this.id,
					id: user_id
				}).then(res => {
					if(res.code == 200) {
						uni.showToast({
							title: '收藏成功'
						})
						that.reqGetMerchantDetail({id: that.id, user_id: user_id, token: token, callback: that._dealFavorite})
					}
				})
			}
			if(this.merchant_detail.shouchang == 1) {   // 取消收藏
				console.log(this.merchant_detail.ccollection_id);
				delFavoriteStore({
					id: this.merchant_detail.ccollection_id,
					// token: token,
					// id: user_id
				}).then(res => {
					if(res.code == 200) {
						uni.showToast({
							title: '收藏取消'
						})
						that.reqGetMerchantDetail({id: that.id, user_id: user_id, token: token, callback: that._dealFavorite})
					}
				})
			}
		},
		methods: {
			...mapActions(['reqGetMerchantDetail', 'reqGetMerchantGoods']),
			onToCommentEvent () {
				uni.navigateTo({
					url: '/pages/user/home/subPages/merchant-comment/merchant-comment?id=' + this.id
				})
			},
			_dealFavorite (type) {  // 判断当前店铺是否已收藏
				console.log(type)
				let pages = getCurrentPages();
				let page = pages[pages.length - 1];
				// #ifdef APP-PLUS
				let currentWebview = page.$getAppWebview();
				let titleObj = currentWebview.getStyle().titleNView;
				console.log(JSON.stringify(titleObj))
				if (!titleObj.buttons) {
					return;
				}
				titleObj.buttons[0].color = type == 1 ? '#ff0000' : '#ffffff';
				currentWebview.setStyle({
					titleNView: titleObj
				});
				// #endif
			},
			onOpenLocationEvent () {
				console.log(this.merchant_detail)
				let latitude = parseFloat(this.merchant_detail.wei);
				let longitude = parseFloat(this.merchant_detail.jing);
				uni.getLocation({
						type: 'gcj02', //返回可以用于uni.openLocation的经纬度
						success: function (res) {
							console.log(res)
								uni.openLocation({
										latitude: latitude,
										longitude: longitude,
										success: function () {
												console.log('success');
										}
								});
						},
						fail: function (res) {
							console.log(res)
						}
				});
				// uni.openLocation({
				// 	latitude: parseFloat(this.merchant_detail.wei),
				// 	longitude: parseFloat(this.merchant_detail.jing),
				// 	success: function () {
				// 		console.log('success');
				// 	},
				// 	fail: function (res) {
				// 		console.log('err', res)
				// 	}
				// });
			}
		},
		components: {
			merchantInfo,
			merchantMenu
		}
	}
</script>

<style lang="scss" scoped>
.detail {
	padding: 30upx 50upx;
	.name {
		margin-bottom: 30upx;
		font-size: 32upx;
	}
	.photo {
		height: 300upx;
	}
	.info {
		padding: 30upx 0;
		font-size: 24upx;
		image {
			width: 25upx;
			height: 30upx;
			margin-right: 20upx;
		}
	}
	.desc {
		margin-bottom: 20upx;
		font-size: 24upx;
		line-height: 2; 
	}
	.activity {
		margin: 30upx 0 10upx 0;
	}
}
</style>
