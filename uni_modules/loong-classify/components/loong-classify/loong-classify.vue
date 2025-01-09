<script setup>
import { ref, watch, computed, watchEffect, onMounted, onUnmounted, toValue } from 'vue';
import LoongClassifyFilter from './loong-classify-filter.vue'
defineOptions({
	name: 'LoongClassify'
});
const props = defineProps({
	options: {
		type: [Array],
		default: () => [
			{
				label: '全部商品',
				value: '1'
			},
			{
				label: '分类1',
				value: '1'
			},
			{
				label: '分类2',
				value: '2'
			},
			{
				label: '分类3',
				value: '3'
			},
			{
				label: '分类4',
				value: '4'
			},
			{
				label: '分类5',
				value: '5'
			},
			{
				label: '分类6',
				value: '6'
			}
		]
	}
});

// ---> S 选择分类 <---

const selectedIndex = ref(0);

const getRadiusStyle = (itemIndex = 0) => {
	const selectedIndexVal = selectedIndex.value;

	const preIndex = selectedIndexVal - 1;
	const nextIndex = selectedIndexVal + 1;
	const maxIndex = props.options.length;

	if (preIndex > 0 && preIndex === itemIndex) {
		return {
			'border-bottom-right-radius': '16rpx'
		};
	}

	if (nextIndex < maxIndex && nextIndex === itemIndex) {
		return {
			'border-top-right-radius': '16rpx'
		};
	}

	return {};
};

const selectClasses = (item = {}, index = 0) => {
	const { label = '', value = '' } = item || {};

	selectedIndex.value = index;
};

// ---> E 选择分类 <---
</script>
<template>
	<view class="loong-classify">
		<!-- S 左侧分类区域 -->
		<view class="classes_items">
			<template v-for="(item, index) in options">
				<view class="classes_item" :style="getRadiusStyle(index)" :class="{ 'classes_item--actived': selectedIndex === index }" @click="selectClasses(item, index)">
					<view class="classes_item_line" v-show="selectedIndex === index"></view>
					<text class="classes_item_label" :class="{ 'classes_item_label--actived': selectedIndex === index }" @click="selectClasses(item, index)">{{ item.label }}</text>
				</view>
			</template>

			<view class="classes_item_fill"></view>
		</view>
		<!-- E 左侧分类区域 -->

		<!-- S 内容列表 -->
		<!-- E 内容列表 -->
		<view class="classify_content">
			<!-- S 品牌 -->
			<loong-classify-filter> </loong-classify-filter>
			<!-- E 品牌 -->
		</view>
	</view>
</template>

<style lang="scss" scoped>
@import '~@/uni_modules/loong-scss/index.scss';
$loong-classify-color: $loong-primary !default;
$loong-classify-bgcolor: #f2f2f2 !default;

.loong-classify {
	@include base-component;
	height: 100%;
	background-color: #fff;
	display: flex;
}
.classes_items {
	height: 100%;
	width: 173rpx;
	background-color: #fff;
	display: flex;
	flex-direction: column;
	overflow-y: auto;
}
.classes_item {
	height: 95rpx;
	display: flex;
	align-items: center;
	position: relative;
	background-color: $loong-classify-bgcolor;
}
.classes_item_label {
	margin-left: 23rpx;
	font-weight: 500;
	color: #2d2d2d;
}
.classes_item_line {
	height: 30rpx;
	width: 4rpx;
	background-color: $loong-classify-color;
	border-radius: 8rpx;
}
.classes_item_label--actived {
	color: $loong-classify-color;
}
.classes_item--actived {
	background-color: #fff;
}
.classes_item_fill {
	flex: 1;
	background-color: $loong-classify-bgcolor;
}

.classify_content {
	flex: 1;
	height: 100%;
}

</style>
