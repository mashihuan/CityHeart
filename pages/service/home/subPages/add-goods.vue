<template>
	<wrap-temp :long="true">
		<view class="content w-100">
			<view class="title mg-bottom-30">名称：</view>
			<input class="input" type="text" v-model="name" placeholder="请输入名称">
			<view class="title mg-bottom-30">选择分类：</view>
			<input class="input" type="text" v-model="sort" disabled placeholder="选择分类" @tap="onChooseClick">
			<view class="title mg-bottom-30">价格：</view>
			<input class="input" type="text" v-model="price" placeholder="请输入价格">
			<image :src="img" @tap="onUploadImgClick"></image>
			<button class="btn mini-btn" @tap="onConfrimClick">保存</button>
		</view>
		<mpvue-picker themeColor="#f3c700" ref="mpvuePicker" mode="selector"
		 @onConfirm="onConfirm" :pickerValueArray="pickerValueArray"></mpvue-picker>
	</wrap-temp>
</template>

<script>
	import wrapTemp from '@/components/wrap-temp'
	import mpvuePicker from '@/components/mpvue-picker/mpvuePicker.vue';
	import { changeNavigationBarText } from '@/common/js/common.js'
	import { addGoods, editGoods, BASE_URL } from '@/api'
	import { mapState, mapActions } from 'vuex'
 	export default {
		name: '',
		data () {
			return {
				name: '',
				sort: '',
				sort_id: '',
				price: '',
				img: '/static/images/xiangji@2x.png',
				imgPath: '',
				pickerValueArray: [],
				id: '', // 商品id 编辑用
			}
		},
		computed: {
			...mapState(['user_info', 'sortList', 'merchant_goods']),
			BASE_URL () {
				return BASE_URL
			}
		},
		onLoad (options) {
			console.log(options);
			console.log(this.sortList)
			if(options.id) {
				changeNavigationBarText('编 辑')
				this.name = options.name;
				this.sortList.forEach((val, index) => {
					if(val.id  == options.class_id) {
						this.sort = val.name;
						this.sort_id = val.id;
					}
				})
				this.img = BASE_URL + options.img;
				this.imgPath = options.img;
				this.price = options.price;
				this.id = options.id;
			}
		},
		methods: {
			...mapActions(['reqGetMerchantGoods']),
			async onConfrimClick () {   // 保存
				let that = this;
				if(this.name == '') {
					uni.showToast({
						title: '请输入名称',
						icon: 'none'
					})
					return;
				}
				if(this.sort == '') {
					uni.showToast({
						title: '请选择分类',
						icon: 'none'
					})
					return;
				}
				if(this.price == '') {
					uni.showToast({
						title: '请输入价格',
						icon: 'none'
					})
					return;
				}
				if(this.imgPath == '') {
					uni.showToast({
						title: '请上传图片',
						icon: 'none'
					})
					return;
				}
				let result;
				if(this.id) {
					result = await editGoods ({
						name: this.name,
						images: this.imgPath,
						ccaiclass_id: this.sort_id,
						jia: this.price,
						id: this.id
					})
				}else {
					result = await addGoods ({
						name: this.name,
						images: this.imgPath,
						ccaiclass_id: this.sort_id,
						jia: this.price
					})
				} 
				if(result.code == 200) {
					uni.showToast({
						title: '保存成功',
					})
					setTimeout(() => {
						uni.navigateBack();
						that.reqGetMerchantGoods({
							id: that.user_info.cshangdetail.id
						})
					}, 1500)
				}
			},
			onUploadImgClick () {
				let that = this;
				uni.chooseImage({
					success: (chooseImageRes) => {
						const tempFilePaths = chooseImageRes.tempFilePaths;
						that.img = tempFilePaths[0]
						uni.uploadFile({
							url: BASE_URL + '/api/upload/adimage', 
							filePath: tempFilePaths[0],
							name: 'file',
							success: (uploadFileRes) => {
								console.log(uploadFileRes.data);
								that.img = BASE_URL +  JSON.parse(uploadFileRes.data).data;
								that.imgPath = JSON.parse(uploadFileRes.data).data;
							}
					  });
				  }
				});
			},
			onChooseClick () {  // 选择分类
				let arr = []
				this.merchant_goods.forEach((val, index) => {
					let {name: label, id: value} = val;
					arr.push({label, value});
					this.pickerValueArray = arr
					this.$refs.mpvuePicker.show()
				})
			},
			onConfirm (e) {   // 确认分类
				this.sort = e.label;
				this.sort_id = e.value[0]
			}
		},
		components: {
			wrapTemp,
			mpvuePicker
		}
	}
</script>

<style lang="scss" scoped>
@import '~@/common/css/avariables.scss';
.content {
	padding: 50upx;
	image {
		width: 580upx;
		height: 210upx;
		margin: 90upx 0;
		border-radius: 10upx;
	}
}
</style>
