<template>
	<view class="comment-item d-flex align-items-center" :class="{'border-bottom': index !== user_comment.length - 1}">
		<view class="checkbox mg-right-60" :class="{active: item.checked}" v-show="showCheckbox" @tap="onCheckboxClickEvent(item, index)"></view>
		<view class="flex-1">
			<view class="comment-top d-flex align-items-center"><image :src="BASE_URL + item.avatar"></image>{{item.nickname}}</view>
			<view class="comment-content">{{item.ycomment}}</view>
			<view v-show="showTime" class="comment-time">{{item.create_time}}</view>
		</view>
	</view>
</template>

<script>
	import { BASE_URL } from '@/api'
	export default {
		props: {
			showCheckbox: {type: Boolean, default: false},
			showTime: Boolean,
			item: Object,
			index: Number,
			user_comment: Array
		},
		name: '',
		data () {
			return {
				newItem: this.item
			}
		},
		computed: {
			BASE_URL () {
				return BASE_URL
			}
		},
		onLoad () {

		},
		methods: {
			onCheckboxClickEvent (item, index) {
				this.$emit('onCheckboxClickEvent', {item, index})
			}
		}
	}
</script>

<style lang="scss" scoped>
.comment-item {
		padding: 30upx;
		.comment-top {
			image {
				width: 100upx;
				height: 100upx;
				border-radius: 50%;
				margin-right: 20upx;
			}
		}
		.comment-content {
			margin-top: 20upx;
			padding-left: 20upx;
			font-size: 24upx;
			line-height: 2;
			text-align: justify;
		}
		.comment-time {
			margin-top: 30upx;
			font-size: 24upx;
			text-align: right;
		}
	}

</style>
