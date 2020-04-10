<template>
	<view class="container">
		<view class="wrap shadow bg-white border-radius">
			<list-cell :avatar=" personal_info.avatar ? (BASE_URL + personal_info.avatar) : '/static/images/a8@2x.png'" 
					:isShowArrow="true" 
					:text="personal_info.id ? (personal_info.nickname || '请完善资料') : '登录/注册'" 
					:index="-1" 
					@onSwitchToEvent="onSwitchToEvent" 
			></list-cell>
			<list-cell v-for="(item, index) of list" :key="index" :index="index" :text="item.text" 
					@onSwitchToEvent="onSwitchToEvent" 
					:isShowArrow="index == 5 ? false : true"
			></list-cell>
		</view>
	</view>
</template>

<script>
	import listCell from '@/components/list-cell'
	import { BASE_URL } from '@/api'
	import { mapState, mapActions } from 'vuex'
	export default {
		props: {
			list: Array,
			service: Boolean,
			personal_info: Object
		},
		name: '',
		data () {
			return {
				
			}
		},
		computed: {
			...mapState(['user_info']),
			BASE_URL () {
				return BASE_URL
			}
		},
		onLoad () {

		},
		methods: {
			...mapActions(['clearInfo']),
			onSwitchToEvent ({text, index}) {
				let that = this;
				console.log(text)
				if(!this.personal_info.id && index != -1 && text != '退出登录') {
					return;
				}
				if(index == -1) {
					if(this.service) {
						return;
					}
					if(!this.personal_info.id) {
						uni.navigateTo({
							url: '/pages/login/login'
						})
						return;
					}
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
				if(text == "评价管理") {
					uni.navigateTo({
						url: '/pages/user/home/subPages/merchant-comment/merchant-comment?type=service'
					})
					uni.setStorage({
						key: 'mer_id',
						data: this.user_info.cshangdetail.id
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
					uni.reLaunch({
						url: '/pages/service/home/index/index'
					})
				}
				if(text == "切换为用户") {
					uni.reLaunch({
						url: '/pages/user/home/index/index'
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
								that.clearInfo()
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
			listCell
		}
	}
</script>

<style lang="scss" scoped>

</style>
