<script setup>
import { ref, watch, computed, watchEffect, onMounted, onUnmounted } from 'vue';

defineOptions({
	name: 'DemoCheckbox'
});

const props = defineProps({});

const modelArr = ref(['1']);
const options = ref([
	{
		label: 'label',
		value: 1,
		disabled: true
	},
	{
		label: 'label',
		value: 2
	},
	{
		label: 'label',
		value: 3
	}
]);
const options2 = ref([
	{
		label: 'label',
		value: [0, 1]
	}
]);

const modelVal = ref('1');

const change = (value = [], options = []) => {
	console.log('value', '>>>', value);
	console.log('options', '>>>', options);
};
</script>
<template>
	<view class="demo-checkbox">
		<view class="">多选框</view>
		<loong-checkbox :options="options" v-model="modelArr" @change="change"></loong-checkbox>
		<view class="">单选框</view>
		<loong-checkbox  spacing='60' :options="options2" v-model="modelVal" @change="change"></loong-checkbox>
		<!-- <loong-radio :options="options"></loong-radio> -->
	</view>
</template>
<style lang="scss">
.demo-checkbox {
	padding: 16rpx;
}
</style>
