<template>
	<view class="comment-more half-divider">
		<view class="title left-flag" @tap="onMoreCommentClick">更多评价</view>
		<view class="comment-list">
			<comment-item v-if="item.ycomment" v-for="(item, index) of user_comment" :key="index" :index="index" :user_comment="user_comment" :item="item"></comment-item>
			<nodata v-if="user_comment.length <= 0"></nodata>
		</view>
	</view>
</template>

<script>
	import commentItem from '@/components/comment-item'
	import nodata from '@/components/nodata'
	export default {
		props: {
			user_comment: Array
		},
		name: '',
		data () {
			return {
				
			}
		},
		onLoad () {

		},
		methods: {
			onMoreCommentClick () {
				this.$emit('onMoreCommentClick')
			}
		},
		components: {
			commentItem,
			nodata
		}
	}
</script>

<style lang="scss" scoped>
.comment-more {
	position: relative;
	padding: 50upx 50upx;
}
.title {
	position: relative;
	font-weight: bold;
	margin-left: 10upx;
}
</style>
