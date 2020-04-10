<template>
	<view class="container">
		<view class="wrap shadow border-radius bg-white">
			<view class="label d-flex align-items-center">姓名：<input v-model="name" class="flex-1" type="text" placeholder="请输入姓名"></view>
			<view class="label d-flex align-items-center">电话：<input v-model="phone" class="flex-1" type="text" placeholder="请输入电话"></view>
			<view class="label d-flex align-items-center">地址：<input v-model="address" disabled class="flex-1" type="text" placeholder="请输入地址" @tap="choseLocation"></view>
			<view class="label d-flex align-items-center">分类：<input v-model="type" disabled class="flex-1" type="text" placeholder="请选择分类" @tap="showSinglePicker"></view>
			<view class="label d-flex align-items-center">商家名称：<input v-model="merchantName" class="flex-1" type="text" placeholder="请输入商家名称"></view>
			<view class="title">身份证照：</view>
			<view class="phone-wrap d-flex justify-content-between">
				<view class="photo-item d-flex flex-direction-column align-items-center"><image :src="img1" @tap="onUploadPhoto(1)"></image>正</view>
				<view class="photo-item d-flex flex-direction-column align-items-center"><image :src="img2" @tap="onUploadPhoto(2)"></image>反</view>
			</view>
			<view class="title">营业执照：</view>
			<view class="phone-wrap d-flex justify-content-between">
				<view class="photo-item d-flex flex-direction-column align-items-center"><image :src="img3" @tap="onUploadPhoto(3)"></image>正</view>
			</view>
			<mpvue-picker themeColor="#f3c700" ref="mpvuePicker" mode="selector" :deepLength="1" @onConfirm="onConfirm" :pickerValueArray="pickerValueArray"></mpvue-picker>
		</view>
	</view>
</template>

