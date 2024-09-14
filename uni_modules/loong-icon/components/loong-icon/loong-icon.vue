<!--
 * @Description:  image 公共基础组件
 * @Author: canlong.shen 
 * @Date: 2024-06-20 14:41:19
 * @LastEditors: canlong.shen 
 * @LastEditTime: 2024-09-14 16:50:37
 * @FilePath: /components.loongzero.com/uni_modules/loong-icon/components/loong-icon/loong-icon.vue
-->

<script setup>
import { computed, ref, provide, inject } from 'vue';

defineOptions({
	name: 'LoongIcon'
});

const props = defineProps({
	src: {
		type: [String],
		default: ''
	},
	prefix: {
		type: [String],
		default: ''
	},
	width: {
		type: [String],
		default: '48'
	},
	height: {
		type: [String],
		default: ''
	},
	prefix: {
		type: [String],
		default: 'imagePrefix'
	}
});

// ---> S 图片地址 <---

const styleGet = computed(() => {
	const styler = {};
	const { prefix = '', src = '', width = '', height = '' } = props;
	const { [prefix]: srcPrefix = '' } = inject('loong_components_config') || {};
	let imgSrc = src;
	if (srcPrefix) {
		imgSrc = `${srcPrefix}${imgSrc}`;
	}

	if (imgSrc) {
		styler.backgroundImage = `url(${imgSrc})`;
	}

	if (width) {
		styler.width = `${width}rpx`;
	}

	if (height || width) {
		styler.height = `${height || width}rpx`;
	}
	

	return styler;
});

// ---> E 图片地址 <---
</script>

<template>
	<view class="loong-icon" :style="styleGet"></view>
</template>
<style lang="scss" scoped>
.loong-icon {
	display: inline-block;
	background-size: cover;
	background-repeat: no-repeat; /* 防止背景图片重复 */
	background-position: center; /* 背景图片居中 */
}
</style>