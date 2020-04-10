<template>
	<login-temp>
		<input-cell class="w-100" v-model="phone" icon="/static/images/zhanghu@2x.png" placeholder="请输入手机号码"></input-cell>
		<input-cell class="w-100" v-model="sms" :sms="true" :count="count" @onGetSmsEvent="onGetSmsEvent" icon="/static/images/yanzhengma@2x.png" placeholder="请输入验证码"></input-cell>
		<input-cell class="w-100" v-model="pwd" type="password" icon="/static/images/mima@2x.png" placeholder="请输入密码"></input-cell>
		<button class="w-100 btn shadow" @tap="onRegisterEvent">立 即 注 册</button>
		<navigator class="register" url="/pages/login/login">已有账号？立即登录</navigator>
	</login-temp>
</template>

<script>
	import loginTemp from '@/components/login'
	import inputCell from '@/components/input-cell'
	import { dealCountDown, verifyPhoneNumber } from '@/common/js/common.js'
	import { register } from '@/api'
	import { mapActions } from 'vuex'
	export default {
		name: '',
		data() {
			return {
				phone: '',
				pwd: '',
				sms: '',
				count: 0
			}
		},
		onLoad() {

		},
		methods: {
			...mapActions(['reqGetSms']),
			onGetSmsEvent () {
				var that = this;
				if(!verifyPhoneNumber(that.phone)) {
					return;
				}
				this.reqGetSms({phone: this.phone, callback: dealCountDown, that: that})
			},
			async onRegisterEvent () {
				var that = this;
				if(!verifyPhoneNumber(that.phone)) {
					return;
				}
				if(this.sms == "") {
					uni.showToast({
						title: '请输入验证码',
						icon: 'none'
					})
					return;
				}
				if(this.pwd == "") {
					uni.showToast({
						title: '请输入密码',
						icon: 'none'
					})
					return;
				}
				let result = await register ({
					mobile: this.phone,
					password: this.pwd,
					code: this.sms
				})
				if(result.code == 200) {
					uni.showToast({
						title: '注册成功',
					})
					setTimeout( () => {
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
.btn {
	margin-top: 40upx;
	border-radius: 50upx;
}
.register {
	margin-top: 50upx;
	color: $main-color;
}
</style>
