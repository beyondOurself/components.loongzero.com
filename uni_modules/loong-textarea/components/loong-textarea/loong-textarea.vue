<!--
 * @Description: 多行输入框
 * @Author: canlong.shen 
 * @Date: 2024-08-26 15:00:49
 * @LastEditors: canlong.shen
 * @LastEditTime: 2024-08-26 18:29:54
 * @FilePath: \components.loongzero.com\uni_modules\loong-textarea\components\loong-textarea\loong-textarea.vue
-->

<script setup>
import { ref, watch, computed, watchEffect, onMounted, onUnmounted, toValue } from "vue";

defineOptions({
  name: "LoongTextarea",
});

const emits = defineEmits(["blur", "focus", "change", "input"]);

const props = defineProps({
  maxlength: {
    type: Number,
    default: -1, // 无限制 -1
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  isFormItem: {
    type: Boolean,
    default: false,
  },
  height: {
    type: [String, Number],
    defualt: "",
  },
});

// ---> S modelValue 值绑定 <---
const modelValue = defineModel({ type: [String], default: "" });
const tirmValue = (value = "") => {
  return (value || "").trim();
};

const valueLengthGet = computed(() => {
  return (toValue(modelValue) || "").length || 0;
});
// ---> E modelValue 值绑定 <---

// ---> S placeholder <---

const placeholderStyle = computed(() => {
  return "color:CFCFCF; font-size:28rpx;";
});

// ---> E placeholder <---

// ---> S 动作 <---

const blur = (event = {}) => {
  const { detail: { value = "" } = {} } = event;
  emits("blur", { value: tirmValue(value) });
};
const focus = (event = {}) => {
  const { detail: { value = "" } = {} } = event;
  emits("focus", { value: tirmValue(value) });
};
const input = (event = {}) => {
  const { detail: { value = "" } = {} } = event;
  modelValue.value = value;
  emits("change", { value: tirmValue(value) });
};

// ---> E 动作 <---

// ---> S 样式控制 <---
const textareaStyle = computed(() => {
  const { height = "" } = props;
  const styler = {};
  if (height) {
    styler.height = `${height}rpx`;
  }
  return styler;
});

const textareaClass = computed(() => {
  const { disabled = false } = props;
  return [
    {
      "is--disabled": disabled,
    },
  ];
});
const textareaWrapClass = computed(() => {
  const { disabled = false, isFormItem = false } = props;
  return [
    {
      "is--disabled": disabled,
      "is--form-item": isFormItem,
    },
  ];
});

const autoHeightGet = computed(() => {
  const { height = "" } = props;
  return !height;
});
// ---> E 样式控制 <---
</script>
<template>
  <view class="loong-textarea" :class="textareaWrapClass">
    <!-- S 主体 -->
    <textarea
      class="textarea_main"
      placeholder="请输入"
      :disabled="disabled"
      :style="textareaStyle"
      :class="textareaClass"
      :value="modelValue"
      :maxlength="maxlength"
      :auto-height="autoHeightGet"
      :placeholder-style="placeholderStyle"
      @blur="blur"
      @focus="focus"
      @input="input"
    />
    <!-- E 主体 -->

    <!-- S 字符数量提示 -->
    <template v-if="maxlength !== -1">
      <view style="height: 24rpx"> </view>
      <view class="textarea_count"> {{ valueLengthGet }}/{{ maxlength }}</view>
    </template>
    <!-- E 字符数量提示 -->
  </view>
</template>
<style lang="scss">
$loong-textarea-color-border: #dbdbdb !default;
$loong-textarea-gap: 8rpx !default;
$loong-textarea-count-color: #999 !default;
$loong-textarea-disabled-color: #f5f5f5 !default;
$loong-textarea-disabled-color-text: #d7d7d7 !default;

.loong-textarea {
  position: relative;
  border-radius: 8rpx;
  border: solid 1rpx $loong-textarea-color-border;
  padding: $loong-textarea-gap;
  &.is--disabled {
    background-color: $loong-textarea-disabled-color;
    color: $loong-textarea-disabled-color-text;
  }
  &.is--form-item {
    border: none;
  }
  .textarea_main {
    width: 100%;
    height: 120rpx;
    min-height: 120rpx;
  }
  .textarea_count {
    position: absolute;
    bottom: 0;
    right: 0;
    color: $loong-textarea-count-color;
    font-size: 24rpx;
    margin-right: $loong-textarea-gap;
  }
}
</style>
