<!--
 * @Description: 
 * @Author: canlong.shen 
 * @Date: 2024-08-21 10:29:38
 * @LastEditors: canlong.shen 
 * @LastEditTime: 2024-08-23 11:27:48
 * @FilePath: /components.loongzero.com/pages/playground/data-form/data-form.vue
-->
<script setup>
import { onMounted, ref } from 'vue';
import { COMPONENT_TYPE_ENUM } from '@/uni_modules/loong-utils/js_sdk/enum.js';
const props = defineProps({});

const labelWidth = ref(100);

const formModel = ref({});

const FORM_REF = ref(null);

onMounted(() => {
	console.log('FORM_REF.value', '>>>', FORM_REF.value);
});

const validation = () => {
	FORM_REF.value.validate((values) => {
		console.log('values', '>>>', values);
	});
};

const reset = () => {
	FORM_REF.value.reset();
};

const options = ref([
	{
		label: 'label',
		prop: 'prop1',
		type: COMPONENT_TYPE_ENUM.INPUT
	},
	{
		label: 'label2',
		prop: 'prop2',
		type: COMPONENT_TYPE_ENUM.RADIO,
		range: [
			{
				label: 'radio1',
				value: 1
			},
			{
				label: 'radio2',
				value: 2
			},
			{
				label: 'radio3',
				value: 3
			},
		]
	}
]);
const model = ref({});

const test = () => {
	console.log('COMPONENT_TYPE_ENUM', '>>>', COMPONENT_TYPE_ENUM.INPUT);
};
</script>
<template>
	<view class="form">
		<button type="default" @click="test">测试</button>
		<loong-data-form :model="model" :options="options"></loong-data-form>
	</view>
</template>
<style lang="scss" scoped></style>
<style lang="scss"></style>