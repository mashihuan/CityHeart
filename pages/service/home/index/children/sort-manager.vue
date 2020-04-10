<template>
	<view class="list">
		<view class="item d-flex align-items-center" v-for="(item, index) of merchant_goods" :key="index">
			<view class="sort">{{item.name}}</view>
			<button class="edit" @tap="onEditGoodsEvent(item)">编辑</button>
			<button class="del" @tap="onDelGoodsEvent(item)">删除</button>
		</view>
		<nodata v-if="merchant_goods.length <= 0"></nodata>
	</view>
</template>

<script>
	import {
		mapState,
		mapActions
	} from 'vuex'
	import {
		delSort
	} from '@/api'
	import nodata from '@/components/nodata'
	export default {
		name: '',
		data() {
			return {

			}
		},
		computed: {
			...mapState(['merchant_goods', 'user_info']),
		},
		onLoad() {

		},
		methods: {
			...mapActions(['reqGetMerchantGoods']),
			onEditGoodsEvent(item) { // 编辑
				uni.navigateTo({
					url: '/pages/service/home/subPages/add-sort?id=' + item.id + '&name=' + item.name,
				})
			},
			async onDelGoodsEvent(item) { // 删除
				uni.showModal({
					content: '确定要删除此分类吗',
					success: async function(res) {
						if (res.confirm) {
							let result = await delSort({
								id: item.id
							})
							if (result.code == 200) {
								this.reqGetMerchantGoods({
									id: this.user_info.cshangdetail.id
								})
							}
						}
					}
				})

			}
		},
		components: {
			nodata
		}
	}
</script>

<style lang="scss" scoped>
	@import '~@/common/css/avariables.scss';

	.list {
		padding: 50upx 20upx;

		.item {
			margin-bottom: 50upx;

			.sort {
				width: 280upx;
				height: 60upx;
				margin-right: 20upx;
				text-align: center;
				line-height: 60upx;
				border: 1upx solid $main-color;
				border-radius: 10upx;
			}

			button {
				height: 24upx;
				margin: 0;
				padding: 0;
				font-size: 24upx;
				line-height: 24upx;
				border-radius: 0;
				background: #fff;

				&:after {
					display: none;
				}
			}

			.edit {
				color: $main-color;
				margin-right: 20upx;
			}

			.del {
				color: $money-color;
			}
		}
	}
</style>
