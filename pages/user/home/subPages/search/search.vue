<template>
	<view class="container">
		<view class="wrap border-radius shadow bg-white" v-if="search_result.length > 0">
			<recommend-item :onToDetailEvent="onToDetailEvent" v-for="(item, index) of search_result" :home_recommed="search_result" :index="index" :key="index" :item="item"></recommend-item>
		</view>
		<view class="result" v-if="showResult">没有匹配到内容...</view>
	</view>
</template>

<script>
	import recommendItem from '@/pages/user/home/index/children/recommend-item'
	import { mapState, mapActions } from 'vuex'
	export default {
		name: '',
		data () {
			return {
				showResult: false,
				search_result: []
			}
		},
		computed: {
			// ...mapState(['search_result']),
		},
		onLoad () {
			
		},
		onNavigationBarSearchInputChanged (e) {
			if(e.text == '') {
				this.search_result = []
				return;
			}
			this.reqGetHomeSearchResult({
				data: {
					name: e.text,
					page: 1,
					limit: 100
				},
				callback1: this.callback1,
				callback2: this.callback2,
				callback3: this.callback3
			})
		},
		methods: {
			...mapActions(['reqGetHomeSearchResult']),
			onToDetailEvent (item) {
				uni.navigateTo({
					url: '/pages/user/home/subPages/merchant-detail/merchant-detail?id=' + item.id
				})
			},
			callback1 () {
				this.showResult = true
			},
			callback2 () {
				this.showResult = false
			},
			callback3 (data) {
				this.search_result = data
			}
		},
		components: {
			recommendItem
		}
	}
</script>

<style lang="scss" scoped>
.wrap {
	padding: 50upx;
}
.result {
	text-align: center;
	color: #999;
}
</style>
