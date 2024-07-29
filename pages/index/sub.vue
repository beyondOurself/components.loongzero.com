<script setup>
import { ref, watch, computed, watchEffect, onMounted, onUnmounted } from 'vue';

defineOptions({
	name: ''
});
const props = defineProps({});

onMounted(() => {
	console.log('子组件初始化渲染');
});

onUnmounted(() => {
	console.log('子组件被卸载了');
});
</script>
<template>
	<view class="loong-sub">这是子组件</view>
</template>
<style lang="scss">
.loong-sub {
}
</style>
