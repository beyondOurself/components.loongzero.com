<script setup>
import { ref, watch, computed, watchEffect, onMounted, onUnmounted } from 'vue';

defineOptions({
	name: ''
});

const props = defineProps({});

// ---> S 值绑定 <---
const curValue = ref('');
watch(curValue, (value) => {
	console.log('curValue', '>>>', value);
});
// ---> E 值绑定 <---
// ---> S 选择项 <---

const options = ref([
	{
		label: '测试1',
		value: 1,
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
