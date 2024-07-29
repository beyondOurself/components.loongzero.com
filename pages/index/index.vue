<script setup>
import { ref, watch, computed, watchEffect, onMounted, onUnmounted, toValue, onRenderTracked, onRenderTriggered, onUpdated } from 'vue';

import LoongSub from './sub.vue';

defineOptions({
	name: ''
});
const props = defineProps({});

const ref1 = ref(0);
const value2 = {
	name: 'value2'
};
// console.log('toValue',toValue(value))

onRenderTracked((Tracked) => {
	console.log('onRenderTracked', Tracked);
});

onRenderTriggered((Triggered) => {
	console.log('onRenderTriggered', Triggered);
});

onMounted(() => {
	console.log('onMounted', '初始化渲染完成');
});

onUpdated(() => {
	console.log('onUpdated', '重新渲染');
});

onUnmounted(() => {
	console.log('onUnmounted', '组件被卸载');
});

const test = () => {
	ref1.value += 1;
};

const subComStatus = ref(true)
const test2 = () => {
	 
	 subComStatus.value = false
	 
 }

</script>
<template>
	<view class="loong-test">
		{{ ref1 }}
		<!-- {{value2.name}} -->

		<loong-sub v-if="subComStatus"></loong-sub>
		<button @click="test">测试</button>
		<button @click="test2">卸载子组件</button>
	</view>
</template>
<style lang="scss">
.loong-test {
}
</style>
