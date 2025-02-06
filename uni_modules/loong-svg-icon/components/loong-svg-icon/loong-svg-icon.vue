<!--
 * @Description:  显示svg图标
 * @Author: canlong.shen 
 * @Date: 2025-01-20 17:08:07
 * @LastEditors: canlong.shen 
 * @LastEditTime: 2025-01-20 17:14:45
 * @FilePath: /components.loongzero.com/uni_modules/loong-svg-icon/components/loong-svg-icon/loong-svg-icon.vue
-->

<script setup>
import { ref, watch, computed, watchEffect, onMounted, onUnmounted, toValue } from 'vue';

defineOptions({
	name: 'LoongSvgIcon'
});
const props = defineProps({
	src:{
		type:[String],
		default:''
	},
	width: {
		type: [String, Number],
		default: '40'
	}
});

const svgStyleGet = computed(() => {
	const { width = 0 } = props;

	return {
		width: `${width}rpx`,
		height: `${width}rpx`
	};
});
</script>
<template>
	<image class="loong-svg-icon" :style="svgStyleGet" :src="src" mode=""></image>
</template>
<style lang="scss"></style>
