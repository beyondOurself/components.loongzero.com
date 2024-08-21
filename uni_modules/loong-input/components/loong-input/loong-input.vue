<script setup>
import { ref, watch, computed, watchEffect, onMounted, onUnmounted } from 'vue';

defineOptions({
	name: 'LoongInput'
});
const props = defineProps({});

const inputValue = defineModel({ type: String, default: '' });
</script>
<template>
	<view class="loong-input">
		<input v-model="inputValue" class="input_body" placeholder-class="input_placeholder" name="input" placeholder="这是一个输入框222" />
	</view>
</template>
<style lang="scss">
$loong-form-font-size: 30rpx !default;
$loong-form-input-height: 86rpx !default;

.loong-input {
	.input_body {
		height: $loong-form-input-height;
	}
	.input_placeholder {
		font-size: $loong-form-font-size;
		color: #cecece;
	}
}
</style>
