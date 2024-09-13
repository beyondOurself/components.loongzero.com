<!--
 * @Description:  image 公共基础组件
 * @Author: canlong.shen 
 * @Date: 2024-06-20 14:41:19
 * @LastEditors: canlong.shen 
 * @LastEditTime: 2024-09-13 11:55:31
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
		default: '48rpx'
	},
	height: {
		type: [String],
		default: ''
	}
});
const { imagePrefix = '' } = inject('loong_components_config');
const srcGet = computed(() => {
	const { prefix = '', src = '' } = props;

	if (!src) {
		return '';
	}

	if (src.startsWith('https')) {
		return src;
	}

	let assetsUrl = src;

	if (!src.startsWith('/')) {
		assetsUrl = `/${assetsUrl}`;
	}

	if (!src.endsWith('/')) {
		assetsUrl = `${assetsUrl}.svg `;
	}
	return `${prefix || imagePrefix}${src}`;
});

const isNumber = (str) => {
	const numberRegex = /^\d+$/;
	return numberRegex.test(str);
};

const imageStylerGet = computed(() => {
	const { width = '', height = '' } = props;
	const styler = {};

	if (isNumber(width)) {
		styler.width = `${width}rpx`;
		if (!height) {
			styler.height = `${width}rpx`;
		}
	} else {
		styler.width = width;
		styler.height = height;
		if (!height) {
			styler.height = width;
		}
	}

	if (height && isNumber(height)) {
		styler.height = `${height}rpx`;
	}
	return styler;
});
</script>

<template>
	<view class="loong-icon">
		<image mode="heightFix" :style="imageStylerGet" :src="srcGet"></image>
	</view>
</template>
<style lang="scss" scoped>
.loong-icon {
	display: inline-block;
}
</style>
