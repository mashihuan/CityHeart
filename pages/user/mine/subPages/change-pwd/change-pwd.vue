<template>
	<view class="container">
		<input-cell v-model="phone" placeholder="输入手机号码"></input-cell>
		<input-cell v-model="oldPwd" type="password" placeholder="输入旧密码"></input-cell>
		<input-cell v-model="newPwd" type="password" placeholder="输入新密码"></input-cell>
		<button class="btn middle-btn" @tap="onConfirmClick">确定</button>
	</view>
</template>

<script>
	import inputCell from '@/components/input-cell'
	import { mapState, mapActions } from 'vuex'
	import { changePwd } from '@/api'
	import { verifyPhoneNumber, dealCountDown } from '@/common/js/common'
	export default {
		name: '',
		data () {
			return {
				phone: '',
				oldPwd: '',
				newPwd: ''
			}
		},
		onLoad () {

		},
		computed: {
			...mapState(['user_info'])
		},
		methods: {
			...mapActions(['reqGetUserInfo']),
			onGetSmsEvent () {
				let that = this;
				if(!verifyPhoneNumber(this.phone)) {
					return;
				}
				dealCountDown(that);
			},
			async onConfirmClick () {
				let that = this;
				if(!verifyPhoneNumber(this.phone)) {
					return;
				}
				if(this.oldPwd == '') {
					uni.showToast({
						title: '请输入旧密码',
						icon: 'none'
					})
					return;
				}
				if(this.newPwd == '') {
					uni.showToast({
						title: '请输入新密码',
						icon: 'none'
					})
					return;
				}
				let result = await changePwd({
					mobile: this.phone,
					oldpassword: this.oldPwd,
					newpassword: this.newPwd
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
