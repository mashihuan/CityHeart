<template>
	<wrap-temp :long="true">
		<view class="content w-100">
			<view class="mg-bottom-30">分类名称：</view>
			<input class="input" type="text" v-model="sort" placeholder="请输入分类名称">
			<button class="btn mini-btn" @tap="onConfirmClick">保存</button>
		</view>
	</wrap-temp>
</template>

<script>
	import wrapTemp from '@/components/wrap-temp'
	import { changeNavigationBarText } from '@/common/js/common.js'
	import { addSort, editSort } from '@/api'
	import { mapState, mapActions } from 'vuex'
	export default {
		name: '',
		data () {
			return {
				sort: '',
				sort_id: ''
			}
		},
		computed: {
			...mapState(['user_info']),
		},
		onLoad (options) {
			if(options.id) {
				changeNavigationBarText('编 辑')
				this.sort_id = options.id;
				this.sort = options.name
			}
		},
		methods: {
			...mapActions(['reqGetMerchantGoods']),
			async onConfirmClick () {
				let that = this;
				console.log(this.user_info)
				if(this.sort == '') {
					uni.showToast({
						title: '请输入分类名称',
						icon: 'none'
					})
					return;
				}
				let result;
				if(!this.sort_id) {
					result = await addSort ({
						cshangdetail_id: this.user_info.cshangdetail.id,
						name: this.sort,
					})
				}else {
					result = await editSort ({
						cshangdetail_id: this.user_info.cshangdetail.id,
						name: this.sort,
						id: this.sort_id
					})
				}
				if(result.code == 200) {
					uni.showToast({
						title: '保存成功'
					})
					setTimeout(() => {
						uni.navigateBack();
						that.reqGetMerchantGoods({
							id: that.user_info.cshangdetail.id,
						})
					}, 2000)
				}
			}
		},
		components: {
			wrapTemp
		}
	}
</script>

<style lang="scss" scoped>
.content {
	padding: 50upx;
}
.btn {
	margin-top: 100upx;
}
</style>
