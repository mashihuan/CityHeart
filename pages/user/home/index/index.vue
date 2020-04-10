<template>
	<view class="container">
		<view class="row">
			<home-banner :home_carousel="home_carousel"></home-banner>
		</view>
		<home-classify :home_classify="home_classify" @onClassifyClick="onClassifyClick"></home-classify>
		<home-recommend :showBottom="showBottom" :home_recommed="home_recommed" @onShowAllRecommend="onShowAllRecommend" :onToDetailEvent="onToDetailEvent"></home-recommend>
	</view>
</template>

<script>
	import homeBanner from '@/components/banner'
	import homeClassify from './children/home-classify'
	import homeRecommend from './children/home-recommend'
	import { mapState, mapActions, mapMutations } from 'vuex'
	import { BASE_URL, addUserHistory } from '@/api'
	export default {
		name: '',
		data () {
			return {
				classId: '',
				page: 1,
				limit: 10,
				title: '',   // 推荐所属分类
				showBottom: false
			}
		},
		onShow () {
			
		},
		computed: {
			...mapState(['home_carousel', 'home_classify', 'home_recommed']),
		},
		onLoad () {
			this.reqGetHomeCarousel();
			this.reqGetHomeClassify();
			this.clearInfo()
			this.reqGetHomeRecommend({
				data: {
					page: this.page,
					limit: this.limit
				},
				callback1: this._AddPage,
				callback2: this._showBottom
			})
		},
		onReady () {
			
		},
		onNavigationBarSearchInputClicked () {  // 搜索框点击
			uni.navigateTo({
				url: '/pages/user/home/subPages/search/search'
			})
		},
		onReachBottom () {   // 页面下拉触底事件
			if(this.showBottom) {
				return;
			}
			if(this.classId) {
				this.reqGetHomeRecommendById({
					data: {
						page: this.page,
						limit: this.limit,
						id: this.classId
					},
					callback1: this._AddPage,
					callback2: this._showBottom
				})
			}else {
				this.reqGetHomeRecommend({data: {
						page: this.page,
						limit: this.limit
					},
					callback1: this._AddPage,
					callback2: this._showBottom
				})
			}
			
		},
		methods: {
			...mapActions(['reqGetHomeCarousel', 'reqGetHomeClassify', 'reqGetHomeRecommend', 'reqGetHomeRecommendById']),
			...mapMutations(['clearInfo']),
			async onToDetailEvent (item) {    // 点击店铺进入详情页
				uni.navigateTo({
					url: '/pages/user/home/subPages/merchant-detail/merchant-detail?id=' + item.sid
				})
				uni.setStorage({
					key: 'mer_id',
					data: item.sid
				})
				// let result =await addUserHistory({
				// 	token: uni.getStorageSync('token'),
				// 	user_id: uni.getStorageSync('user_id'),
				// 	cshangdetail_id: item.sid
				// })
			},
			onClassifyClick (item) {   // 点击分类获取分类对应下的推荐
				this.showBottom = false;
				this.classId = item.id;
				this.title = item.name;
				this.page = 1;
				this.reqGetHomeRecommendById({
					data: {
						page: this.page,
						limit: this.limit,
						id: this.classId
					},
					callback1: this._AddPage,
					callback2: this._showBottom,
					first: true
				})
			},
			onShowAllRecommend() {
				this.reqGetHomeRecommend({
					data: {
						page: 1,
						limit: this.limit
					},
					callback1: this._AddPage,
					callback2: this._showBottom
				})
			},
			_AddPage () {
				this.page ++;
			},
			_showBottom () {
				this.showBottom = true
			}
		},
		components: {
			homeBanner,
			homeClassify,
			homeRecommend
		}
	}
</script>

<style lang="scss" scoped>

</style>
