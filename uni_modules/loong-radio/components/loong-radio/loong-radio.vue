<!--
 * @Description: 单选框
 * @Author: canlong.shen 
 * @Date: 2024-08-22 11:55:44
 * @LastEditors: canlong.shen
 * @LastEditTime: 2024-09-05 12:00:32
 * @FilePath: \components.loongzero.com\uni_modules\loong-radio\components\loong-radio\loong-radio.vue
-->

<script setup>
import { ref, watch, computed, watchEffect, onMounted, onUnmounted, toValue } from "vue";

defineOptions({
  name: "LoongRadio",
});

const emits = defineEmits(["change"]);

// ---> S props 初始化 <---
const props = defineProps({
  options: {
    type: [Array],
    default: () => [],
  },
});

const modelValue = defineModel({ type: [Number, String] });
const groupOptions = ref(props.options);

// ---> E props 初始化 <---

// ---> S 切换选择 <---
const changeRadioGroup = (event = "") => {
  const activedOption = toValue(groupOptions);
  const { detail: { value = "" } = {} } = event || {};
  modelValue.value = value;
  const findOption = activedOption.find((fi) => `${fi.value}` === `${value}`);
  emits("change", value, findOption);
};

const isActived = (value = "") => {
  return `${toValue(modelValue)}` === `${value}`;
};

// ---> E 切换选择 <---
</script>
<template>
  <view class="loong-radio">
    <radio-group @change="changeRadioGroup">
      <view class="radio_container">
        <template v-for="item in groupOptions">
          <view class="radio_item">
            <label
              class="radio_item_main"
              :class="[
                {
                  'is--actived': isActived(item.value),
                  'is--disabled': item.disabled,
                  'is--actived-disabled': item.disabled && isActived(item.value),
                },
              ]"
            >
              <!-- S 组件主体 -->
              <radio
                hidden
                class="radio_item_body"
                :value="item.value"
                :disabled="item.disabled || false"
              />
              <!-- E 组件主体 -->
            </label>
            <view class="radio_item_text" :class="[{ 'is--disabled': item.disabled }]">
              <slot name="label">
                <text>{{ item.label }}</text>
              </slot>
            </view>
          </view>
        </template>
      </view>
    </radio-group>
  </view>
</template>
<style lang="scss" scoped>
@import "~@/uni_modules/loong-scss/index.scss";

$loong-radio-diameter: $loong-spacing-lg !default;
$loong-radio-border-weight: $loong-border-weight-lg !default;
$loong-radio-border-color: $loong-border-1 !default;
$loong-radio-gap: $loong-spacing-sm !default;
$loong-radio-color: $loong-white !default;
$loong-radio-color-actived: $loong-primary  !default;
$loong-radio-color-disabled: $loong-border-2 !default;
$loong-radio-spacing: $loong-spacing-base !default;

.loong-radio {
  @include base-component;
}

.radio_container {
  display: flex;
}

.radio_item {
  display: flex;
  align-items: center;
  margin-left: $loong-radio-spacing;
}

.radio_item_body {
  opacity: 0;
  scale: 0;
}

.radio_item_main {
  display: inline-block;
  width: $loong-radio-diameter;
  height: $loong-radio-diameter;
  background-color: $loong-radio-color;
  padding: $loong-radio-gap;
  border: $loong-radio-border-weight solid $loong-radio-border-color;
  border-radius: 50%;
  background-clip: content-box;
  &.is--actived {
    background-color: $loong-radio-color-actived;
    border: $loong-radio-border-weight solid $loong-radio-color-actived;
  }

  &.is--disabled {
    background-color: $loong-radio-color;
    border: $loong-radio-border-weight solid $loong-radio-color-disabled;
  }
  &.is--actived-disabled {
    background-color: $loong-radio-color-disabled;
    border: $loong-radio-border-weight solid $loong-radio-color-disabled;
  }
}

.radio_item_text {
  margin-left: 8rpx;
  &.is--disabled {
    color: $loong-radio-color-disabled;
  }
}
</style>
