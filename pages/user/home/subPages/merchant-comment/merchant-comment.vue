<template>
	<view class="container">
		<view class="bg-white border-radius wrap">
			<comment-platform @onMoreCommentClick="onMoreCommentClick" @onLookCommentClick="onLookCommentClick" :platform_comment="platform_comment" :comment_type="comment_type"></comment-platform>
			<comment-list :user_comment="user_comment"></comment-list>
		</view>
	</view>
</template>

<script>
	import commentPlatform from './children/platform-comment'
	import commentList from './children/comment-list'
	import { changeNavigationBarText, changeNavigationBarButton } from '@/common/js/common.js'
	import { mapActions, mapState } from 'vuex'
	import { BASE_URL, getPlatformComment } from '@/api'
	export default {
		name: '',
		data () {
			return {
				id: '',
				type: ''
			}
		},
		computed: {
			...mapState(['comment_type', 'user_comment', 'platform_comment', 'user_info']),
		},
		onLoad (options) {
			console.log(options);
			this.id = options.id;
			if(options.type) {
				changeNavigationBarText('评 价')
				changeNavigationBarButton('')
			}
		},
		onShow () {
			this.reqGetCommentType({id: uni.getStorageSync('mer_id')});
			this.reqGetPlatformComment({
				id: uni.getStorageSync('mer_id'),
			})
			this.reqGetUserComment({
				id: uni.getStorageSync('mer_id'),
				page: 1,
				limit: 100
			})
		},
		onNavigationBarButtonTap () {
			uni.navigateTo({
				url: '/pages/user/home/subPages/comment/comment?id=' + this.id
			})
		},
		methods: {
			...mapActions(['reqGetPlatformComment', 'reqGetCommentType', 'reqGetUserComment', 'reqGtCommentByClassify']),
			onMoreCommentClick () {  // 更多评价
				
				this.reqGetUserComment({
					id: uni.getStorageSync('mer_id'),
					page: 1,
					limit: 100
				})
			},
			onLookCommentClick (id) {  // 查看分类对应下的评论
				console.log(id)
				this.reqGtCommentByClassify({
					id: uni.getStorageSync('mer_id'),
					ccommentclass_id: id,
					page: 1,
					limit: 100
				})
			}
		},
		components: {
			commentList,
			commentPlatform
		}
	}
</script>

<style lang="scss" scoped>

</style>
