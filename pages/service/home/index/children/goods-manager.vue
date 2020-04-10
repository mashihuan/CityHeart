<template>
	<view class="wrap">
		<view class="item d-flex border-bottom" v-for="(item, index) of goodsList" :key="index">
			<image class="border-radius shadow" lazy-load="true" :src="BASE_URL + item.img"></image>
			<view class="info">
				<view class="name">{{item.name}}</view>
				<view class="price">￥{{item.price}}</view>
			</view>
			<view class="btn-group d-flex">
				<button class="edit" @tap="onEditGoodsEvent(item)">编辑</button>
				<button class="del" @tap="onDelGoodsEvent(item)">删除</button>
			</view>
		</view>
		<nodata v-if="goodsList.length <=0"></nodata>
	</view>
</template>

<script>
	import { mapState, mapActions } from 'vuex'
	import { BASE_URL, delGoods } from '@/api'
	import nodata from '@/components/nodata'
	export default {
		name: '',
		data () {
			return {

			}
		},
		onLoad () {

		},
		computed: {
			...mapState(['user_info', 'goodsList', 'merchant_goods']),
			BASE_URL () {
				return BASE_URL
			}
		},
		methods: {
			...mapActions(['reqGetMerchantGoods']),
			onEditGoodsEvent (item) {
				uni.navigateTo({
					url: `/pages/service/home/subPages/add-goods?id=${item.id}&img=${item.img}&name=${item.name}&price=${item.price}&class_id=${item.class_id}`,
				})
				// this.$emit('onEditGoodsEvent')
			},
			async onDelGoodsEvent (item) {
				let that = this;
				uni.showModal({
					title: '删除',
					content: '确定要删除此商品吗？',
					success: async function (res) {
						if(res.confirm) {
							let result = await delGoods({
								id: item.id
							})
							if(result.code == 200) {
								// uni.showToast({
								// 	title: '删除成功'
								// })
								that.reqGetMerchantGoods({
									id: that.user_info.cshangdetail.id
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
.wrap {
	padding: 20upx;
	.item {
		padding: 30upx 0;
		justify-content: space-between;
		image {
			width: 170upx;
			height: 100upx;
			margin-right: 20upx;
		}
		.info {
			width: 30%;
			.name {
				width: 100%;
				white-space: nowrap;
				text-overflow: ellipsis;
				overflow: hidden;
			}
			.price {
				margin-top: 10upx;
				font-size: 26upx;
				color: $money-color;
			}
		}
		.btn-group {
			align-self: flex-end;
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
}
</style>
