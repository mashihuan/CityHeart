<template>
	<mine-temp :list="list" :personal_info="user_info"></mine-temp>
</template>

<script>
	import mineTemp from '@/components/mine-temp'
	import { mapState, mapActions } from 'vuex'
	import { BASE_URL } from '@/api'
	import { dealLogin } from '@/common/js/common'
	export default {
		name: '',
		data () {
			return {
				list: [
					{text: '我的收藏'},{text: '成为商家'},{text: '我的评价'},{text: '浏览历史'},{text: '清空缓存'},{text: '退出登录'},
				],
				id: ''
			}
		},
		onPullDownRefresh () {  // 下拉刷新
			let user_id = uni.getStorageSync('user_id');
			this.reqGetUserInfo({id: user_id, callback: this._dealApplyStatus});
		},
		onReady () {
			let user_id = uni.getStorageSync('user_id');
			this.reqGetUserInfo({id: user_id, callback: this._dealApplyStatus});
		},
		computed: {
			...mapState(['user_info'])
		},
		methods: {
			...mapActions(['reqGetUserInfo']),
			_dealApplyStatus (status) {
				if(status == 0 || status == 1 || status == 2) {
					this.$set(this.list, 1, {text: '成为商家'} )
				}
				if(status == 3) {
					this.$set(this.list, 1, {text: '切换为商家'} )
				}
			},
			onSwitchToEvent ({text, index}) {
				console.log(text)
				if(index == -1) {
					uni.navigateTo({
						url: '/pages/user/mine/subPages/personal-info/personal-info'
					})
					return;
				}
				if(text == "我的收藏") {
					uni.navigateTo({
						url: '/pages/user/mine/subPages/my-collect/my-collect'
					})
				}
				if(text == "我的评价") {
					uni.navigateTo({
						url: '/pages/user/mine/subPages/my-comment/my-comment'
					})
				}
				if(text == "浏览历史") {
					uni.navigateTo({
						url: '/pages/user/mine/subPages/history/history'
					})
				}
				if(text == "成为商家") {
					uni.navigateTo({
						url: '/pages/user/mine/subPages/apply/apply'
					})
				}
				if(text == "切换为商家") {
					uni.navigateTo({
						url: '/pages/service/home/index/index'
					})
				}
				if(text == "清空缓存") {
					// todo
					uni.showToast({
						title: '清空成功'
					})
				}
				if(text == "退出登录") {
					uni.showModal({
						content: '确定要退出登录吗？',
						success: function (res) {
							if(res.confirm) {
								uni.clearStorage();
								uni.reLaunch({
									url: '/pages/login/login'
								})
							}
						}
					})	
				}
			}
		},
		components: {
			mineTemp
		}
	}
</script>

<style lang="scss" scoped>

</style>
