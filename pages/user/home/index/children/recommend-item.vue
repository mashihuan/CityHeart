<template>
	<view @tap="onToDetailEvent(item)" class="item d-flex justify-content-between" :class="{'border-bottom': index != home_recommed.length-1}">
		<view class="left">
			<image class="logo" :lozy-load="true" :src="BASE_URL + (item.simage || item.image)"></image>
			<image class="icon" src="/static/images/remen@2x.png"></image>
		</view>
		<view class="right flex-1 d-flex flex-direction-column justify-content-between">
			<view class="name">{{item.sname || item.name}}</view>
			<view class="desc ellipsis-2" v-if="item.huodong">{{item.huodong}}</view>
			<view class="address d-flex align-items-center" v-if="item.content">
				<image src="/static/images/dingwei@2x.png"></image>
				<view class="ellipsis flex-1">{{item.content}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { BASE_URL } from '@/api'
	export default {
		props: {
			onToDetailEvent: Function,
			item: Object,
			index: Number,
			home_recommed: Array
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

		}
	}
</script>

<style lang="scss" scoped>
.item {
	padding: 50upx 0;
	.left {
		position: relative;
		margin-right: 30upx;
		.logo {
			display: block;
			width: 220upx;
			height: 150upx;
			border-radius: 15upx;
		}
		.icon {
			position: absolute;
			right: 0;
			top: 0;
			width: 60upx;
			height: 30upx;
		}
	}
	.right {
		.name {
			font-size: 30upx;
			font-weight: bold;
		}
		.desc {
			font-size: 18upx;
		}
		.address {
			font-size: 20upx;
			image {
				width: 20upx;
				height: 24upx;
				margin-right: 10upx;
			}
		}
	}
}
</style>
