<!--
 * @Description: 滚动选择器
 * @Author: canlong.shen 
 * @Date: 2024-08-27 16:25:53
 * @LastEditors: canlong.shen
 * @LastEditTime: 2024-09-10 18:18:30
 * @FilePath: \components.loongzero.com\uni_modules\loong-picker\components\loong-picker\loong-picker.vue
-->

<script setup>
import {
  ref,
  watch,
  computed,
  watchEffect,
  onMounted,
  onUnmounted,
  toValue,
  nextTick,
} from "vue";
defineOptions({
  name: "LoongPicker",
});
const props = defineProps({
  options: {
    type: [Array],
    default: () => [[]],
  },
  title: {
    type: [String],
    default: "",
  },
  isFormItem: {
    type: [Boolean],
    default: false,
  },
  placeholder: {
    type: [String],
    default: "请选择",
  },
});

const emits = defineEmits(["change", "confirm"]);

// ---> S 配置项 <---
const curOptionsGet = computed(() => {
  const optionList = props.options.map((option = []) => {
    return [
      { label: "请选择", value: "", index: 0 },
      ...option.map((item, index) => {
        const indexValue = index + 1;
        if (Object.prototype.toString.call(item) !== "[object Object]") {
          return {
            label: item,
            value: item,
            index: indexValue,
          };
        }
        return { ...item, index: indexValue };
      }),
    ];
  });

  return optionList;
});

// ---> E 配置项 <---

// ---> S 激活选中项 <---
const activatedIndexList = ref([]);

watchEffect(() => {
  const propModelValue = toValue(props.modelValue);
  const valueList = toValue(isSingle) ? [propModelValue] : propModelValue;
  const curOptionsList = toValue(curOptionsGet);
  if (valueList && valueList.length === curOptionsList.length) {
    activatedIndexList.value = curOptionsList.map((option = [], optionIndex) => {
      return option.findIndex((item) => {
        return `${valueList[optionIndex]}` === `${item.value}`;
      });
    });
  }
});

// ---> E 激活选中项 <---

// ---> S 值变动 <---
const modelValue = defineModel({ type: [Array, String, Number], default: [] });
let activatedValueList = [];
let activatedOptionList = [];
const change = (event = {}) => {
  const { detail: { value = [] } = {} } = event;
  const curOptionsList = toValue(curOptionsGet);
  activatedIndexList.value = value;
  activatedOptionList = [];
  activatedValueList = curOptionsList.map((columnList = [], columnIndex) => {
    const activatedOption = columnList[value[columnIndex]];
    activatedOptionList.push(activatedOption);
    return activatedOption.value;
  });
  emits("change", activatedValueList, value, activatedOptionList);
};

const confirm = () => {
  modelValue.value = toValue(isSingle) ? activatedValueList[0] : activatedValueList;
  emits("confirm", toValue(modelValue), toValue(activatedIndexList), activatedOptionList);

  close();
};

const inputValueGet = computed(() => {
  const selectedValue = toValue(modelValue);
  return toValue(isSingle) ? selectedValue : selectedValue.join(",") || "";
});

// ---> E 值变动 <---

// ---> S 是否为单选 <---

const isSingle = computed(() => {
  return props.options.length === 1;
});

// ---> E 是否为单选 <---

// ---> S 显隐 <---
const isOpened = ref(false);
const open = () => {
  isOpened.value = true;
  nextTick(() => {
    popup.value = true;
  });
};

const close = () => {
  popup.value = false;
  setTimeout(() => {
    isOpened.value = false;
  }, 300);
};

const cancel = () => {
  close();
};

const popup = ref(false);

const pickerStyle = computed(() => {
  return {
    transform: `translateY(${popup.value ? "0" : "100%"})`,
  };
});

const pickerMaskStyle = computed(() => {
  const styler = {};
  if (popup.value) {
    styler.opacity = 1;
  } else {
    styler.opacity = 0;
  }

  return styler;
});

// ---> E 显隐 <---

// ---> S 遮罩 <---

const triggerMask = () => {
  close();
};

// ---> E 遮罩 <---

// ---> S placeholder <---

