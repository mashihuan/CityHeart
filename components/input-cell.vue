<template>
	<view class="input-cell">
		<image class="icon" :src="icon"></image>
		<input :type="type" :value="value" :placeholder="placeholder" @input="onInputEvent">
		<block v-if="sms">
			<button v-if="count == 0" class="sms-btn" @tap="onGetSmsEvent">获取验证码</button>
			<button v-else disabled class="sms-btn">重新获取({{count}})</button>
		</block>
		<uni-icon v-if="value" size="20" class="clear" type="clear" color="#e8e8e8" @tap="onClearEvent"></uni-icon>
	</view>
</template>

<script>
	import uniIcon from '@/components/uni-icon/uni-icon'
	export default {
		props: {
			icon: String,
			placeholder: String,
			type: {type: String, default: 'text'},
			sms: Boolean,
			count: Number,
		},
		model: {
			prop: 'value',
			event: 'input'
		},
		name: '',
		data () {
			return {
				value: '',
			}
		},
		computed: {
			
		},
		onLoad () {

		},
		methods: {
			onInputEvent (e) {
				this.value = e.target.value;
				this.$emit('input', e.target.value)
			},
			onClearEvent () {
				this.value = '';
				this.$emit('input', '')
			},
			onGetSmsEvent () {
				this.$emit('onGetSmsEvent')
			}
		},
		components: {
			uniIcon
		}
	}
</script>

<style lang="scss" scoped>
@import '~@/common/css/avariables.scss';	
.input-cell {
	display: flex;
	align-items: center;
	height: 100upx;
	padding: 0 40upx;
	margin-bottom: 30upx;
	background: #fff;
	border-radius: 50upx;
	box-shadow: 2upx 2upx 2upx #dddcd5;
	.icon {
		width: 30upx;
		height: 30upx;
	}
	input {
		flex: 1;
		padding: 0 20upx;
	}
	.clear {
		font-size: 40upx;
	}
	.sms-btn {
		padding: 10upx;
		line-height: 1;
		font-size: 24upx;
		color: $main-color;
		border: 1px solid $main-color;
		border-radius: 50upx;
		background: none;
		&:after {
			border: none;
		}
	}
}
</style>
