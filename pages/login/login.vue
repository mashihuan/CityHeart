<template>
	<login-temp>
		<input-cell class="w-100" v-model="phone" icon="/static/images/zhanghu@2x.png" placeholder="请输入手机号码"></input-cell>
		<input-cell class="w-100" v-model="pwd" type="password" icon="/static/images/mima@2x.png" placeholder="请输入密码"></input-cell>
		<navigator class="forget align-self-end" url="/pages/login/forget-pwd">忘记密码？</navigator>
		<button class="w-100 btn shadow" @tap="onLoginEvent">登 录</button>
		<navigator class="register" url="/pages/login/register">没有账号？立即注册</navigator>
	</login-temp>
</template>

<script>
	import loginTemp from '@/components/login'
	import inputCell from '@/components/input-cell'
	import { login } from '@/api'
	import { verifyPhoneNumber } from '@/common/js/common.js'
	export default {
		data() {
			return {
				phone: '',
				pwd: ''
			}
		},
		onLoad() {
			
		},
		methods: {
			async onLoginEvent () {
				if(!verifyPhoneNumber(this.phone)) {
					return;
				}
				if(this.pwd == "") {
					uni.showToast({
						title: '请输入密码',
						icon: 'none'
					})
					return;
				}
				let result = await login ({
					account: this.phone,
					password: this.pwd
				})
				if(result.code == 200) {
					console.log(result)
					uni.setStorage({
						key: 'id',
						data: result.data.userinfo.id,
					})
					uni.setStorage({
						key: 'user_id',
						data: result.data.userinfo.user_id,
					})
					uni.setStorage({
						key: 'token',
						data: result.data.userinfo.token,
					})
					uni.reLaunch({
						url: '/pages/user/home/index/index'
					})
				}	
			}
		},
		components: {
			inputCell,
			loginTemp
		}
	}
</script>

<style scoped lang="scss">
@import '~@/common/css/mixin.scss';	
@import '~@/common/css/avariables.scss';
.content {
	width: 100%;
	height: 100%;
	@include background-img('~@/static/images/login_bg.png');
	.wrap {
		padding: 60upx 80upx;
		.logo {
			width: 160upx;
			height: 160upx;
			margin-bottom: 70upx;
			border-radius: 15upx;
		}
		.forget {
			font-size: 24upx;
		}
		.btn {
			margin-top: 40upx;
			border-radius: 50upx;
		}
		.register {
			margin-top: 50upx;
			color: $main-color;
		}
	}
}
</style>
