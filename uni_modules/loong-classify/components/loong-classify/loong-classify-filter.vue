<script setup>
import { ref, watch, computed, watchEffect, onMounted, onUnmounted, toValue } from 'vue';

defineOptions({
	name: 'LoongClassifyFilter'
});

const props = defineProps({
	options: {
		type: [Array],
		default: () => []
	}
});

const emits = defineEmits(['change']);

const trimBrandText = (label = '') => {
	return label && label.length > 4 ? `${label.substring(0, 3)}..` : label;
};

// ---> S 热门搜索 <---

const hotList = ref([]);

watchEffect(() => {
	const options = props.options;
	options.forEach((fei) => {
		if (fei.tags) {
			const hotTagList = fei.tags.filter((fli) => fli.hot);
			hotList.value.push(...hotTagList);
		}
	});
});

// ---> E 热门搜索 <---

// ---> S 打开选择过滤器 <---

const isOpenPopup = ref(false);
const switchFilters = () => {
	isOpenPopup.value = !isOpenPopup.value;

	if (!isOpenPopup.value) {
		emits('change', cloneObject(selectedTagsData));
	}
};

// ---> E 打开选择过滤器 <---

// ---> S 选择数据 <---
const cloneObject = (oriObject = {}) => {
	return JSON.parse(JSON.stringify(oriObject));
};
let selectedTagsData = [];
const tagItemList = [];
const changeTags = (tags = [], index = 0) => {
	tagItemList[index] = tags;
	selectedTagsData = tagItemList.flat();
	selectedBrandValue.value = '';
};

const selectedBrandValue = ref('');

const handleBrand = (brand = {}) => {
	let tempTagList = [...selectedTagsData]
	
    const brandValue = brand.value || ''
	
	
	if(selectedBrandValue.value !== brandValue){
		selectedBrandValue.value = brandValue ;
		if (!selectedTagsData.find((fi) => fi.value === brandValue)) {
			tempTagList.push(brand);
		}
	}else{
		 selectedBrandValue.value  = ''
	}
	
	
	emits('change', cloneObject(tempTagList));
};

// ---> E 选择数据 <---
</script>
<template>
	<view class="loong-classify-filter">
		<view class="filter_brand_wrap">
			<view class="filter_brand_items">
				<template v-for="(item, index) in hotList">
					<view class="brand_item" :class="{ 'brand_item--actived': selectedBrandValue === item.value }" @click="handleBrand(item)">
						<view class="brand_item_text" :class="{ 'brand_item_text--actived': selectedBrandValue === item.value }">
							<text>{{ trimBrandText(item.label) }}</text>
						</view>
					</view>
				</template>
			</view>

			<view class="filter_brand_list" style="width: 32rpx; height: height:32rpx;">
				<image @click="switchFilters" mode="widthFix" style="width: 100%; height: height:100%" src="./assets/search-filter.svg" alt="" srcset="" />
			</view>
		</view>
		<!-- S 选择条件弹窗 -->
		<view class="filter_popup_mask" v-if="isOpenPopup" @click="switchFilters"></view>
		<view class="filter_popup" :class="{ 'filter_popup--actived': isOpenPopup }">
			<view class="filter_items">
				<view class="filter_item" v-for="(item, index) in options">
					<view class="filter_item_title">
						<text>{{ item.title }}</text>
					</view>
					<view class="filter_item_multiple">
						<loong-checkbox spacing="28" :options="item.tags" @change="changeTags($event, index)"></loong-checkbox>
					</view>
				</view>
			</view>
		</view>
		<!-- E 选择条件弹窗 -->
	</view>
</template>

<style lang="scss" scoped>
@import '~@/uni_modules/loong-scss/index.scss';
$loong-classify-brand-color: $loong-primary !default;
.loong-classify {
	@include base-component;
}
.filter_brand_wrap {
	display: flex;
	height: 80rpx;
	padding: 0 16rpx;
	display: flex;
	align-items: center;
}
.filter_brand_items {
	display: flex;
	align-items: center;
	justify-content: space-around;
	flex: 1;
}
.brand_item_cover {
	height: 100rpx;
	width: 100rpx;
	overflow: hidden;
}
.brand_item_text {
	font-size: 20rpx;
	color: #6b6b6b;
}
.brand_item {
	display: flex;
	flex-direction: column;
	align-items: center;
	background-color:rgb(243.9, 244.2, 244.8);
	border:solid 2rpx rgb(232.8, 233.4, 234.6);
	padding: 4rpx;
	border-radius: 8rpx;
    
}
.filter_popup_mask {
	position: fixed;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	background-color: rgba(0, 0, 0, 0.5);
}
.filter_popup {
	position: fixed;
	height: 100%;
	width: 600rpx;
	background-color: #fff;
	z-index: 2;
	top: 0;
	right: -600rpx;
	transition: right 0.3s ease; /* 动画效果 */
}

.filter_popup--actived {
	right: 0;
}
.filter_items {
	margin: 20rpx;
}
.filter_item {
	margin-bottom: 16rpx;
}
.filter_item_title {
	font-weight: bold;
	font-size: 32rpx;
	margin-bottom: 16rpx;
}
.filter_item_multiple {
	margin-left: 10rpx;
}

.brand_item_text--actived {
	color:  $loong-classify-brand-color;
	
}

.brand_item--actived {
	background-color:  transparentize($loong-classify-brand-color, 0.9); 
	border:  solid 1px  transparentize($loong-classify-brand-color, 0.8);
}
</style>
