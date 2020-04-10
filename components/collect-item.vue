<template>
	<view>
		<view class="item d-flex align-items-center border-bottom" v-for="(item, index) of list" :key="index">
			<image class="border-radius d-block shadow" lazy-load="true" 
				:src="BASE_URL + (item.cshangdetail.image || '')" 
				@tap="onGoToPage(item.cshangdetail_id)"
			></image>
			<text class="flex-1">{{item.cshangdetail.name}}</text>
			<view class="icon" v-if="showFavorite" @tap="delFavorite(item.id)"></view>
		</view>
	</view>
</template>

<script>
	import { BASE_URL } from '@/api'
	export default {
		props: {
			list: Array,
			showFavorite: {type: Boolean, default: false}
		},
		name: '',
		data () {
			return {

			}
		},
		computed: {
			BASE_URL () {
				return BASE_URL
			}
		},
		onLoad () {

		},
		methods: {
			onGoToPage (id) {
				uni.navigateTo({
					url: '/pages/user/home/subPages/merchant-detail/merchant-detail?id=' + id
				})
				uni.setStorage({
					key: 'mer_id',
					data: id
				})
			},
			delFavorite (id) {
				this.$emit('delFavorite', id)
			}
		}, 
		components: {
			
		}
	}
</script>

<style lang="scss" scoped>
@import '~@/common/css/mixin.scss';	
.icon {
	width: 35upx;
	height: 35upx;
	@include background-img('~@/static/images/favorite.png');
	&.checked {
		@include background-img('~@/static/images/favorite-normal.png');
	}
}	
.item {
	padding: 50upx;
	image {
		width: 220upx;
		height: 130upx;
		margin-right: 40upx;
	}
}
</style>
