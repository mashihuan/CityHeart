<template>
	<view class="container">
		<input-cell class="mg-top-40" v-model="nickname" :placeholder="placeholder"></input-cell>
		<button class="btn middle-btn" @tap="onConfirmClick">确定</button>
	</view>
</template>

<script>
	import { mapState, mapActions } from 'vuex'
	import { changeUserNickname } from '@/api'
	import inputCell from '@/components/input-cell'
	export default {
		name: '',
		data () {
			return {
				nickname: '',
				placeholder: '请输入昵称'
			}
		},
		onReady () {
			console.log(this.user_info.nickname)
			this.placeholder = this.user_info.nickname || '请输入昵称'
		},
		computed: {
			...mapState(['user_info'])
		},
		methods: {
			...mapActions(['reqGetUserInfo']),
			async onConfirmClick () {
				let that = this;
				if(this.nickname == '') {
					uni.showToast({
						title: '昵称不能为空',
						icon: 'none'
					})
					return;
				}
				let result = await changeUserNickname({
					id: this.user_info.id,
					nickname: this.nickname
				})
				if(result.code == 200) {
					uni.showToast({
						title: '修改成功'
					})
					setTimeout(() => {
						that.reqGetUserInfo({
							id: this.user_info.id,
						})
						uni.navigateBack()
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
