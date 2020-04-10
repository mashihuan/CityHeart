<template>
	<view class="d-flex align-items-center border-bottom wrap" hover-class="hoverClass" @tap="onSwitchToEvent(text, index)">
		<image class="avatar" v-if="avatar" :src="avatar" @tap.stop="onPreviewAvatar"></image>
		<text class="flex-1">{{text}}</text>
		<image v-if="subAvatar" class="subAvatar" :src="subAvatar" @tap.stop="onPreviewAvatar"></image>
		<image v-if="isShowArrow" class="arrow" src="/static/images/jianto2@2x.png"></image>
	</view>
</template>

<script>
	export default {
		props: {
			avatar: String,
			text: String,
			isShowArrow: {type: Boolean, default: true},
			index: Number,
			subAvatar: String
		},
		name: '',
		data () {
			return {

			}
		},
		onLoad () {

		},
		methods: {
			onSwitchToEvent (text, index) {
				this.$emit('onSwitchToEvent', {text, index})
			},
			onPreviewAvatar () {
				let url = '';
				url = this.avatar || this.subAvatar;
				uni.previewImage({
					urls: [url],
        });
			}
		}
	}
</script>

<style lang="scss" scoped>
.wrap /deep/	uni-image>img {
	opacity: 1;
}
.wrap {
	padding: 50upx;
	.avatar {
		width: 120upx;
		height: 120upx;
		margin-right: 30upx;
		border-radius: 50%;
	}
	.subAvatar {
		width: 80upx;
		height: 80upx;
		border-radius: 50%;
	}
	.arrow {
		width: 18upx;
		height: 28upx;
	}
}
.hoverClass {
	background: rgba(0, 0, 0, .1);
	opacity: .7;
}
</style>
