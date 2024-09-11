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
  placeholder: {
    type: String,
    default: "请输入",
  },
});

const inputValue = defineModel({ type: String, default: "" });

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

// ---> S placeholder <---

const placeholderGet = computed(() => {
  return props.placeholder || "请输入";
});
// ---> E placeholder <---
</script>
<template>
  <view class="loong-input">
    <input
      v-model="inputValue"
      class="input_body"
      name="input"
      :placeholder="placeholderGet"
      :class="inputClass"
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
.input_body_form_item {
  text-align: right;
}
</style>
