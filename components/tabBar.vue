<template>
	<view class="list d-flex bg-white" :style="{top: fixedTop}">
		<view class="item w-50 d-flex flex-direction-column align-items-center justify-content-center" 
			:class="{active: current == index}" v-for="(item, index) of tabBar" :key="index"
			@tap="onTabbarClickEvent(index)"
		>
			<image :src="current == index ? item.selectedIconPath : item.iconPath"></image>
			<view class="text">{{item.text}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: '',
		data () {
			return {
				tabBar: [
					{
						"pagePath": "pages/user/home/index/index",
						"text": "首 页",
						"iconPath": "/static/images/shouye2@2x.png",
						"selectedIconPath": "/static/images/shouye1@2x.png"
					},
					{
						"pagePath": "pages/user/mine/index/index",
						"text": "我 的",
						"iconPath": "/static/images/wode1@2x.png",
						"selectedIconPath": "/static/images/wode2@2x.png"
					}
				],
				current: 0
			}
		},
		onLoad () {

		},
		computed: {
			fixedTop () {
				let windowHeight;
				let tabbarHeight;
				// #ifdef APP-PLUS
					windowHeight = uni.getSystemInfoSync().windowHeight;
					tabbarHeight = 56;
				// #endif	
				// #ifdef H5
					windowHeight = window.innerHeight;
					tabbarHeight = 50;
				// #endif	
				return (windowHeight - tabbarHeight) + 'px'
			}
		},
		methods: {
			onTabbarClickEvent (index) {
				this.current = index;
				// if(text == "首 页") {
				// 	uni.reLaunch({
				// 		url: '/pages/service/home/index/index'
				// 	})
				// }
				// if(text == "我 的") {
				// 	uni.reLaunch({
				// 		url: '/pages/service/mine/index/index'
				// 	})
				// }
				this.$emit('onTabbarClickEvent', index)
			}
		}
	}
</script>

<style lang="scss" scoped>
.list {
	position: fixed;
	left: 0;
	width: 100%;
	border-top: .5px solid rgba(0, 0, 0, 0.33);
	z-index: 999;
	.item {
		image {
			width: 27px;
			height: 27px;
		}	
		.text {
			
		}
		&.active {
			.text {
				color: #f3c700;
			}
		}
	}
}
/* #ifdef H5*/
.list {
	height: 50px;
}
/* #endif  */
/* #ifdef APP-PLUS */
.list {
	height: 56px;
}
/* #endif  */
</style>
