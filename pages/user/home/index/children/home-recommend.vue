<template>
	<view class="content mg-top-40 shadow bg-white border-radius">
		<view class="title">
			<view :class="{active: current == 0}" @tap="onItemClick(0)">热门推荐</view> 
			<!-- <view class="divide">/</view> 
			<view :class="{active: current == 1}" @tap="onItemClick(1)">排名</view> -->
		</view>
		<!-- 推荐 -->
		<view class="recommend" v-show="current == 0">
			<nodata v-if="home_recommed.length <= 0"></nodata>
			<recommend-item v-for="(item, index) of home_recommed" :key="index" :item="item" :index="index" :home_recommed="home_recommed" :onToDetailEvent="onToDetailEvent"></recommend-item>
			<bottom v-if="showBottom && home_recommed.length > 0"></bottom>
		</view>
		<!-- 排名 -->
		<!-- <view class="ranking" v-show="current == 1">
			<recommend-item v-for="item of home_recommed" :key="item.id" :item="item" :onToDetailEvent="onToDetailEvent"></recommend-item>
		</view> -->
	</view>
</template>

<script>
	import recommendItem from './recommend-item'
	import nodata from '@/components/nodata'
	import bottom from '@/components/bottom'
	export default {
		props: {
			onToDetailEvent: Function,
			home_recommed: Array,
			showBottom: {type: Boolean, default: false}
		},
		name: '',
		data () {
			return {
				current: 0
			}
		},
		onLoad () {

		},
		methods: {
			onItemClick (index) {
				if(this.current != index) {
					this.current = index;
				}
				this.$emit('onShowAllRecommend')
			}
		},
		components: {
			recommendItem,
			nodata,
			bottom
		}
	}
</script>

<style lang="scss" scoped>
.content {
	padding: 50upx;
	.title {
		position: relative;
		display: flex;
		align-items: center;
		&:before {
			position: absolute;
			left: -20upx;
			top: 50%;
			margin-top: -17upx;
			content: '';
			width: 8upx;
			height: 34upx;
			background: #61d8e0;
		}
		.divide {
			padding: 0 6upx;
			font-size: 32upx;
			color: #fcd106;
		}
		> view.active {
			font-size: 32upx;
			color: #fcd106;
		}
	}
}
</style>
