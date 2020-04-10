<template>
	<view class="container my-favorite">
		<view class="border-radius shadow bg-white">
			<collect-item :list="user_favorite" :showFavorite="true" @delFavorite="delFavorite"></collect-item>
			<bottom v-if="showBottom && user_favorite.length.length > 10" />
		</view>
		<view class="pd-top-40">
			<nodata v-if="user_favorite.length <= 0" />
		</view>
	</view>
</template>

<script>
	import collectItem from '@/components/collect-item'
	import bottom from '@/components/bottom'
	import nodata from '@/components/nodata'
	import { mapState, mapActions } from 'vuex'
	import { BASE_URL, delFavoriteStore } from '@/api'
	export default {
		name: '',
		data () {
			return {
				page: 1,
				limit: 1000,
				showBottom: false
			}
		},
		computed: {
			...mapState(['user_favorite'])
		},
		onReady () {
			this._reqGetUserFavorite()
		},
		onReachBottom () {
			// if(this.showBottom == false) {
			// 	this._reqGetUserFavorite()
			// }
		},
		methods: {
			...mapActions(['reqGetUserFavorite']),
			_reqGetUserFavorite () {
				this.reqGetUserFavorite({
					data: {
						token: uni.getStorageSync('token'),
						id: uni.getStorageSync('user_id'),
						page: this.page,
						limit: this.limit
					},
				  callback1: this._addPage,
					callback2: this._showBottom,
				})
			},
			async delFavorite (id) {   // 取消收藏
				let result = await delFavoriteStore({
					id: id
				})
				if(result.code == 200) {
					this._reqGetUserFavorite()
				}
			},
			_addPage() {
				// console.log('add')
				// this.page ++ ;
			},
			_showBottom () {
				// console.log('true')
				// this.showBottom = true;
			}
		},
		components: {
			collectItem,
			nodata,
			bottom
		}
	}
</script>

<style lang="scss" scoped>
.my-favorite /deep/ .bottom-bottom {
	border-bottom: none;
}
</style>
