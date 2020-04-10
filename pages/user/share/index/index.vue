<template>
	<view class="container">
		<view class="bg-white border-radius wrap shadow">
			<text class="desc">{{share_info.content}}</text>
			<view class="qrCode d-flex flex-direction-column align-items-center">
				<view class="img-wrap">
					<image :src="BASE_URL + share_info.image" @tap="onScanCode" @longtap="onSaveCode(BASE_URL + share_info.image)"></image>
				</view>
				<text>扫描二维码进微信群</text>
				<view class="img-wrap">
					<image :src="BASE_URL + share_info.gongimage" @tap="onScanCode" @longtap="onSaveCode(BASE_URL + share_info.gongimage)"></image>
				</view>
				<text>扫描二维码关注公众号</text>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapState, mapActions } from 'vuex'
	import { BASE_URL } from '@/api'
	export default {
		name: '',
		data () {
			return {

			}
		},
		computed: {
			...mapState(['share_info']),
			BASE_URL () {
				return BASE_URL
			}
		},
		onReady () {
			this.reqGetShareInfo()
		},
		methods: {
			...mapActions(['reqGetShareInfo']),
			onScanCode () {  // 扫码
				// #ifdef APP-PLUS
				uni.scanCode({
					success: function (res) {
						console.log(JSON.stringify(res));
						plus.runtime.openURL(res.result)
					}
				});
				// #endif
			},
			onSaveCode (url) {
				console.log(url)
				uni.showActionSheet({
						itemList: ['保存到相册'],
						success: function (res) {
							if(res.tapIndex == 0) {
								uni.downloadFile({
									url: url,
									success: function (res) {
										if(res.statusCode == 200) {
											uni.saveImageToPhotosAlbum({
												filePath: res.tempFilePath,
												success: function (result) {
													uni.showToast({
														title: '保存成功'
													})
												}
											})
										}
									}
								})
							}
						}
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
.wrap {
	padding: 50upx;
	.desc {
		font-size: 24upx;
		line-height: 2;
	}
	.qrCode {
		.img-wrap {
			width: 250upx;
			height: 250upx;
			margin: 50upx 0;
			padding: 10upx;
			border: 1upx solid #fcd413;
		}
		image {
			width: 100%;
			height: 100%;
		}
	}
}
</style>
