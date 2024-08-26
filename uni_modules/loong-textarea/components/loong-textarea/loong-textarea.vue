<!--
 * @Description: 多行输入框
 * @Author: canlong.shen 
 * @Date: 2024-08-26 15:00:49
 * @LastEditors: canlong.shen
 * @LastEditTime: 2024-08-26 17:14:22
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
  return {};
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

const autoHeightGet = computed(() => {
  const { height = "" } = props;
  return !height;
});
// ---> E 样式控制 <---
</script>
<template>
  <view class="loong-textarea" :class="textareaClass">
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
.loong-textarea {
  position: relative;
  border-radius: 8rpx;
  border: solid 1rpx #dbdbdb;
  padding: 8rpx;
  &.is--disabled {
    background-color: #f5f5f5;
    color: #d7d7d7;
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
    color: #999;
    font-size: 24rpx;
    margin-right: 8rpx;
  }
}
</style>
