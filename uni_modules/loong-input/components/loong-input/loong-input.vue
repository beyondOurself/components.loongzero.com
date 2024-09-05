<script setup>
import { ref, watch, computed, watchEffect, onMounted, onUnmounted } from "vue";

defineOptions({
  name: "LoongInput",
});
const props = defineProps({
  isFormItem: {
    type: [Boolean],
    default: false,
  },
});

const inputValue = defineModel({ type: String, default: "" });

// ---> S placeHolder <---
const placeholderStype = computed(() => {
  return "text-align:right;";
});
// ---> E placeHolder <---

// ---> S input <---
const inputClass = computed(() => {
  const { isFormItem = false } = props;
  return [
    {
      input_body_form_item: isFormItem,
    },
  ];
});
// ---> E input <---
</script>
<template>
  <view class="loong-input">
    <input
      v-model="inputValue"
      class="input_body"
      :class="inputClass"
      placeholder-class="input_placeholder"
      name="input"
      placeholder="这是一个输入框222"
    />
  </view>
</template>
<style lang="scss" scoped>
@import "~@/uni_modules/loong-scss/index.scss";

$loong-form-font-size: $loong-main-color !default;
$loong-form-input-height: 86rpx !default;

.loong-input {
  @include base-component;
}

.input_body {
  height: $loong-form-input-height;
}
.input_placeholder {
  font-size: $loong-form-font-size;
  color: #cecece;
}
.input_body_form_item {
  text-align: right;
}
</style>
