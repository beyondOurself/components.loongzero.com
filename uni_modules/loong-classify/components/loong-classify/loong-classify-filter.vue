<script setup>
import { ref, watch, computed, watchEffect, onMounted, onUnmounted, toValue } from 'vue';

defineOptions({
	name: 'LoongClassifyFilter'
});

const props = defineProps({
	options: {
		type: [Array],
		default: () => [
			{
				title: '品牌',
				hot: true,
				tags: [
					{
						label: '品牌1',
						value: 'brand',
						image: 'https://env-00jxha7c81fs.normal.cloudstatic.cn/happy/search/classify/demo/%E4%B8%8B%E8%BD%BD%20%281%29.png'
					},
					{
						label: '品牌2',
						value: 'brand',
						image: 'https://env-00jxha7c81fs.normal.cloudstatic.cn/happy/search/classify/demo/%E4%B8%8B%E8%BD%BD%20%282%29.png'
					},
					{
						label: '品牌3',
						value: 'brand',
						image: 'https://env-00jxha7c81fs.normal.cloudstatic.cn/happy/search/classify/demo/%E4%B8%8B%E8%BD%BD%20%283%29.png'
					},
					{
						label: '品牌4',
						value: 'brand',
						image: 'https://env-00jxha7c81fs.normal.cloudstatic.cn/happy/search/classify/demo/%E4%B8%8B%E8%BD%BD%20%283%29.png'
					}
				]
			},
			{
				title: '颜色',
				multiple: true,
				tags: [
					{
						label: '红色',
						value: 'red'
					},
					{
						label: '黄色',
						value: 'yellow'
					},
					{
						label: '蓝色',
						value: 'blue'
					},
					{
						label: '绿色',
						value: 'green'
					}
				]
			},
			{
				title: '尺寸',
				multiple: true,
				tags: [
					{
						label: '特大码',
						value: 'XXL '
					},
					{
						label: '加大码',
						value: 'XL'
					},
					{
						label: '大码',
						value: 'L'
					},
					{
						label: '中码',
						value: 'M'
					},
					{
						label: '小码',
						value: 'S'
					}
				]
			}
		]
	}
});

const trimBrandText = (label = '') => {
	return label && label.length > 4 ? `${label.substring(0, 3)}..` : label;
};

// ---> S 热门搜索 <---

const hotList = ref([]);

watchEffect(() => {
	const options = props.options;
	const findHot = options.find((fi) => fi.hot);
	console.log('findHotList', findHot);
	if (findHot && findHot.tags) {
		hotList.value = findHot.tags.slice(0, 4);
	}
});

// ---> E 热门搜索 <---

// ---> S 打开选择过滤器 <---

const isOpenPopup = ref(false);
const switchFilters = () => {
	isOpenPopup.value = !isOpenPopup.value;
};

// ---> E 打开选择过滤器 <---
</script>
<template>
	<view class="loong-classify-filter">
		<view class="filter_brand_wrap">
			<view class="filter_brand_items">
				<template v-for="(item, index) in hotList">
					<view class="brand_item">
						<view class="brand_item_cover">
							<image v-if="item.image" mode="scaleToFill" style="width: 100%; height: 100%" :src="item.image" alt="" srcset="" />
						</view>
						<view class="brand_item_text">
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
		<view class="filter_popup" :class="{ 'filter_popup--actived': isOpenPopup }"></view>
		<!-- E 选择条件弹窗 -->
	</view>
</template>

<style lang="scss" scoped>
@import '~@/uni_modules/loong-scss/index.scss';

.loong-classify {
	@include base-component;
}
.filter_brand_wrap {
	display: flex;
	height: 160rpx;
	padding: 0 16rpx;
	display: flex;
	align-items: center;
}
.filter_brand_items {
	display: flex;
	align-items: center;
	justify-content: space-between;
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
	width: 50%;
	background-color: red;
	z-index: 2;
	top: 0;
	right: -400rpx;
	transition: right 0.3s ease; /* 动画效果 */
}

.filter_popup--actived {
	right: 0;
}
</style>
