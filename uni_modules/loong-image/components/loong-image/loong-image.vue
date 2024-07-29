<!--
 * @Description:  image 公共基础组件
 * @Author: canlong.shen 
 * @Date: 2024-06-20 14:41:19
 * @LastEditors: canlong.shen 
 * @LastEditTime: 2024-07-26 14:54:22
 * @FilePath: /components.loongzero.com/uni_modules/loong-image/components/loong-image/loong-image.vue
-->

<script setup>
import { computed, ref, provide, inject } from 'vue';

const { imagePrefix = '' } = inject('loong_components_config');

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
	<view class="loong-base-image">
		<image mode="heightFix" :style="imageStylerGet" :src="srcGet"></image>
	</view>
</template>
<style lang="scss">

$base-prefix: "loong"
$component-prefix:"image"

.#{$base-prefix}-#{$component-prefix} {
		display: inline-block;
}
</style>
