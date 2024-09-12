<script setup>
import { ref, watch, computed, watchEffect, onMounted, onUnmounted, toValue } from 'vue';

defineOptions({
	name: ''
});
const props = defineProps({});
</script>
<template>
	<view class="input-demo">
		<loong-input></loong-input>
	</view>
</template>
<style lang="scss">
.input-demo {
}
</style>
