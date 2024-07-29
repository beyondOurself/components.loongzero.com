<script setup>
import { ref, watch, computed, watchEffect, onMounted, onUnmounted, getCurrentInstance, provide } from 'vue';
const { proxy } = getCurrentInstance();
defineOptions({
	name: 'LoongForm'
});
const props = defineProps({
	autoLabelWidth: {
		type: [Boolean],
		default: true
	}
});

// S >>> 表单 form  <<<

const formSubmit = (e) => {
	console.log('formSubmit', e);
};

const formReset = () => {};

// E >>> 表单 form  <<<
const provideMaxLabelWidth = ref(0)
provide('max_label_width', provideMaxLabelWidth);
onMounted(() => {
	if (props.autoLabelWidth) {
		const query = uni.createSelectorQuery().in(proxy);
		query
			.selectAll('.form_item_label')
			.boundingClientRect((nodeList = []) => {
				if (nodeList && nodeList.length) {
					const widthList = nodeList.map((mi) => mi.width);
					const maxWidth = Math.max(...widthList);
					provideMaxLabelWidth.value = maxWidth
				}
			})
			.exec((nodes) => {
				console.log('nodes', '>>>', nodes);
			});
	}
});
</script>
<template>
	<view class="loong-form">
		<form @submit="formSubmit" @reset="formReset">
			<slot></slot>
			<button form-type="submit">Submit</button>
			<button type="default" form-type="reset">Reset</button>
		</form>
	</view>
</template>
<style lang="scss">
.loong-form {
}
</style>