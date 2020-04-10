<template>
	<view class="container">
		<view class="bg-white border-radius wrap shadow">
			<view class="type-list d-flex flex-wrap">
				<view class="type-item d-flex align-items-center" 
						:class="{active: item.checked}"
						v-for="(item, index) of comment_classify" 
						:key="index" 
						@tap="onChoseEvent(item)"
				>
					<view class="checkbox"></view>{{item.name}}
				</view>
			</view>
			<textarea name="" id="" cols="30" rows="10" class="border-radius" placeholder="快来说说你们的感觉"
				v-model="content"
			></textarea>
		</view>
	</view>
</template>

<script>
	import { mapState, mapActions, mapMutations } from 'vuex'
	import { publishComment } from '@/api'
	import { dealLogin } from '@/common/js/common.js'
	export default {
		name: '',
		data () {
			return {
				id: '',
				content: ''
			}
		},
		onLoad (options) {
			this.id = options.id;
			
		},
		onReady () {
			this._getCommentClassify();
		},
		computed: {
			...mapState(['comment_classify'])
		},
		async onNavigationBarButtonTap (e) {
			let token = uni.getStorageSync('token');
			let mer_id = uni.getStorageSync('mer_id');
			let that = this;
			if(!token) {
				uni.navigateTo({
					url: '/pages/login/login'
				})
				return;
			}
			let tempArr = []
			this.comment_classify.forEach((val, index) => {
				if(val.checked) {
					tempArr.push(val.id);
				}
			})
			if(tempArr.length <=0 ) {
				uni.showToast({
					title: '请至少选择一个评论分类',
					icon: 'none'
				})
				return;
			}
			if(this.content == '' ) {
				uni.showToast({
					title: '随便说几句吧',
					icon: 'none'
				})
				return;
			}
			let result = await publishComment({
				ycomment: this.content,
				user_id: uni.getStorageSync('user_id'),
				// cshangdetail_id: that.id,
				cshangdetail_id: mer_id,
				ccommentclass_id: tempArr.join(',')
			})
			console.log(result)
			if(result.code == 200) {
				uni.showToast({
					title: '发布成功',
				})
				setTimeout(() => {
					uni.navigateBack()
					that.reqGetUserComment({
						id: mer_id,
						page: 1,
						limit: 100
					})
				}, 2000)
			}
		},
		methods: {
			...mapActions(['reqGetCommentClassify', 'reqGetMerchantDetail', 'reqGetUserComment']),
			_getCommentClassify () {  // 获取评论分类
				this.reqGetCommentClassify()
			},
			onChoseEvent (item) {
				if(item.checked === 'undefined') {
					this.$set(item, 'checked', true)
				}else {
					this.$set(item, 'checked', !item.checked)
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
@import '~@/common/css/avariables.scss';	
.wrap {
	padding: 45upx;
	.type-list {
		.type-item {
			width: 33.33%;
			margin-bottom: 50upx;
			font-size: 24upx;
			&.active {
				.checkbox {
					width: 46upx;
					margin-right: 14upx;
					background: url('~@/static/images/xuanzhong@2x.png');
					background-size: 100% 100%;
				}
			}
		}
	}
	textarea {
		height: 310upx;
		padding: 30upx;
		font-size: 26upx;
		border: 1upx solid $main-color;
	}
}
</style>
