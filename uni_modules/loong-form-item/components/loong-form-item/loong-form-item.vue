<script setup>
import { ref, watch, computed, onMounted, onUnmounted, inject, toValue } from 'vue';

defineOptions({
	name: 'LoongFormItem'
});
const props = defineProps({
	label: {
		type: [String],
		default: 'label'
	},

	labelWidth: {
		type: [String, Number],
		default: ''
	},
	prop: {
		type: [String],
		default: ''
	},
	required: {
		type: [Boolean],
		default: false
	},
	rules: {
		type: [Array],
		default: []
	}
});

const maxLabelWidth = inject('form__max_label_width');

const labelStyler = computed(() => {
	const styler = {};
	const { labelWidth = '' } = props;

	if (labelWidth) {
		styler.width = `${labelWidth}rpx`;
	}
	const maxLableWidthValue = toValue(maxLabelWidth);

	if (maxLableWidthValue) {
		styler.width = `${maxLableWidthValue}px`;
	}
	return styler;
});
const formMessage = inject('form__message');

watch(formMessage, (message = []) => {
	console.log('message', message);
	if (message && message.length) {
		const findMessage = message.find((fi) => fi.field === props.prop);

		console.log('findMessage', findMessage);
		if (findMessage) {
			const { message = '', field = '' } = findMessage;
			if (message === `${field} is required`) {
				errorMessage.value = `${props.label}不能为空`;
			} else {
				errorMessage.value = message;
			}

			uni.showToast({
				title: errorMessage.value
			});
		} else {
			errorMessage.value = '';
		}
	}
});

const formRules = inject('form__rules');
const formRulesValue = toValue(formRules);
if (formRulesValue && props.rules && props.prop) {
	formRules.value[props.prop] = props.rules;
}

// S >>> 错误提示  <<<
const errorMessage = ref('');
const isRequired = computed(() => {
	const { rules = [], required: propRequired = false } = props;
	const rulesRequired = rules.find((fi) => fi.required);
	return rulesRequired || propRequired;
});

// E >>> 错误提示  <<<

// ---> S 名称映射 <---
onMounted(() => {
	const formNameMap = inject('form__name_map');
	if (props.label && props.prop) {
		formNameMap[props.prop] = props.label;
	}
});
// ---> E 名称映射 <---
</script>
<template>
	<view class="loong-form-item">
		<view class="form_item_main">
			<view class="form_item_label" :style="labelStyler">
				<slot name="label" style="">
					<text>{{ label }}</text>
				</slot>
				<span class="item_label_required" v-show="isRequired">*</span>
			</view>
			<view class="form_item_content">
				<slot></slot>
				<view class="item_content_error" v-show="errorMessage">
					{{ errorMessage }}
				</view>
			</view>
		</view>
	</view>
</template>
<style lang="scss">
$loong-form-label-color: #333333 !default;
$loong-form-label-gap: 16rpx !default;
$loong-form-font-size: 30rpx !default;
$loong-form-item-height: 120rpx !default;
.loong-form-item {
	.form_item_main {
		height: $loong-form-item-height;
		display: flex;
		align-items: center;
		font-size: $loong-form-font-size;
		box-sizing: border-box;
		border-bottom: 2rpx solid #ececec;
	}

	.form_item_label {
		color: $loong-form-label-color;
		margin-right: $loong-form-label-gap;
		display: flex;
	}

	.form_item_content {
		flex: 1;
		height: $loong-form-item-height;
		position: relative;
	}

	.loong-input,
	.input_body {
		height: $loong-form-item-height;
	}

	.item_label_required {
		color: #dd524d;
		font-weight: 700;
	}
	.item_content_error {
		position: absolute;
		bottom: 0;
		color: #f56c6c;
		font-size: 22rpx;
	}
}
</style>
