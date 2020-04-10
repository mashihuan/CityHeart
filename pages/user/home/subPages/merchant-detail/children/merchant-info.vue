<template>
	<view class="detail half-circle">
		<view class="name">{{merchant_detail.sname}}</view>
		<image class="photo border-radius" :lazy-load="true" 
			:src="BASE_URL + merchantCarousel[0]" 
			@tap="onPreviewImageEvent(merchant_detail.images)"
		 ></image>
		<view class="info d-flex justify-content-between border-bottom">
			<view class="address d-flex align-items-center flex-1" @tap="onOpenLocationEvent">
				<image src="/static/images/icon-address.png"></image>
				<view class="flex-1 ellipsis">{{merchant_detail.content}}</view>
			</view>
			<view class="phone d-flex align-items-center flex-1 justify-content-end" @tap="onMakePhoneCallEvent"><image src="/static/images/icon-phone.png"></image>{{merchant_detail.iphone}}</view>
		</view>
		<block>
			<view class="name activity">店家活动</view>
			<view class="desc">{{merchant_detail.huodong || ''}}</view>
			<image 
				class="photo border-radius" lazy-load="true" 
				:src="BASE_URL + activeCarousel[0]" 
				@tap="onPreviewImageEvent(merchant_detail.huo_image)"
			 ></image>
		</block>
		
	</view>
</template>

<script>
	import { BASE_URL } from '@/api'
	import { mapState, mapActions } from 'vuex'
	import { previewImage } from '@/common/js/common.js'
	export default {
		props: {
			merchant_detail: Object,
			activeCarousel: Array,
			merchantCarousel: Array
		},
		name: '',
		data() {
			return {

			}
		},
		computed: {
	
			BASE_URL () {
				return BASE_URL
			},
			// merchantImg () {
			// 	let img = '';
			// 	if(this.merchant_detail.images.indexOf(',') > -1) {
			// 		img = this.merchant_detail.images.split(',')[0]
			// 	}else {
			// 		img = this.merchant_detail.images
			// 	}
			// 	return img
			// },
			// activeImg () {
			// 	let img = '';
			// 	if(this.merchant_detail.huo_image.indexOf(',') > -1) {
			// 		img = this.merchant_detail.huo_image.split(',')[0]
			// 	}else {
			// 		img = this.merchant_detail.huo_image
			// 	}
			// 	return img
			// }
		},
		onLoad() {

		},
		methods: {
			onMakePhoneCallEvent () {
				uni.makePhoneCall({
						phoneNumber: this.merchant_detail.iphone
				});
			},
			onOpenLocationEvent () {
				this.$emit("onOpenLocationEvent")
			},
			onPreviewImageEvent (img) {
				previewImage(img)
			}
		}
	}
</script>

<style lang="scss" scoped>
.detail {
	position: relative;
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
