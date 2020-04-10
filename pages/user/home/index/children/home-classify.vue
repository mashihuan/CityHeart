<template>
	<scroll-view class="scroll-view_H shadow mg-top-40" scroll-x="true">
		<view class="scroll-view-item_H uni-bg-red" v-for="item of home_classify" :key="item.id" @tap="onClassifyClick(item)">
			<image :lazy-load="true" class="shadow border-radius" :src="BASE_URL + item.image"></image>
			<view class="ellipsis" style="line-height: 1">{{item.name}}</view>
		</view>
	</scroll-view>
</template>

<script>
	import { BASE_URL } from '@/api'
	export default {
		props: {
			home_classify: Array
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
			onClassifyClick (id) {
				this.$emit('onClassifyClick', id)
			}
		}
	}
</script>

<style lang="scss" scoped>
.scroll-view_H {
	height: 216upx;
	white-space: nowrap;
	width: 100%;
	border-radius: 15upx;
	background: #fff;
}	
.scroll-view-item_H {
	display: inline-block;
	width: 25%;
	padding: 30upx 0;
	text-align: center;
	image {
		width: 100upx;
		height: 100upx;
		margin-bottom: 20upx;
		border-radius: 15upx;
	}
}
</style>
