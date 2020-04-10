<template>
	<login-temp background="url(/static/images/forget_bg.png)" class="forget">
		<input-cell class="w-100" v-model="phone" icon="/static/images/zhanghu@2x.png" placeholder="请输入手机号码"></input-cell>
		<input-cell class="w-100" v-model="sms" :sms="true" :count="count" @onGetSmsEvent="onGetSmsEvent" icon="/static/images/yanzhengma@2x.png" placeholder="请输入验证码"></input-cell>
		<input-cell class="w-100" v-model="pwd" type="password" icon="/static/images/mima@2x.png" placeholder="请输入新密码"></input-cell>
		<button class="w-100 btn shadow" @tap="onChangeEvent">立 即 修 改</button>
	</login-temp>
</template>

<script>
	import loginTemp from '@/components/login'
	import inputCell from '@/components/input-cell'
	import { forgetPwd } from '@/api'
	import { mapActions } from 'vuex'
	import { verifyPhoneNumber, dealCountDown } from '@/common/js/common.js'
	export default {
		name: '',
		data () {
			return {
				phone: '',
				sms: '',
				pwd: '',
				count: 0
			}
		},
		onLoad () {

		},
		methods: {
			...mapActions(['reqGetSms']),
			async onGetSmsEvent () {
				let that = this;
				if(!verifyPhoneNumber(that.phone)) {
					return;
				}
				that.reqGetSms({phone: that.phone, callback: dealCountDown, that: that})
			},
			async onChangeEvent () {
				let that = this;
				if(!verifyPhoneNumber(that.phone)) {
					return;
				}
				if(this.sms == '') {
					uni.showToast({
						title: '请输入验证码',
						icon: 'none'
					})
					return
				}
				if(this.pwd == '') {
					uni.showToast({
						title: '请输入密码',
						icon: 'none'
					})
					return
				}
				let result = await forgetPwd({
					mobile: this.phone,
					captcha: this.sms,
					newpassword: this.pwd
				})
				if(result.code == 200) {
					uni.showToast({
						title: '修改成功'
					})
					setTimeout(() => {
						uni.reLaunch({
							url: '/pages/login/login'
						})
					}, 2000)
				}
			}
		},
		components: {
			loginTemp,
			inputCell
		}
	}
</script>

<style lang="scss" scoped>
@import '~@/common/css/avariables.scss';	
.forget {
	padding-top: 140upx;
}
.btn {
	margin-top: 40upx;
	border-radius: 50upx;
}
.register {
	margin-top: 50upx;
	color: $main-color;
}
</style>
