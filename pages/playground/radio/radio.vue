<script setup>
import { ref, watch, computed, watchEffect, onMounted, onUnmounted } from 'vue';

defineOptions({
	name: ''
});

const props = defineProps({});

// ---> S 值绑定 <---
const curValue = ref(1);
watch(curValue, (value) => {
	console.log('curValue', '>>>', value);
});
// ---> E 值绑定 <---
// ---> S 选择项 <---

const options = ref([
	{
		label: '测试1',
		value: 1,
		disabled: true
	},
	{
		label: '测试2',
		value: 2,
	},
	{
		label: '测试3',
		value: 3
	}
]);

// ---> E 选择项 <---
</script>
<template>
	<view class="data-radio">
		<loong-radio v-model="curValue" :options="options"></loong-radio>
	</view>
</template>
<style lang="scss">
.data-radio {
}
</style>
