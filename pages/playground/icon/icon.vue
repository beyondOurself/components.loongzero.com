<script setup>
import { ref, watch, computed, watchEffect, onMounted, onUnmounted, toValue } from 'vue';

defineOptions({
	name: 'icon'
});
const props = defineProps({});
</script>
<template>
	<view class="icon">
		<loong-icon width="540" height="340" src="/user/login-pwd-decorative.svg"></loong-icon>
	</view>
</template>
<style lang="scss" scoped>
.icon {
}
</style>
