<template>
	<mine-temp :list="list" :personal_info="user_info" :service="true"></mine-temp>
</template>

<script>
	import mineTemp from '@/components/mine-temp'
	import { mapState } from 'vuex'
	export default {
		name: '',
		data () {
			return {
				list: [
					{text: '评价管理'},{text: '切换为用户'},{text: '浏览历史'},{text: '清空缓存'},{text: '退出登录'},
				]
			}
		},
		onLoad () {

		},
		computed: {
			...mapState(['user_info'])
		},
		methods: {

		},
		components: {
			mineTemp
		}
	}
</script>

<style lang="scss" scoped>

</style>