<script>
	import mpvuePicker from '@/components/mpvue-picker/mpvuePicker.vue'
	import { applyMerchant, BASE_URL } from '@/api'
	import { mapState, mapActions, mapMutations } from 'vuex'
	export default {
		name: '',
		data () {
			return {
				pickerValueArray: [],
				name: '',
				phone: '',
				address: '',
				type: '',
				typeId: '',
				merchantName: '',
				img1: '/static/images/xiangji@2x.png',
				img2: '/static/images/xiangji@2x.png',
				img3: '/static/images/xiangji@2x.png',
				longitude: '',
				latitude: '',
				applyInfo1: {}
			}
		},
		computed: {
			...mapState(['user_info', 'home_classify']),
		},
		onReady () {
			this._dealApplyStatus();
			this._dealMerchantType()
		},
		onNavigationBarButtonTap () {
			this._submitApply()
			// uni.reLaunch({
			// 	url: '/pages/service/home/index/index'
			// })
		},
		methods: {
			...mapActions(['reqGetUserInfo']),
			...mapMutations(['saveApplyInfo']),
			_dealMerchantType () {
				this.home_classify.forEach((val, index) => {
					let {content: label, id: value} = val;
					this.pickerValueArray.push({label, value})
				})
			},
			_dealApplyStatus () {
				if(this.user_info.shenhe == 1) {
					uni.showModal({
						title: '申请结果',
						content: '您已提交申请,请耐心等待审核',
						showCancel: false,
						success: function (res) {
							if(res.confirm) {
								uni.navigateBack()
							}
						}
					})
				}
				if(this.user_info.shenhe == 2) {
					uni.showModal({
						title: '申请结果',
						content: '申请审核失败,请重新提交并确保您的资料真实可靠',
						showCancel: false,
						success: function (res) {
							if(res.confirm) {
								
							}
						}
					})
				}
			},
			choseLocation () {
				let that = this;
				uni.chooseLocation({
					success: function (res) {
						console.log(res)
						that.address = res.address;
						that.longitude = res.longitude;
						that.latitude = res.latitude;
					}
				});
			},
			showSinglePicker () { // 选择分类
				this.$refs.mpvuePicker.show()
			},
			onConfirm (e) {  // 确定分类
				this.type = e.label;
				this.typeId = e.value
			},
			onUploadPhoto (type) {  // 上传照片
				let that = this;
				uni.chooseImage({
					success: (chooseImageRes) => {
						const tempFilePaths = chooseImageRes.tempFilePaths;
						// that['img' + type] = tempFilePaths[0]
						uni.uploadFile({
								url: BASE_URL + '/api/upload/adimage', //仅为示例，非真实的接口地址
								filePath: tempFilePaths[0],
								name: 'file',
								success: (uploadFileRes) => {
									console.log(uploadFileRes)
									that['img' + type] = BASE_URL + JSON.parse(uploadFileRes.data).data;
								}
						});
					}
				});
			},
			async _submitApply () {
				let that = this;
				if(this.name == '') {
					uni.showToast({
						title: '请输入姓名',
						icon: 'none'
					})
					return;
				}
				if(this.phone == '') {
					uni.showToast({
						title: '请输入电话',
						icon: 'none'
					})
					return;
				}
				if(this.address == '') {
					uni.showToast({
						title: '请选择地址',
						icon: 'none'
					})
					return;
				}
				if(this.type == '') {
					uni.showToast({
						title: '请选择分类',
						icon: 'none'
					})
					return;
				}
				if(this.merchantName == '') {
					uni.showToast({
						title: '请输入商家名称',
						icon: 'none'
					})
					return;
				}
				if(this.img1 == '/static/images/xiangji@2x.png') {
					uni.showToast({
						title: '请上传身份证照正面',
						icon: 'none'
					})
					return;
				}
				if(this.img2 == '/static/images/xiangji@2x.png') {
					uni.showToast({
						title: '请上传身份证照反面',
						icon: 'none'
					})
					return;
				}
				if(this.img3 == '/static/images/xiangji@2x.png') {
					uni.showToast({
						title: '请上传营业执照',
						icon: 'none'
					})
					return;
				}
				let result = await applyMerchant({
					id: uni.getStorageSync('user_id'),
					username: this.name,
					mobile: this.phone,
					jing: this.longitude,
					wei: this.latitude,
					content: this.address,
					cshangclass_id: this.typeId,
					cshangdetail_name: this.merchantName,
					shenz_image: this.img1.replace(BASE_URL, ''),
					shenf_image: this.img2.replace(BASE_URL, ''),
					ying_image: this.img3.replace(BASE_URL, '')
				})
				console.log(result)
				if(result.code == 200) {
					that.applyInfo1.name = that.name;
					that.applyInfo1.phone = that.phone;
					that.applyInfo1.address = that.address;
					that.applyInfo1.type = that.type;
					that.applyInfo1.merchantName = that.merchantName;
					that.applyInfo1.img1 = that.img1;
					that.applyInfo1.img2 = that.img2;
					that.applyInfo1.img3 = that.img3;
					that.saveApplyInfo(that.applyInfo1)
					that.reqGetUserInfo({
						id: that.user_info.id
					})
					uni.showModal({
						title: '申请结果',
						content: '申请提交成功,请耐心等待审核！',
						showCancel: false,
						success: function (res) {
							if(res.confirm) {
								uni.navigateBack()
							}
						}
					})
				}
			}
		},
		components: {
			mpvuePicker
		}
	}
</script>

<style lang="scss" scoped>
@import '~@/common/css/avariables.scss';
.wrap {
	padding: 50upx;
	.label {
		margin-bottom: 30upx;
		input {
			padding: 0 30upx;
			border-radius: 10upx;
			border: 1upx solid $main-color;
		}
	}
	.phone-wrap {
		image {
			width: 270upx;
			height: 200upx;
			margin: 30upx 0 20upx 0;
		}
	}
	.title {
		margin-top: 30upx;
	}
}
</style>
