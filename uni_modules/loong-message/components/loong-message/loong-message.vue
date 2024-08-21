<!--
 * @Description: 消息提示 
 * @Author: canlong.shen 
 * @Date: 2024-08-21 10:57:45
 * @LastEditors: canlong.shen 
 * @LastEditTime: 2024-08-21 16:10:05
 * @FilePath: /components.loongzero.com/uni_modules/loong-form-message/components/loong-form-message/loong-form-message.vue
-->

<script setup>
import { ref, watch, computed, watchEffect, onMounted, onUnmounted, toValue } from 'vue';

defineOptions({
	name: 'LoongFormMessage'
});
const props = defineProps({
	type: {
		type: [String],
		default: 'success',
		validator: (v) => ['success', 'error', 'warning', 'info'].includes(v)
	},
	duration:{
		type:[Number],
		default:2000
	}
});

// ---> S 打开 <---

const isOpen = ref(false);
let openTimeOutId = null;
const message = ref('');
const open = (msg = '') => {
	console.log('msg', '>>>', msg);
	message.value = msg;
	isOpen.value = true;

	if (openTimeOutId) {
		clearTimeout(openTimeOutId);
	}
	openTimeOutId = setTimeout(() => {
		isOpen.value = false;
	}, props.duration);
	console.log('isOpen', '>>>', isOpen);
};

const messageStyle = computed(() => {
	const isOpenValue = toValue(isOpen);
	const styler = {};

	styler['top'] = isOpenValue ? '0' : '-50%';

	return styler;
});
// ---> E 打开 <---
// ---> S 关闭 <---
const close = () => {
	isOpen.value = false;
};
// ---> E 关闭 <---

// ---> S 类型 <---
const messageClass = computed(() => {
	const { type = '' } = props;

	return [
		{
			'form_message--success': type == 'success',
			'form_message--error': type == 'error',
			'form_message--warning': type == 'warning',
			'form_message--info': type == 'info'
		}
	];
});
// ---> E 类型 <---

defineExpose({ open ,close});
</script>
<template>
	<view class="loong-form-message">
		<view class="form_message" :class="messageClass" :style="messageStyle" @click="close">
			<text>{{ message }}</text>
		</view>
	</view>
</template>
<style lang="scss">
$loong-color-message-success: #67c23a !default;
$loong-color-message-bg-success: #f4ffef !default;
$loong-color-message-error: #f56c6c !default;
$loong-color-message-bg-error: #fff4f4 !default;
$loong-color-message-warning: #f1a637 !default;
$loong-color-message-bg-warning: #fff6e8 !default;
$loong-color-message-info: #999999 !default;
$loong-color-message-bg-info: #f4f4f4 !default;
$loong-message-size: 24rpx !default;

.loong-form-message {
	.form_message {
		position: fixed;
		left: 0;
		right: 0;
		text-align: center;
		padding: $loong-message-size;
		font-size: $loong-message-size;
		z-index: 99999;
		top: -50%;
		left: 0;
		transition: top 0.5s;
	}
	.form_message--success {
		color: $loong-color-message-success;
		background-color: $loong-color-message-bg-success;
	}
	.form_message--error {
		color: $loong-color-message-error;
		background-color: $loong-color-message-bg-error;
	}
	.form_message--warning {
		color: $loong-color-message-warning;
		background-color: $loong-color-message-bg-warning;
	}
	.form_message--info {
		color: $loong-color-message-info;
		background-color: $loong-color-message-bg-info;
	}
	.form_message--visible {
		top: 0;
	}
}
</style>
