<template>
	<view class="menu half-divider">
		<view class="title d-flex border-bottom">
			<view class="active">菜单</view>
			<view @tap="onToCommentEvent">评价</view>
		</view>
		<view class="d-flex" :style="'height:'+height+'px'">
			<scroll-view class="nav-left" scroll-y :style="'height:'+height+'px'">
				<view class="nav-left-item" @click="categoryClickMain(item,index)" :key="index" :class="index==categoryActive?'active':''"
				 v-for="(item,index) in merchant_goods">
					{{item.name}}
				</view>
			</scroll-view>
			<scroll-view class="nav-right" scroll-y :style="'height:'+height+'px'" scroll-with-animation>
				<block>
					<view :id="index===0?'first':''" class="nav-right-item d-flex align-items-center" v-for="(item,index) of merchant_goods[categoryActive].cgoods" :key="index">
						<image lazy-load="true" :src="BASE_URL + item.images" @tap="onPreviewImageEvent(item.images)"></image>
						<view>
							<view class="name">{{item.name}}</view>
							<view class="price">￥{{item.jia}}</view>
						</view>
					</view>
					<nodata v-if="merchant_goods.length <= 0 || (merchant_goods.length > 0 && merchant_goods[categoryActive].cgoods.length <= 0)"></nodata>
				</block>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import nodata from '@/components/nodata'
	import { previewImage } from '@/common/js/common.js'
	import { BASE_URL } from '@/api'
	export default {
		props: {
			onToCommentEvent: Function,
			merchant_goods: Array
		},
		name: '',
		data() {
			return {
				subCategoryList: [],
				categoryActive: 0,
			}
		},
		computed: {
			BASE_URL () {
				return BASE_URL
			},
			height () {
				return uni.upx2px(460) 
			},
		},
		onLoad() {
			this.height = uni.getSystemInfoSync().windowHeight;
		},
		methods: {
			categoryClickMain(item, index) { // 左侧点击
				if(this.categoryActive != index) {
					this.categoryActive = index;
					// this.subCategoryList = this.merchant_goods[index].cgoods
				}
			},
			onPreviewImageEvent (img) {
				previewImage(img)
			}
		},
		components: {
			nodata
		}
	}
</script>

<style lang="scss" scoped>
@import '~@/common/css/avariables.scss';
.menu {
	position: relative;
	.title {
		padding: 50upx 30upx 30upx;
		view {
			padding-bottom: 10upx;
			font-size: 30upx;
		}
		>view.active {
			border-bottom: 5upx solid $main-color;
			margin-right: 100upx;
		}
	}
}
.nav {
	display: flex;
	width: 100%;
}
.nav-left {
	width: 25%;
	border-right: 1upx solid #f5f5f5;
	border-bottom: 1upx solid #f5f5f5;
	.active {
		color: #fff;
		background: $main-color;
	}
}
.nav-left-item {
	height: 80upx;
	font-size: 28upx;
	display: flex;
	align-items: center;
	justify-content: center;
}
.nav-right {
	width: 75%;
	padding: 30upx 20upx;
}
.nav-right-item {
	width: 100%;
	margin-bottom: 30upx;
	image {
		width: 170upx;
		height: 100upx;
		margin-right: 20upx;
		border-radius: 15upx;
	}
	.name {
		font-size: 26upx;
	}
	.price {
		margin-top: 15upx;
		font-size: 24upx;
		color: $money-color;
	}
}



</style>
