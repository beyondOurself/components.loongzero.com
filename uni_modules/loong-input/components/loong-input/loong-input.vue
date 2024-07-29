<script setup>
import { ref, watch, computed, watchEffect, onMounted, onUnmounted } from 'vue';

defineOptions({
	name: 'LoongInput'
});
const props = defineProps({});
</script>
<template>
	<view class="loong-input">
		<input class="input_body" placeholder-class="input_placeholder" name="input" placeholder="这是一个输入框222" />
	</view>
</template>
<style lang="scss">
$loong-form-font-size: 30rpx !default;
$loong-form-input-height: 86rpx !default;

.loong-input {
	 height: inherit;
	.input_body {
		height: $loong-form-input-height;
	}
	.input_placeholder {
		font-size: $loong-form-font-size;
		color: #cecece;
	}
}
</style>
