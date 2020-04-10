<template>
	<view>
		<block v-if="index == 0">
			<view class="container" :style="{height: ScrollHeigfht}">
				<view class="wrap d-flex border-radius bg-white shadow">
					<scroll-view class="nav-left border-radius" scroll-y style="height: 100%">
						<view class="nav-left-item" @click="categoryClickMain(item,index)" :key="index" :class="index==current?'active':''"
						    v-for="(item,index) in categoryList">
							{{item}}
						</view>
					</scroll-view>
					<!-- 首页图片 -->
					<scroll-view v-show="current == 0" class="nav-right border-radius" scroll-y style="height: 100%;" scroll-with-animation>
						<home-picture :user_info="user_info" @onConfirmEvent="onConfirmEvent" @onUpLoadPictureEvent="onUpLoadPictureEvent"></home-picture>
					</scroll-view>
					<!-- 店铺名称 -->
					<scroll-view v-show="current == 1" class="nav-right border-radius" scroll-y style="height: 100%;" scroll-with-animation>
						<merchant-name :user_info="user_info"></merchant-name>
					</scroll-view>
					<!-- 商品管理 -->
					<scroll-view v-show="current == 2" class="nav-right border-radius" scroll-y style="height: 100%;" scroll-with-animation>
						<goods-manager @onEditGoodsEvent="onEditGoodsEvent" @onDelGoodsEvent="onDelGoodsEvent"></goods-manager>
					</scroll-view>
					<!-- 分类管理 -->
					<scroll-view v-show="current == 3" class="nav-right border-radius" scroll-y style="height: 100%;" scroll-with-animation>
						<sort-manager @onEditGoodsEvent="onEditGoodsEvent" @onDelGoodsEvent="onDelGoodsEvent"></sort-manager>
					</scroll-view>
					<!-- 活动管理 -->
					<scroll-view v-show="current == 4" class="nav-right border-radius" scroll-y style="height: 100%;" scroll-with-animation>
						<activity-manager :user_info="user_info"></activity-manager>
					</scroll-view>
				</view>
			</view>
		</block>	
		<block v-if="index == 1">
			<mine></mine>
		</block>
		<!-- tabBar -->
		<tab-bar @onTabbarClickEvent="onTabbarClickEvent"></tab-bar>
	</view>
	
	
</template>

<script>
	import tabBar from '@/components/tabBar'
	import homePicture from './children/home-picture'
	import merchantName from './children/merchant-name'
	import goodsManager from './children/goods-manager'
	import sortManager from './children/sort-manager'
	import activityManager from './children/activity-manager'
	import mine from '@/pages/service/mine/index/index'
	import { changeNavigationBarText, changeNavigationBarButton } from '@/common/js/common.js'
	import { mapState, mapActions } from 'vuex'
	import { BASE_URL } from '@/api'
	export default {
		name: '',
		data () {
			return {
				ScrollHeigfht: 0,
				categoryList: ['首页图片', '店铺名称', '商品管理', '分类管理', '活动管理'],
				subCategoryList: [],
				current: 0,
				index: 0, // tabbar下标
			}
		},
		onLoad () {
			this._dealScrollHeight();
			this._reqGetMerchantGoods();
		},
		onShow () {
			if(index == 2 || index == 3) {
				changeNavigationBarButton('添 加')
			}else {
				changeNavigationBarButton('')
			}
		},
		computed: {
			...mapState(['user_info', 'merchant_goods'])
		},
		onNavigationBarButtonTap () {
			if(this.current == 2) {
				if(this.merchant_goods.length <= 0) {
					uni.showToast({
						title: '当前没有商品分类,请添加分类后再来添加商品',
						icon: 'none'
					})
					return;
				}
				uni.navigateTo({
					url: '/pages/service/home/subPages/add-goods'
				})
			}
			if(this.current == 3) {
				uni.navigateTo({
					url: '/pages/service/home/subPages/add-sort'
				})
			}
		},
		methods: {
			...mapActions(['reqGetMerchantGoods']), 
			_reqGetMerchantGoods () {   // 获取店铺商品及分类
				this.reqGetMerchantGoods({
					id: this.user_info.cshangdetail.id
				})
			},
			_dealScrollHeight () {  // 计算scrollHeight
				let windowHeight = uni.getSystemInfoSync().windowHeight;
				let tabbarHeight;
				// #ifdef APP-PLUS
					tabbarHeight = 56;
				// #endif	
				// #ifdef H5
					tabbarHeight = 50;
				// #endif	
				windowHeight = windowHeight - tabbarHeight;
				this.ScrollHeigfht = windowHeight + 'px'
			},
			categoryClickMain (item, index) {  // 左侧点击
				if(this.current != index) {
					this.current = index;
				}
				if(index == 2 || index == 3) {
					changeNavigationBarButton('添 加')
				}else {
					changeNavigationBarButton('')
				}
			},
			onConfirmEvent (type) { // 点击确定按钮
				console.log(type)
			},
			onUpLoadPictureEvent (type) {  // 点击上传图片
				console.log(type)
			},
			onDelGoodsEvent () {  
				if(this.current == 2) {  // 删除商品
					
				}
				if(this.current == 3) {  // 删除分类
					
				}
			},
			onEditGoodsEvent () {  
				if(this.current == 2) {   // 编辑商品
					uni.navigateTo({
						url: '/pages/service/home/subPages/add-goods?id=' + 1,
					})
				}
				if(this.current == 3) {    // 编辑分类
					uni.navigateTo({
						url: '/pages/service/home/subPages/add-sort?id=' + 1,
					})
				}
			},
			_createNavigationBarButton (text) {   // 动态添加导航栏添加按钮
				let pages = getCurrentPages();
				let page = pages[pages.length - 1];
				// #ifdef APP-PLUS
				let currentWebview = page.$getAppWebview();
				let titleObj = currentWebview.getStyle().titleNView;
				if (!titleObj.buttons) {
					return;
				}
				titleObj.buttons[0].text = titleObj.buttons[0].text = text;
				//titleObj.buttons[0].text = titleObj.buttons[0].text === "\ue604" ? "\ue605" : "\ue604";
				currentWebview.setStyle({
					titleNView: titleObj
				});
				// #endif
			},
			onTabbarClickEvent (index) {
				this.index = index;
				if(index == 0) {
					changeNavigationBarText('商 家');
					if(this.current == 2 || this.current == 3) {
						changeNavigationBarButton('添 加')
					}else {
						changeNavigationBarButton('')
					}
				}
				if(index == 1) {
					changeNavigationBarText('我 的');
					changeNavigationBarButton('')
				}
			}
 		},
		components: {
			tabBar,
			homePicture,
			merchantName,
			goodsManager,
			sortManager,
			activityManager,
			mine
		}
	}
</script>

<style lang="scss" scoped>
@import '~@/common/css/avariables.scss';	
.wrap {
	height: 100%;
	height: 100%;
}

	.nav {
		display: flex;
		width: 100%;
	}

	.nav-left {
		width: 30%;
		border-right: 1px solid #e5e5e5;
	}

	.nav-left-item {
		height: 80upx;
		font-size: 26upx;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.nav-right {
		width: 70%;
	}

	.nav-right-item {
		width: 28%;
		height: 220upx;
		float: left;
		text-align: center;
		padding: 11upx;
		font-size: 28upx;
	}

	.nav-right-item image {
		width: 100upx;
		height: 100upx;
	}

	.active {
		color: #fff;
		background: $main-color;
	}
</style>
