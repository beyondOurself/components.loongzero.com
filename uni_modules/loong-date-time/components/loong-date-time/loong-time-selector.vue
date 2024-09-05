<!--
 * @Description: 
 * @Author: canlong.shen 
 * @Date: 2024-09-02 17:27:26
 * @LastEditors: canlong.shen
 * @LastEditTime: 2024-09-03 17:14:04
 * @FilePath: \components.loongzero.com\uni_modules\loong-date-time\components\loong-date-time\loong-time-selector.vue
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
  shallowRef,
} from "vue";

defineOptions({
  name: "LoongTimeSelector",
});
const props = defineProps({});

const modelValue = defineModel({ type: [String], default: "" });

const timeValueListGet = computed(() => {
  return modelValue.value ? modelValue.value.split(":") : [];
});

const hours = [];
const minutes = [];
const seconds = [];

const initData = () => {
  for (let i = 0; i < 60; i++) {
    const iStr = i < 10 ? "0" + i : i;
    if (i < 24) {
      hours.push(iStr);
    }
    minutes.push(iStr);
    seconds.push(iStr);
  }
};

initData();
let hoursValue = "";
let minutesValue = "";
let secondsValue = "";
const change = (event = {}) => {
  const { detail: { value = [] } = {} } = event;
  hoursValue = hours[value[0]];
  minutesValue = minutes[value[1]];
  secondsValue = seconds[value[2]];
};

const confirm = () => {
  const timeStr = `${hoursValue}:${minutesValue}:${secondsValue}`;
  if (openTimer) {
    openTimer.value = timeStr;
  }
  modelValue.value = timeStr;
  close();
};

// ---> S 显隐 <---
let openTimer = null;
const visible = ref(false);

const open = (timeRef = ref("")) => {
  openTimer = timeRef;
  modelValue.value = toValue(timeRef);
  visible.value = true;
};

const close = () => {
  hoursValue = "";
  minutesValue = "";
  secondsValue = "";
  openTimer = null;
  visible.value = false;
};

// ---> E 显隐 <---

defineExpose({
  open,
});
</script>
<template>
  <view class="loong-time-selector" v-show="visible">
    <view class="time_selector_main">
      <view class="time_selector_header">
        <!-- S 关闭按钮 -->

        <view class="time_selector_cancel" @click="close">
          <view class="time_selector_cancel_right"></view>
          <view class="time_selector_cancel_left"></view>
        </view>

        <!-- E 关闭按钮 -->
      </view>
      <view class="time_selector_container">
        <picker-view
          class="time_selector_picker"
          immediate-change
          :value="timeValueListGet"
          @change="change"
        >
          <picker-view-column class="tiem_picker_column_hours">
            <view class="tiem_picker_item" v-for="(item, index) in hours" :key="index">{{
              item
            }}</view>
          </picker-view-column>
          <picker-view-column>
            <view
              class="tiem_picker_item tiem_picker_item--minute"
              v-for="(item, index) in minutes"
              :key="index"
              ><view> : </view>{{ item }}<view> : </view></view
            >
          </picker-view-column>
          <picker-view-column class="tiem_picker_column_second">
            <view
              class="tiem_picker_item"
              v-for="(item, index) in seconds"
              :key="index"
              >{{ item }}</view
            >
          </picker-view-column>
        </picker-view>
      </view>
      <!-- S 尾部 -->

      <view class="time_selector_footer">
        <button class="foote_confirm" @click="confirm">确定</button>
      </view>

      <!-- E 尾部 -->
    </view>
  </view>
</template>
<style lang="scss" scoped>
@import "~@/uni_modules/loong-scss/index.scss";

$loong-time-primay: $loong-primary !default;
$loong-time-mask-color: $loong-mask !default;
$loong-time-header-color: $loong-main-color !default;

.loong-time-selector {
  position: fixed;

  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  background-color: $loong-time-mask-color;
  @include base-component;
}

.time_selector_main {
  position: absolute;
  width: 80%;
  height: 60%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  background-color: #fff;
  border-radius: 16rpx;
}
.time_selector_container {
  flex: 1;
}
.time_selector_header {
  position: relative;
  height: 60rpx;
}
.time_selector_footer {
  height: 80rpx;
}
.time_selector_picker {
  height: 100%;
}
.tiem_picker_item {
  display: flex;
  justify-content: center;
  align-items: center;
}
.tiem_picker_item--minute {
  display: flex;
  justify-content: space-between;
}
.tiem_picker_column_hours {
  border-top-left-radius: 16rpx;
  border-bottom-left-radius: 16rpx;
}
.tiem_picker_column_second {
  border-top-right-radius: 16rpx;
  border-bottom-right-radius: 16rpx;
}

.time_selector_cancel {
  position: absolute;
  width: 35rpx;
  height: 35rpx;
  margin-right: 30rpx;
  right: 0;
  top: 30rpx;
}
.time_selector_cancel_right,
.time_selector_cancel_left {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 35rpx;
  height: 4rpx;
  border-radius: 4rpx;
  background-color: $loong-time-header-color;
}
.time_selector_cancel_right {
  transform: translate(-50%, -50%) rotate(45deg);
}
.time_selector_cancel_left {
  transform: translate(-50%, -50%) rotate(-45deg);
}

.foote_confirm {
  background-color: $loong-time-primay;
  color: #fff;
  height: 60rpx;
  width: 500rpx;
  line-height: 60rpx;
  border-radius: 40rpx;
  font-size: 28rpx;
}
</style>
