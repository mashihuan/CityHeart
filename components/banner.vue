<template>
	 <swiper class="swiper" :style="{height: swiperHeight}" :indicator-dots="true" :autoplay="true" indicator-color="#fff" indicator-active-color="#fed00b" previous-margin="30px" next-margin="30px">
			<swiper-item v-for="(item) of home_carousel" :key="item.id">
				<image class="h-100 border-radius" :lazy-load="true" :src="BASE_URL + item.images"></image>
			</swiper-item>
	</swiper>
</template>

<script>
	import { BASE_URL } from '@/api'
	export default {
		props: {
			home_carousel: Array
		},
		name: '',
		data () {
			return {

			}
		},
		computed: {
			swiperHeight () {
				return uni.upx2px(390) + 'px';
			},
			BASE_URL () {
				return BASE_URL
			}
		},
		onLoad () {

		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>

</style>
