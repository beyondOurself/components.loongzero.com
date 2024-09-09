<!--
 * @Description: 开关选择器
 * @Author: canlong.shen 
 * @Date: 2024-08-26 19:00:25
 * @LastEditors: canlong.shen
 * @LastEditTime: 2024-09-09 16:50:52
 * @FilePath: \components.loongzero.com\uni_modules\loong-switch\components\loong-switch\loong-switch.vue
-->

<script setup>
import { ref, watch, computed, watchEffect, onMounted, onUnmounted, toValue } from "vue";

defineOptions({
  name: "LoongSwitch",
});
const props = defineProps({
  disabled: {
    type: [Boolean],
    default: false,
  },
  type: {
    type: [String],
    default: "switch",
  },
  color: {
    type: [String],
    default: "#007aff",
  },
  scale: {
    type: [Number],
    default: 0.8,
  },
});

// ---> S 值绑定 <---
const emits = defineEmits(["change"]);
const modelValue = defineModel({ type: [String], default: "" });

const checkedGet = computed(() => {
  const { options = [] } = props;
  const value = toValue(modelValue);

  isActivated.value = `${value}` === `${options[1].value}`;

  return isActivated.value;
});
const change = (event = {}) => {
  const { value = false } = event.detail || {};

  const { options: { 0: inactiveOption = {}, 1: activedOption = {} } = [] } = props;

  modelValue.value = value ? activedOption.value : inactiveOption.value;
  const currentOption = value ? activedOption : inactiveOption;
  emits("change", value, currentOption);
  console.log(value, currentOption);
};
// ---> E 值绑定 <---

// ---> S 样式 <---

const isActivated = ref(false);
const slidingWrapClass = computed(() => {
  return [
    {
      "is--activated": toValue(isActivated),
      "is--disabled": props.disabled,
    },
  ];
});
const slidingClass = computed(() => {
  return [
    {
      "is--activated": toValue(isActivated),
    },
  ];
});

// ---> E 样式 <---

// ---> S lable 值绑定 <---

const activatedLabel = ref("开");
const inactivatedLabel = ref("关");

watchEffect(() => {
  const {
    options: {
      0: { label: inactivatedLabelVal = "" } = {},
      1: { label: activatedLabelVal = "" } = {},
    } = [],
  } = props;
  if (activatedLabelVal) {
    activatedLabel.value = activatedLabelVal;
  }
  if (inactivatedLabelVal) {
    inactivatedLabel.value = inactivatedLabelVal;
  }
});
// ---> E lable 值绑定 <---
</script>
<template>
  <view class="loong-switch">
    <label class="switch_main">
      <switch
        class="switch_body"
        style="transform: scale(0)"
        :checked="checkedGet"
        :disabled="disabled"
        @change="change"
      />
      <view class="switch_block" :class="slidingWrapClass">
        <view class="switch_block_sliding_wrap">
          <view class="switch_block_sliding" :class="slidingClass"> </view>
        </view>
      </view>
      <view class="switch_label">{{
        checkedGet ? activatedLabel : inactivatedLabel
      }}</view>
    </label>
  </view>
</template>
<style lang="scss" scoped>
@import "~@/uni_modules/loong-scss/index.scss";

$loong-switch-background-color: $loong-border-4 !default;
$loong-switch-background-color-actived: $loong-primary !default;
$loong-switch-gap: 2rpx !default;
$loong-switch-width: 80rpx !default;
$loong-switch-diameter: 46rpx !default;
.loong-switch {
  display: inline-block;
  @include base-component;
}

.switch_main {
  display: inline-flex;
  align-items: center;
  position: relative;
}
.switch_body {
  width: 0;
  height: 0;
  position: absolute;
}
.switch_block {
  border-radius: calc(($loong-switch-diameter + $loong-switch-gap) / 2);
  padding: $loong-switch-gap;
  background-color: $loong-switch-background-color;
  transition: background-color 100ms ease;
  &.is--activated {
    background-color: $loong-switch-background-color-actived;
  }
  &.is--disabled {
    opacity: 0.35;
  }
}
.switch_block_sliding_wrap {
  height: $loong-switch-diameter;
  width: $loong-switch-width;
  position: relative;
}

.switch_block_sliding {
  position: absolute;
  left: 0;
  width: $loong-switch-diameter;
  height: $loong-switch-diameter;
  border-radius: 50%;
  background-color: #fff;
  transition: left 100ms ease-in-out;
  &.is--activated {
    left: calc(100% - $loong-switch-diameter);
  }
}
.switch_label {
  margin-left: 8rpx;
}
</style>