const placeholderGet = computed(() => {
  return props.placeholder || "请选择";
});
// ---> E placeholder <---

defineExpose({
  open,
  close,
});
</script>

<template>
  <view class="loong-picker">
    <!-- S 输入框 -->

    <view class="picker_input">
      <slot :data="{ modelValue }">
        <input
          disabled
          class="picker_input_body"
          :class="{ 'is--form-item': isFormItem }"
          :value="inputValueGet"
          :placeholder="placeholderGet"
          @click.stop="open"
        />
      </slot>
    </view>
    <!-- E 输入框 -->

    <!-- S 遮罩 -->

    <view
      class="picker_mask"
      v-show="isOpened"
      :style="pickerMaskStyle"
      @click.stop="triggerMask"
    >
      <!-- E 遮罩 -->
      <view class="picker_main" :style="pickerStyle">
        <!-- S 选择区域 -->
        <view class="picker_header">
          <view class="picker_header_cancel_wrap">
            <view class="picker_header_cancel" @click.stop="cancel">
              <slot name="cancel">
                <view class="picker_header_cancel_right"></view>
                <view class="picker_header_cancel_left"></view>
              </slot>
            </view>
          </view>
          <view class="picker_header_content">
            <slot name="title">{{ title }}</slot>
          </view>
          <view class="picker_header_confirm" @click.stop="confirm">
            <slot name="confirm">确定</slot>
          </view>
        </view>
        <!-- E 选择区域 -->
        <picker-view
          class="picker_body"
          immediate-change
          :value="activatedIndexList"
          @change="change"
        >
          <template v-for="(option, optionIndex) in curOptionsGet" :key="optionIndex">
            <picker-view-column>
              <view
                class="picker_item"
                :class="{
                  'is--activated': activatedIndexList[optionIndex] === itemIndex,
                }"
                v-for="(item, itemIndex) in option"
                :key="itemIndex"
              >
                <slot name="item" :data="item" :index="itemIndex">{{ item.label }}</slot>
              </view>
            </picker-view-column>
          </template>
        </picker-view>
      </view>
    </view>
  </view>
</template>
<style lang="scss" scoped>
@import "~@/uni_modules/loong-scss/index.scss";

$loong-picker-color: $loong-primary !default;
$loong-picker-mask-color: $loong-mask !default;
.loong-picker {
  @include base-component;
}

.picker_input_body {
  &.is--form-item {
    text-align: right;
  }
}

.picker_mask {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 9999;
  transition: opacity 0.3s ease-in-out;
  background-color: $loong-picker-mask-color;
}

.picker_main {
  position: absolute;
  height: 660rpx;
  width: 100%;
  bottom: 0;
  border-radius: 16rpx 16rpx 0 0;
  background-color: #fff;
  transform: translateY(100%); /* 初始位置在视图外 */
  transition: all 0.3s ease-in-out; /* 添加过渡效果 */
}

.picker_header {
  height: 110rpx;
  width: 100%;
  border-radius: 16rpx 16rpx 0 0;
  background: #f9fafb;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.picker_body {
  height: 550rpx;
  bottom: 0;
}
.picker_item {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 110rpx;
  &.is--activated {
    color: $loong-picker-color;
  }
}

.picker_header_cancel_wrap {
  flex: 1;
  display: flex;
  justify-content: flex-start;
}
.picker_header_cancel {
  position: relative;
  width: 35rpx;
  height: 35rpx;
  margin-left: 30rpx;
}
.picker_header_cancel_right,
.picker_header_cancel_left {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 35rpx;
  height: 4rpx;
  border-radius: 4rpx;
  background-color: $loong-main-color;
}
.picker_header_cancel_right {
  transform: translate(-50%, -50%) rotate(45deg);
}
.picker_header_cancel_left {
  transform: translate(-50%, -50%) rotate(-45deg);
}
.picker_header_confirm {
  font-size: 30rpx;
  color: $loong-picker-color;
  margin-right: 30rpx;
  flex: 1;
  text-align: right;
}
.picker_header_content {
  font-size: 34rpx;
  flex: 1;
  text-align: center;
}
</style>
