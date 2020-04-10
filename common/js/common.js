import { BASE_URL } from '@/api'

export const changeNavigationBarText = (title) => {   //动态改变导航文字
	uni.setNavigationBarTitle({
		title: title
	})
}

export const dealLogin = () => {
	let token = uni.getStorageSync('token');
	if(!token) {
		uni.redirectTo({
			url: '/pages/login/login'
		})
		return false;
	}
}

export const changeNavigationBarButton = (text) => {   // 动态添加导航栏添加按钮
	let pages = getCurrentPages();
	let page = pages[pages.length - 1];
	// #ifdef APP-PLUS
	let currentWebview = page.$getAppWebview();
	let titleObj = currentWebview.getStyle().titleNView;
	if (!titleObj.buttons) {
		return;
	}
	titleObj.buttons[0].text = titleObj.buttons[0].text = text;
	currentWebview.setStyle({
		titleNView: titleObj
	});
	// #endif
}

export const dealCountDown = function dealCountDown (that) {   // 验证码倒计时
	that.count = 60;
	let timer = setInterval(() => {
		if(that.count <= 0) {
			clearInterval(timer);
			return;
		}
		that.count --;
	}, 1000)
}

export const verifyPhoneNumber = (phone) => {   // 验证手机号
	let reg = /^1[3,4,5,6,7,8,9]\d{9}$/g;
	if(phone == "" || phone.trim() == "") {
		uni.showToast({
			title: '请输入手机号',
			icon: 'none'
		})
		return false;
	}else if(!reg.test(phone)) {
		uni.showToast({
			title: '手机号格式错误',
			icon: 'none'
		})
		return false;
	}else {
		return true
	}
} 

export const previewImage = (img) => {  // 预览图片
	var arr = [];
	if(img.includes(',')) {
		img.split(',').forEach((val, index) => {
			arr.push(BASE_URL + val)
		})
	}else {
		arr.push(BASE_URL + img)
	}
	uni.previewImage({
		urls: arr,
		// longPressActions: {
		// itemList: ['发送给朋友', '保存图片', '收藏'],
		// 	success: function (res) {
		// 		console.log('选中了第' + (res.tapIndex + 1) + '个按钮');
		// 	}
		// }
	});
}