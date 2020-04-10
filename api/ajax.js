export default function ajax(url = '', params = {}, header = {
	'content-type': 'application/x-www-form-urlencoded',
	'token': params.token
	}, method = 'POST') {   // application/json
	return uni.request({
		url: url,
		data: params,
		header: header,
		method: method
	}).then(res => {
		let [error, data] = res;
		if(data.data.code != 200) {
			uni.showToast({
				title: data.data.msg,
				icon: 'none'
			})
		}
		return data.data;
	})
}