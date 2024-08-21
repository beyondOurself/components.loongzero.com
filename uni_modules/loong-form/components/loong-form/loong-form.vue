<script setup>
import { ref, watch, computed, watchEffect, onMounted, onUnmounted, getCurrentInstance, provide, shallowRef, toValue, toRaw, isProxy } from 'vue';

import Schema from './utils/validator.js';
import { deepCopy } from './utils/common.js';

const instance = getCurrentInstance();
defineOptions({
	name: 'LoongForm'
});
const props = defineProps({
	model: {
		type: [Object],
		default: null
	},
	labelWidth: {
		type: [Number],
		default: 100
	}
});

// S >>> 表单 form  <<<

const formSubmit = (e) => {
	console.log('formSubmit', e);

	validate();
};

const formReset = () => {};

// E >>> 表单 form  <<<

// ---> S 名称映射 <---
const provideNamesMap = ref({});
provide('form__name_map', provideNamesMap);
// ---> E 名称映射 <---

// S >>> 自动设置label 宽度  <<<
const provideMaxLabelWidth = ref(props.labelWidth);

const loong_form_ref = ref(null);
provide('form__max_label_width', provideMaxLabelWidth);

onMounted(() => {});
// E >>> 自动设置label 宽度  <<<

// S >>> 表单校验规则  <<<
const formMessage = shallowRef({});
provide('form__message', formMessage);

const formRules = shallowRef({});
provide('form__rules', formRules);

const LOONG_FORM_MESSAGE_REF = ref(null);

const validate = (call = () => {}) => {
	const { model = {} } = props;
	const formRulesValue = toValue(formRules);
	const modelValue = toValue(model);
	const validator = new Schema(formRulesValue);

	return new Promise((resolve = () => {}) => {
		validator.validate(modelValue, (errors, fields) => {
			if (errors) {
				formMessage.value = errors;
				if (errors && errors.length) {
					const { message = '', field = '' } = errors[0] || {};
					let errorMessage = message;
					if (message.includes('is required')) {
						const mapLabel = provideNamesMap[field];
						if (mapLabel) {
							errorMessage = `${mapLabel}不能为空`;
						}
					}
					LOONG_FORM_MESSAGE_REF.value.open(errorMessage);
				}
				resolve(null);
				return;
			}

			if (isProxy(modelValue)) {
				const bindRawValue = deepCopy(toRaw(modelValue));
				call(bindRawValue);
				resolve(bindRawValue);
			} else {
				const bindValue = deepCopy(modelValue);
				call(deepCopy(bindValue));
			}
		});
	});
};

// E >>> 表单校验规则  <<<

defineExpose({ validate });
</script>
<template>
	<view class="loong-form">
		<!-- S 消息弹窗 -->
		<loong-form-message ref="LOONG_FORM_MESSAGE_REF" type="error"></loong-form-message>
		<!-- E 消息弹窗 -->
		<form @submit="formSubmit" @reset="formReset" ref="loong_form_ref">
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
