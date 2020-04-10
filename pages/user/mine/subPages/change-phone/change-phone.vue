<template>
	<view class="container">
		<input-cell v-model="phone" placeholder="输入手机号码"></input-cell>
		<input-cell v-model="sms" placeholder="输入验证码" :sms="true" :count="count" @onGetSmsEvent="onGetSmsEvent"></input-cell>
		<button class="btn middle-btn" @tap="onConfirmClick">确定</button>
	</view>
</template>

<script>
	import inputCell from '@/components/input-cell'
	import { mapState, mapActions } from 'vuex'
	import { changeUserPhone, getSms } from '@/api'
	import { verifyPhoneNumber, dealCountDown } from '@/common/js/common'
	export default {
		name: '',
		data () {
			return {
				count: 0,
				phone: '',
				sms: ''
			}
		},
		onLoad () {

		},
		computed: {
			...mapState(['user_info'])
		},
		methods: {
			...mapActions(['reqGetUserInfo']),
			async onGetSmsEvent () {
				let that = this;
				if(!verifyPhoneNumber(this.phone)) {
					return;
				}
				let result = await getSms ({
					phone: this.phone
				})
				if(result.code == 200) {
					dealCountDown(that);
				}
				
			},
			async onConfirmClick () {
				let that = this;
				if(!verifyPhoneNumber(this.phone)) {
					return;
				}
				if(this.sms == '') {
					uni.showToast({
						title: '请输入验证码',
						icon: 'none'
					})
					return;
				}
				let result = await changeUserPhone({
					id: this.user_info.id,
					mobile: this.phone,
					captcha: this.sms
				})
				if(result.code == 200) {
					uni.showToast({
						title: '修改成功'
					});
					setTimeout(() => {
						that.reqGetUserInfo({
							id: that.user_info.id,
						})
						uni.navigateBack();
					}, 2000)
				}	
			}
		},
		components: {
			inputCell
		}
	}
</script>

<style lang="scss" scoped>
.btn {
	margin-top: 80upx;
}
</style>
