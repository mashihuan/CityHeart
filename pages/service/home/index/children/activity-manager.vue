<template>
	<view class="wrap">
		<view class="title mg-bottom-30 left-flag">活动介绍：</view>
		<textarea class="textarea" name="" id="" cols="30" rows="10" v-model="desc" placeholder="请输入活动详情"></textarea>
		<view class="title mg-bottom-30 left-flag">图片管理：</view>
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
	import { BASE_URL, editActivity } from '@/api'
	import { mapActions, mapState } from 'vuex'
	export default {
		name: '',
		props: {
			user_info: Object
		},
		data () {
			return {
				img1: '/static/images/xiangji@2x.png',
				imgs: this.user_info.cshangdetail.huo_image ? (this.user_info.cshangdetail.huo_image.split(',')) : [],
				arr: [],
				desc: this.user_info.cshangdetail.huodong ? this.user_info.cshangdetail.huodong : ''
			}
		},
		computed: {
			BASE_URL () {
				return BASE_URL
			},
		},
		onLoad () {

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
				if(this.desc == '') {
					uni.showToast({
						title: '给活动来点介绍吧！',
						icon: 'none'
					})
					return
				}
				if(this.imgs.length <= 0 && this.arr.length <= 0) {
					uni.showToast({
						title: '请至少上传一张展示图片',
						icon: 'none'
					})
					return;
				}
				console.log(JSON.stringify(this.imgs.concat(this.arr).join(',')))
				let result = await editActivity ({
					id: this.user_info.cshangdetail.id,
					huodong: this.desc,
					huo_image: (this.imgs.concat(this.arr)).join(',')
				})
				if(result.code == 200) {
					uni.showToast({
						title: '保存成功'
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
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
