<!--
 * @Description: 复选框 
 * @Author: canlong.shen 
 * @Date: 2024-08-23 11:35:35
 * @LastEditors: canlong.shen 
 * @LastEditTime: 2024-09-18 09:47:21
 * @FilePath: /components.loongzero.com/uni_modules/loong-checkbox/components/loong-checkbox/loong-checkbox.vue
-->

<script setup>
import { ref, watch, computed, watchEffect, onMounted, onUnmounted, toValue } from "vue";

defineOptions({
  name: "LoongCheckbox",
});

const emits = defineEmits(["change"]);

// ---> S prop 初始化 <---
const props = defineProps({
  options: {
    type: [Array, Object],
    default: () => [],
  },
});
const modelValue = defineModel({ type: [Number, String, Array], default: () => [] });
// ---> E prop 初始化 <---

// ---> S 配置项 <---
const groupOptions = ref([]);
let activedValue = "1";
let inactivedValue = "0";
let singleOption = null;
const singleRef = ref(false);
watchEffect(() => {
  const { options = [], isSingle = false } = props;
  singleOption = options.find((fi) => Array.isArray(fi.value));
  singleRef.value = !!singleOption;

  if (toValue(singleRef)) {
    const { value: singleValue = [] } = singleOption;
    if (singleOption.length === 2) {
      activedValue = singleValue[1];
      inactivedValue = singleValue[0];
    }

    groupOptions.value = singleOption = [
      {
        ...singleOption,
        value: activedValue,
        activedValue,
        inactivedValue,
      },
    ];
  } else {
    groupOptions.value = options;
  }
});
// ---> E 配置项 <---

// ---> S 切换选择 <---

const change = (event = {}) => {
  const {
    detail: { value = [] },
  } = event;

  const groupOptionsList = toValue(groupOptions);
  if (toValue(singleRef)) {
    const singleSelectedValue = value && value.length ? activedValue : inactivedValue;
    modelValue.value = singleSelectedValue;
    emits("change", singleSelectedValue, singleOption);
  } else {
    modelValue.value = value;
    const findOptionList = groupOptionsList.filter((fi) => value.includes(fi));
    emits("change", findOptionList);
  }
};
const isActived = (value = "") => {
  return toValue(singleRef)
    ? `${toValue(modelValue)}` === value
    : (toValue(modelValue) || []).includes(`${value}`);
};
// ---> E 切换选择 <---
</script>
<template>
  <view class="loong-checkbox">
    <checkbox-group @change="change">
      <view class="checkbox_container">
        <template v-for="item in groupOptions">
          <view class="checkbox_item">
            <label
              class="checkbox_item_main"
              :class="[
                {
                  'is--actived': isActived(item.value),
                  'is--disabled': item.disabled,
                  'is--actived-disabled': isActived(item.value) && item.disabled,
                },
              ]"
            >
              <checkbox
                class="checkbox_body"
                :value="item.value"
                :checked="isActived(item.value)"
                :disabled="item.disabled"
              />
              <view v-show="isActived(item.value)" class="checkbox_item_hook"></view>
            </label>
            <view
              v-if="item.label"
              class="checkbox_item_text"
              :class="[{ 'is--disabled': item.disabled }]"
            >
              <slot name="label">
                <text>{{ item.label }}</text>
              </slot>
            </view>
          </view>
        </template>
      </view>
    </checkbox-group>
  </view>
</template>
<style lang="scss" scoped>
@import "~@/uni_modules/loong-scss/index.scss";

$loong-checkbox-diameter: $loong-spacing-xl !default;
$loong-checkbox-color: $loong-white !default;
$loong-checkbox-color-disabled: $loong-border-2 !default;
$loong-checkbox-border-width: $loong-border-weight-lg !default;
$loong-checkbox-border-color: $loong-border-4 !default;
$loong-checkbox-color-actived: $loong-primary !default;
$loong-checkbox-radius: $loong-radius-base !default;
$loong-checkbox-spacing-text: $loong-spacing-sm !default;
$loong-checkbox-spacing-item: $loong-spacing-base !default;
.loong-checkbox {
  @include base-component;
  display: inline-block;
}

.checkbox_item {
  display: flex;
  align-items: center;
  // margin-left: 16rpx;
}

.checkbox_item_main {
  position: relative;
  display: inline-block;
  width: $loong-checkbox-diameter;
  height: $loong-checkbox-diameter;
  border-radius: $loong-checkbox-radius;
  background-color: $loong-checkbox-color;
  border: solid $loong-checkbox-border-width $loong-checkbox-border-color;
  overflow: hidden;
  &.is--actived {
    border-color: $loong-checkbox-color-actived;
    background-color: $loong-checkbox-color-actived;
  }

  &.is--disabled {
    border-color: $loong-checkbox-color-disabled;
  }

  &.is--actived-disabled {
    background-color: $loong-checkbox-color-disabled;
  }
}

.checkbox_item_hook {
  position: absolute;
  width: 30%;
  height: 55%;
  border-color: none;
  border-bottom: $loong-checkbox-border-width solid $loong-checkbox-color;
  border-right: $loong-checkbox-border-width solid $loong-checkbox-color;
  transform: rotate(40deg);
  top: 10%;
  left: 32%;
}
.checkbox_body {
  opacity: 0;
  transform: scale(0);
}
.checkbox_container {
  display: flex;
  align-items: center;
}
.checkbox_item_text {
  margin-left: $loong-checkbox-spacing-text;
  &.is--disabled {
    color: $loong-checkbox-color-disabled;
  }
}
</style>
