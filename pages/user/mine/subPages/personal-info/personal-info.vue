<template>
	<view class="container">
		<view class="wrap shadow border-radius bg-white">
			<list-cell text="修改头像" :isShowArrow="false" :subAvatar="user_info.avatar ? (BASE_URL + user_info.avatar) : subAvatar" @onSwitchToEvent="onSwitchToEvent"></list-cell>
			<list-cell text="修改昵称" @onSwitchToEvent="onSwitchToEvent"></list-cell>
			<list-cell text="修改手机号码" @onSwitchToEvent="onSwitchToEvent"></list-cell>
			<list-cell text="修改密码" @onSwitchToEvent="onSwitchToEvent"></list-cell>
		</view>
	</view>
</template>

<script>
	import listCell from '@/components/list-cell'
	import { BASE_URL } from '@/api'
	import { mapState, mapActions } from 'vuex'
	export default {
		name: '',
		data () {
			return {
				subAvatar: '/static/images/a8@2x.png'
			}
		},
		onLoad () {

		},
		computed: {
			...mapState(['user_info']),
			BASE_URL () {
				return BASE_URL
			}
		},
		methods: {
			...mapActions(['reqGetUserInfo']),
			onSwitchToEvent ({text, index}) {
				if(text == '修改头像') {
					this._changeAvatar()
				}
				if(text == '修改昵称') {
					uni.navigateTo({
						url: '/pages/user/mine/subPages/change-nickname/change-nickname'
					})
				}
				if(text == '修改手机号码') {
					uni.navigateTo({
						url: '/pages/user/mine/subPages/change-phone/change-phone'
					})
				}
				if(text == '修改密码') {
					uni.navigateTo({
						url: '/pages/user/mine/subPages/change-pwd/change-pwd'
					})
				}
			},
			_changeAvatar () {
				let that = this;
				uni.chooseImage({
					success: (chooseImageRes) => {
							const tempFilePaths = chooseImageRes.tempFilePaths;
							that.subAvatar = tempFilePaths[0]
							uni.uploadFile({
									url: BASE_URL + '/api/user/upUsertou', 
									filePath: tempFilePaths[0],
									name: 'avatar',
									formData: {
											id: that.user_info.id
									},
									success: (uploadFileRes) => {
										that.reqGetUserInfo({
											id: that.user_info.id
										})
									}
							});
					}
				});
			}
		},
		components: {
			listCell
		}
	}
</script>

<style lang="scss" scoped>
.wrap {
	
}
</style>
