<template>
	<view class="container">
		<view class="border-radius shadow bg-white">
			<collect-item :list="user_history"></collect-item>
			<bottom v-if="!showBottam && user_history.length.length > 0"></bottom>
		</view>
		<view class="pd-top-100">
			<nodata v-if="user_history.length <= 0"></nodata>
		</view>
	</view>
</template>

<script>
	import collectItem from '@/components/collect-item'
	import bottom from '@/components/bottom'
	import nodata from '@/components/nodata'
	import { mapState, mapActions } from 'vuex'
	import { BASE_URL, clearUserHistory } from '@/api'
	export default {
		name: '',
		data () {
			return {
				showBottam: false,
				page: 1,
				limit: 10
			}
		},
		onLoad () {
			this._reqGetUserHistory()
		},
		onReachBottom () {
			if(!this.showBottom) {
				this._reqGetUserHistory()
			}
		},
		onNavigationBarButtonTap () {
			let that = this;
			if(this.user_history.length <= 0) {
				uni.showToast({
					title: '没有内容可清理',
					icon: 'none'
				})
				return;
			}
			uni.showModal({
				content: '确定要清空浏览历史吗？',
				success: async function (res) {
					if(res.confirm) {
						let result = await clearUserHistory({
							token: uni.getStorageSync('token')
						})
						if(result.code == 200) {
							that._reqGetUserHistory()
						}
					}
				}
			})
		},
		computed: {
			...mapState(['user_history']),
		},
		methods: {
			...mapActions(['reqGetUserHistory']),
			_reqGetUserHistory () {
				this.reqGetUserHistory({
					data: {
						token: uni.getStorageSync('token')
					},
					callback1: this._addPage,
					callback2: this._showBottom
				})
			},
			_addPage () {
				this.page ++;
			},
			_showBottom () {
				this.showBottom = true;
			}
		},
		components: {
			collectItem,
			bottom,
			nodata
		}
	}
</script>

<style lang="scss" scoped>
.container /deep/ .border-bottom:last-child {
	border-bottom: none;
}
</style>
