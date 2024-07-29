<script setup>
import { ref, watch, computed, watchEffect, onMounted, onUnmounted, inject , toValue } from 'vue';

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
	}
});

const maxLabelWidth = inject('max_label_width');

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
	console.log('执行了~', styler);
	return styler;
});
</script>
<template>
	<view class="loong-form-item">
		<view class="form_item_main">
			<view class="form_item_label" :style="labelStyler">
				<slot name="label">
					<text>{{ label }}</text>
				</slot>
			</view>
			<view class="form_item_content">
				<slot></slot>
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
	}

	.form_item_content {
		flex: 1;
		height: $loong-form-item-height;
	}

	.input_body {
		height: $loong-form-item-height;
	}
}
</style>
