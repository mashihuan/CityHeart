<template>
	<view class="platform">
		<view class="platform-title d-flex align-items-center">
			<image src="/static/images/platform.png"></image>
			<view>平台点评</view>
		</view>
		<view class="platform-content">{{platform_comment.pcomment || ''}}</view>
		<view class="userComment-title left-flag" @tap="onMoreCommentClick">用户点评（查看全部）</view>
		<view class="comment-type d-flex flex-wrap">
			<view class="comment-item" 
				:class="{active: current == index}"
				v-if="item.num != 0"
				v-for="(item, index) of comment_type" :key="index"
				@tap="onLookCommentClick(item, index)"
			>{{item.name}}（{{item.num}}）</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: '',
		props: {
			platform_comment: {type: Object},
			comment_type: {type: Array}
		},
		data () {
			return {
				current: -1
			}
		},
		onLoad () {

		},
		methods: {
			onMoreCommentClick () {
				this.current = -1;
				this.$emit('onMoreCommentClick')
			},
			onLookCommentClick (item, index) {
				if(this.current != index) {
					this.current = index;
				}
				this.$emit('onLookCommentClick', item.id)
			}
		}
	}
</script>

<style lang="scss" scoped>
.platform {
	padding: 10upx 40upx;
	.platform-title {
		image {
			width: 98upx;
			height: 77upx;
		}
		view {
			width: 170upx;
			height: 50upx;
			line-height: 50upx;
			text-align: center;
			border-radius: 10upx;
			font-weight: bold;
			background: #fcd108;
		}
	}
	.platform-content {
		padding: 20upx;
		font-size: 24upx;
		line-height: 40upx;
	}
	.userComment-title {
		position: relative;
		margin-left: 20upx;
		font-weight: bold;
	}
	.comment-type {
		justify-content: space-between;
		margin-top: 40upx;
		padding: 0 20upx;
		.comment-item {
			width: 260upx;
			margin-bottom: 30upx;
			text-align: center;
			line-height: 60upx;
			font-size: 24upx;
			border: 1upx solid #fcd108;
			border-radius: 10upx;
			&.active {
				background: #fcd108;
				color: #fff;
			}
		}	
	}
}
</style>
