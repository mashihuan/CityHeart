<template>
	<view class="d-flex flex-direction-column align-items-center">
		<image :src="img"></image>
		<view class="text">{{text}}</view>
	</view>
</template>

<script>
	export default {
		props: {
			img: {type: String, default: '/static/images/nodata1.png'},
			text: {type: String, default: '没有更多了...'}
		},
		name: '',
		data () {
			return {

			}
		},
		onLoad () {

		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
image {
	width: 350upx;
	height: 350upx;
}
.text {
	color: #999;
}
</style>
