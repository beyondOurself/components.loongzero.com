<!--
 * @Description: 滑动选择器
 * @Author: canlong.shen 
 * @Date: 2024-08-26 18:13:42
 * @LastEditors: canlong.shen
 * @LastEditTime: 2024-08-26 18:56:39
 * @FilePath: \components.loongzero.com\uni_modules\loong-slider\components\loong-slider\loong-slider.vue
-->

<script setup>
import { ref, watch, computed, watchEffect, onMounted, onUnmounted, toValue } from "vue";

defineOptions({
  name: "LoongSlider",
});

const emits = defineEmits(["change"]);

const props = defineProps({
  min: {
    type: [Number, String],
    default: 0,
  },
  max: {
    type: [Number, String],
    default: 100,
  },
  step: {
    type: [Number, String],
    default: 1,
  },

  disabled: {
    type: [Boolean],
    default: false,
  },
  activeColor: {
    type: String,
    default: "#2979ff", // 滑块左侧已选择部分的线条颜色
  },
  backgroundColor: {
    type: String,
    default: "", // 滑块右侧背景条的颜色
  },
  blockSize: {
    type: [Number, String],
    default: 20, // 滑块的大小，取值范围为 12 - 28
  },
  blockColor: {
    type: [String],
    default: "#fff", // 滑块颜色
  },
  showValue: {
    type: [Boolean],
    default: true, // 是否显示当前值
  },
});

// ---> S 值绑定 <---

const modelValue = defineModel({ type: [String, Number], default: 0 });
const change = (event = {}) => {
  const { detail: { value = "" } = "" } = event;
  modelValue.value = value;
  emits("change", value);
};

// ---> E 值绑定 <---

// ---> S 是否显示值 <---

const showValue = computed(() => {
  return props.showValue;
});

// ---> E 是否显示值 <---
</script>
<template>
  <view class="loong-slider">
    <slider
      :value="modelValue"
      :show-value="showValue"
      :min="min"
      :max="max"
      :step="step"
      :disabled="disabled"
      :activeColor="activeColor"
      :backgroundColor="backgroundColor"
      :block-size="blockSize"
      :block-color="blockColor"
      @change="change"
    />
  </view>
</template>
<style lang="scss" scoped>
@import "~@/uni_modules/loong-scss/index.scss";

.loong-slider {
  @include base-component;
}
</style>
