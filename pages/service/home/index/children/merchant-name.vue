<template>
	<view class="wrap">
		<view class="title">店铺名称：</view>
		<input class="border-radius input" type="text" v-model="name" placeholder="请输入店铺名称">
		<view class="title">店铺电话：</view>
		<input class="border-radius input" type="text" v-model="phone" placeholder="请输入店铺电话">
		<view class="title">店铺地址：</view>
		<textarea class="textarea" v-model="address" disabled cols="30" rows="10" placeholder="请输入店铺地址"
					@tap="getLocation"
		></textarea>
		<button class="btn mini-btn" @tap="onConfirmClick">确定</button>
	</view>
</template>

<script>
	import { mapState, mapActions } from 'vuex'
	import { changeMerchantInfo } from '@/api'
	export default {
		props: {
			user_info: Object
		},
		data () {
			return {
				name: this.user_info.cshangdetail.name,
				phone: this.user_info.cshangdetail.iphone,
				address: this.user_info.cshangdetail.caddress.content,
				longitude: this.user_info.cshangdetail.caddress.jing,
				latitude: this.user_info.cshangdetail.caddress.wei,
			}
		},
		onReady () {
			
		},
		methods: {
			...mapActions(['reqGetUserInfo']),
			async onConfirmClick () {
				let that = this;
				let result = await changeMerchantInfo({
					id: this.user_info.cshangdetail.id,
					name: this.name,
					iphone: this.phone,
					jing: this.longitude,
					wei: this.latitude,
					content: this.address
				})
				if(result.code == 200) {
					uni.showToast({
						title: '修改成功'
					})
					// that.reqGetUserInfo({
					// 	id: uni.getStorageSync('user_id'),
					// })
				}
			},
			getLocation () {
				let that = this;
				uni.chooseLocation({
					success: function (res) {
						console.log(res)
						that.address = res.address;
						that.longitude = res.longitude;
						that.latitude = res.latitude;
					},
					fail: function (res) {
						console.log(res)
					}
				});
			},
			onInput (name, e) {
				this[name] = e.target.value
			}
		}
	}
</script>

<style lang="scss" scoped>
@import '~@/common/css/avariables.scss';	
.wrap {
	padding: 50upx 50upx 50upx 30upx;
	.title {
		margin-bottom: 30upx;
	}
}
</style>
