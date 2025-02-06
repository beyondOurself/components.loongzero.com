<script setup>
import { ref, watch, computed, watchEffect, onMounted, onUnmounted, toValue } from 'vue';

defineOptions({
	name: 'LoongPickerV2'
});
const props = defineProps({});

const date = new Date();
const years = ref([]);
const year = date.getFullYear();
const months = ref([]);
const month = date.getMonth() + 1;
const days = ref([]);
const day = date.getDate();
for (let i = 1990; i <= date.getFullYear(); i++) {
	years.value.push(i);
}
for (let i = 1; i <= 12; i++) {
	months.value.push(i);
}
for (let i = 1; i <= 31; i++) {
	days.value.push(i);
}

const bindChange = (e) => {
	const val = e.detail.value;
	console.log('val', val);
};

const value = ref([9999, month - 1, day - 1]);
const visible = ref(true);
const indicatorStyle = ref(`height: 50px; color:red;`);
</script>
<template>
	<view class="loong-picker-v2">
		<view class="uni-padding-wrap">
			<view class="uni-title">日期：{{ year }}年{{ month }}月{{ day }}日</view>
		</view>
		<picker-view v-if="visible" immediate-change indicator-class="indicator_class" :indicator-style="indicatorStyle" :value="value" @change="bindChange" class="picker-view">
			<picker-view-column>
				<view class="item" v-for="(item, index) in years" :key="index">{{ item }}年</view>
			</picker-view-column>
			<picker-view-column>
				<view class="item" v-for="(item, index) in months" :key="index">{{ item }}月</view>
			</picker-view-column>
			<picker-view-column>
				<view class="item" v-for="(item, index) in days" :key="index">{{ item }}日</view>
			</picker-view-column>
		</picker-view>

		<!-- S 弹出 -->
		 <view class="">
		 	
		 </view>
		<!-- E 弹出 -->
	</view>
</template>
<style lang="scss">
.picker-view {
	width: 750rpx;
	height: 600rpx;
	margin-top: 20rpx;
}
.item {
	line-height: 100rpx;
	text-align: center;
}

</style>
