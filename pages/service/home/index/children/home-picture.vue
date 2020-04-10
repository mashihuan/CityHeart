<template>
	<!-- <view class="d-flex flex-direction-column align-items-center">
		<image src="/static/images/xiangji@2x.png" @tap="onUpLoadPictureEvent"></image>
		<button class="btn mini-btn" @tap="onConfirmEvent">确定</button>
	</view> -->
	<view class="wrap">
		<view class="title mg-bottom-30 left-flag">首页图片：</view>
		<!-- <textarea class="textarea" name="" id="" cols="30" rows="10" placeholder="请输入活动详情"></textarea> -->
		<image class="home-img" :src="user_info.cshangdetail.image ? (BASE_URL + user_info.cshangdetail.image) : img1" @tap="onUpLoadPictureEvent(1)"></image>
		<view class="title mg-bottom-30 left-flag">展示图片：</view>
		<view class="photo-wrap d-flex flex-wrap justify-content-between">
			<view class="img-wrap d-flex flex-wrap" v-for="(item, index1) of imgs" :key="item">
				<image :src=" (BASE_URL + item) || '/static/images/xiangji@2x.png'"></image>
				<view class="iconfont" @tap="onDelImg(1, index1)">&#xe60c;</view>
			</view>
			<view class="img-wrap d-flex flex-wrap" v-for="(item, index2) of arr" :key="item">
				<image :src="BASE_URL + item"></image>
				<view class="iconfont" @tap="onDelImg(2, index2)">&#xe60c;</view>
			</view>
			<image v-if="(imgs.length) + (arr.length) < 4" src="/static/images/xiangji@2x.png" @tap="onUpLoadPictureEvent(2)"></image>
		</view>
		<button class="btn mini-btn" @tap="onConfirmEvent">保存</button>
	</view>
</template>

<script>
	import { BASE_URL, changeMerchanPhoto, changeMerchanCarousel } from '@/api'
	import { mapActions } from 'vuex'
	export default {
		props: {
			user_info: Object
		},
		name: '',
		data () {
			return {
				img1: '/static/images/xiangji@2x.png',
				imgs: this.user_info.cshangdetail.images ? (this.user_info.cshangdetail.images.split(',')) : [],
				arr: []
			}
		},
		computed: {
			BASE_URL () {
				return BASE_URL
			},
			imgSingle () {
				let img = '';
				if(this.user_info.cshangdetail.image) {
					img = this.user_info.cshangdetail.image
				}
				return img
			},
			imgList: {
				get () {
					let that = this;
					let arr = [];
					if(this.user_info.cshangdetail.images) {
						arr =  this.user_info.cshangdetail.images.split(',');
					}
					return arr;
				},
				set (val) {
					
				}
			},
		},
		methods: {
			...mapActions(['reqGetUserInfo']),
			onDelImg (type, index) {   // 删除图片
				console.log(type, index)
				if(type === 1) {
					this.imgs.splice(index, 1)
				}
				if(type === 2) {
					this.arr.splice(index, 1)
				}
			},
			onUpLoadPictureEvent (type) {
				let that = this;
				uni.chooseImage({
					success: (chooseImageRes) => {
						const tempFilePaths = chooseImageRes.tempFilePaths;
						that['img' + type] = tempFilePaths[0];
						uni.uploadFile({
								url: BASE_URL + '/api/upload/adimage', //仅为示例，非真实的接口地址
								filePath: tempFilePaths[0],
								name: 'file',
								success: async (uploadFileRes) => {
									console.log(uploadFileRes, type)
									if(type == 1) {   // 首页图片
										that.img1 = BASE_URL + JSON.parse(uploadFileRes.data).data;
										let result = await changeMerchanPhoto({
											id: that.user_info.cshangdetail.id,
											image: JSON.parse(uploadFileRes.data).data
										})
										if(result.code == 200) {
											that.reqGetUserInfo({
												id: uni.getStorageSync('user_id')
											})
										}
									}
									if(type == 2) {   // 轮播图
										that.arr.push(JSON.parse(uploadFileRes.data).data)
										//that.imgList.push(JSON.parse(uploadFileRes.data).data);
									}
								}
						});
					}
				});
			},
			async onConfirmEvent () {
				if(this.imgs.length <= 0 && this.arr.length <= 0) {
					uni.showToast({
						title: '请至少上传一张展示图片',
						icon: 'none'
					})
					return;
				}
				console.log(JSON.stringify(this.imgs.concat(this.arr).join(',')))
				let result = await changeMerchanCarousel ({
					id: this.user_info.cshangdetail.id,
					files: (this.imgs.concat(this.arr)).join(',')
				})
				if(result.code == 200) {
					uni.showToast({
						title: '上传成功'
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
@import '~@/common/css/avariables.scss';
.home-img {
		width: 100%;
		height: 190upx;
		margin: 20upx 0 50upx 0;
}
.wrap {
	padding: 50upx 50upx 50upx 30upx;
	.title {
		position: relative;
	}
	.textarea {
		height: 230upx;
		margin-bottom: 50upx;
	}
	.photo-wrap {
		.img-wrap {
			position: relative;
			margin-bottom: 30upx;
		}
		.iconfont {
			position: absolute;
			right: 0;
			top: 0;
			margin-top: -18upx;
			margin-right: -18upx;
			font-size: 36upx;
		}
		image {
			width: 190upx;
			height: 150upx;
		}
	}
	.btn {
		margin-top: 100upx;
	}
}
</style>
