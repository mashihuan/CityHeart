<template>
	<view class="container">
		<view class="wrap bg-white border-radius shadow">
			<comment-item :user_comment="user_comments" :showTime="true"
					v-for="(item, index) of user_comments" :key="index" :item="item" :index="index"
					:showCheckbox="showCheckbox"
					@onCheckboxClickEvent="onCheckboxClickEvent"
			 ></comment-item>
			 <!-- <bottom v-if="showBottom && user_comments.length > 0"></bottom> -->
		</view>
		<nodata v-if="user_comments.length <= 0"></nodata>
		<view v-if="showCheckbox" class="del bg-white">
			<button class="btn" @tap="ondelCommentEvent">删除</button>
		</view>
	</view>
</template>

<script>
	import commentItem from '@/components/comment-item'
	import bottom from '@/components/bottom'
	import nodata from '@/components/nodata'
	import { mapState, mapActions } from 'vuex'
	import { delUserComments } from '@/api'
	export default {
		name: '',
		data () {
			return {
				showCheckbox: false,
				page: 1,
				limit: 10,
				showBottom: false
			}
		},
		onLoad () {
			this._getUserComments()
		},
		computed: {
			...mapState(['user_comments']),
		},
		onReachBottom () {
			if(!this.showBottom) {
				this._getUserComments()
			}
		},
		onNavigationBarButtonTap(e) {
			let that = this;
			let pages = getCurrentPages();
			// #ifdef APP-PLUS
			let page = pages[pages.length - 1];
			let currentWebview = page.$getAppWebview();
			let titleObj = currentWebview.getStyle().titleNView;
			console.log(JSON.stringify(titleObj))
			if (!titleObj.buttons) {
				return;
			}
			titleObj.buttons[0].text = titleObj.buttons[0].text == '编 辑' ? '完 成' : '编 辑';
			that.showCheckbox = !that.showCheckbox;
			//titleObj.buttons[0].text = titleObj.buttons[0].text === "\ue604" ? "\ue605" : "\ue604";
			currentWebview.setStyle({
				titleNView: titleObj
			});
			// #endif
		},
		methods: {
			...mapActions(['reqGetUserComments']),
			_getUserComments () {   // 获取用户评论
				this.reqGetUserComments({
					data: {
						id: uni.getStorageSync('user_id'),
						page: this.page,
						limit: this.limit
					},
					callback1: this._addPage,
					callback2: this._showBottom
				})
			},
			async ondelCommentEvent () {  // 删除用户评论
				let tempArr = [];
				this.user_comments.forEach((val, index) => {
					if(val.checked) {
						tempArr.push(val.ccid)
					}
				})
				if(tempArr.length <= 0) {
					uni.showToast({
						title: '请至少选择一条评论',
						icon: 'none'
					})
					return;
				}
				let result = await delUserComments({
					id: tempArr.join(',')
				})
				if(result.code == 200) {
					this._getUserComments()
				}
			},
			onCheckboxClickEvent ({item, index}) {
				if(this.user_comments[index].checked === undefined) {
					this.$set(this.user_comments[index], "checked", true)
				}else {
					this.$set(this.user_comments[index], "checked", !this.user_comments[index].checked)
				}
			},
			_addPage () {
				this.page ++;
			},
			_showBottom () {
				this.showBottom = true;
			}
		},
		components: {
			commentItem,
			bottom,
			nodata
		}
	}
</script>

<style lang="scss" scoped>
@import '~@/common/css/avariables.scss';	
.wrap {
	margin-bottom: 120upx;
}
.del {
	display: flex;
	justify-content: flex-end;
	align-items: center;
	position: fixed;
	left: 0;
	bottom: 0;
	width: 100%;
	height: 100upx;
	padding: 0 80upx;
	box-shadow: 0 2upx 2upx 2upx #ccc;
	button {
		width: 150upx;
		height: 50upx;
		line-height: 50upx;
		font-size: 28upx;
		margin: 0;
	}
}	
</style>
