<template>
	<view class="content" :style="{background: background, 'background-size': '100% 100%'}">
		<view class="wrap d-flex flex-direction-column align-items-center">
			<image v-if="!background" class="logo" src="/static/images/logo.png"></image>
			<slot></slot>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			background: String
		},
		data() {
			return {
				phone: '',
				pwd: ''
			}
		},
		onLoad() {

		},
		methods: {
			
		},
		components: {
			
		}
	}
</script>

<style scoped lang="scss">
@import '~@/common/css/mixin.scss';	
@import '~@/common/css/avariables.scss';
.content {
	width: 100%;
	height: 100%;
	@include background-img('~@/static/images/login_bg.png');
	.wrap {
		padding: 60upx 80upx;
		.logo {
			width: 160upx;
			height: 160upx;
			margin-bottom: 70upx;
			border-radius: 15upx;
		}
	}
}
</style>
