<!--
 * @Description: 
 * @Author: canlong.shen 
 * @Date: 2024-08-21 10:29:38
 * @LastEditors: canlong.shen
 * @LastEditTime: 2024-09-11 09:52:18
 * @FilePath: \components.loongzero.com\pages\playground\form\form.vue
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
		type: COMPONENT_TYPE_ENUM.RADIO
	}
]);
const model = ref({});

const test = () => {
	console.log('COMPONENT_TYPE_ENUM', '>>>', COMPONENT_TYPE_ENUM.INPUT);
};
</script>
<template>
	<view class="form">
		<!-- <loong-form :model="formModel" ref="FORM_REF">
			<loong-form-item
				label="姓名"
				prop="label01"
				:rules="[
					{
						type: 'string',
						required: true,
					}
				]"
			>
				<loong-input v-model="formModel.label01"></loong-input>
			</loong-form-item>
			<loong-form-item
				label="年龄"
				prop="label02"
				:rules="[
					{
						type: 'string',
						required: true,
						message: '不能为空'
					}
				]"
			>
				<loong-input v-model="formModel.label02"></loong-input>
			</loong-form-item>
			<loong-form-item label="家庭住址">
				<loong-input  v-model="formModel.label03"></loong-input>
			</loong-form-item>
		</loong-form>
	 <button type="default" @click="validation">校验</button>
	 <button type="default" @click="reset">重置</button> -->

		<button type="default" @click="test">测试</button>

		<loong-data-form :model="model" :options="options"></loong-data-form>
	</view>
</template>
<style lang="scss" scoped></style>
<style lang="scss"></style>