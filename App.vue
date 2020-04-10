<script>
	import { checkUpdate } from '@/api'
	export default {
		onLaunch: function() {
			this._CheckUpdate()
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		methods: {
			async _CheckUpdate () { // 检查更新
				// #ifndef H5
				let version = plus.runtime.version;
				let platform = uni.getSystemInfoSync().platform;
				let self = this;
				uni.showLoading({
					title: '正在检查新版本'
				})
				let result = await checkUpdate ({
					version: version
				})
				console.log(result)
				uni.hideLoading()
				if(result.code == 200 && result.data.url) {
					console.log(JSON.stringify(result))
					uni.showModal({
						content: '检查到新版本，是否更新？',
						success: function (res) {
							if(res.confirm) {
								if(platform == 'android') {
									plus.runtime.openURL(result.data.url);  // res.data.downloadurl
								}else {
									plus.runtime.openURL(result.data.url);  // res.data.downloadurl
								}
							}
						}
					})
				}
				// #endif
			}
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	page {
		width: 100%;
		height: 100%;
		font-size: 28upx;
		color: #555555;
		background: #f2f2f2;
		overflow-x: hidden !important;
	}
	view, text, button, input, textarea {
		box-sizing: border-box;
	}
	image {
		max-width: 100%;
	}
	// .wrap .border-bottom:last-child, .recommend .border-bottom:last-child {
	// 	border-bottom: red;
	// }
</style>
