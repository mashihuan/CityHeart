<template>
	<view class="container" :style="{height: ScrollHeigfht}">
		<view class="wrap  border-radius bg-white shadow">
			<slot></slot>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			long: Boolean
		},
		name: '',
		data () {
			return {

			}
		},
		computed: {
			ScrollHeigfht () {
				let windowHeight = uni.getSystemInfoSync().windowHeight;
				let tabbarHeight;
				if(this.long) {
					tabbarHeight = 0;
				}else {
					// #ifdef APP-PLUS
						tabbarHeight = 56;
					// #endif	
					// #ifdef H5
						tabbarHeight = 50;
					// #endif	
				}
				windowHeight = windowHeight - tabbarHeight;
				return windowHeight + 'px'
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
.wrap {
	height: 100%;
	height: 100%;
}
</style>
