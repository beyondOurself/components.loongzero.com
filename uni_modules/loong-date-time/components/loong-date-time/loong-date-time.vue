<!--
 * @Description: 日期时间
 * @Author: canlong.shen 
 * @Date: 2024-08-30 17:53:33
 * @LastEditors: canlong.shen
 * @LastEditTime: 2024-09-02 15:31:28
 * @FilePath: \components.loongzero.com\uni_modules\loong-date-time\components\loong-date-time\loong-date-time.vue
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

import { getDays, getLayoutDays, formatDate } from "./utils/days.js";
defineOptions({
  name: "LoongDateTime",
});
const props = defineProps({
  /**
   * 类型
   */
  type: {
    type: [String],
    default: "date",
    validator: (v) => ["date", "dateRange", "datetime", "dateTimeRange"].includes(v),
  },
});

const matrixDays = shallowRef([]);

onMounted(() => {
  matrixDays.value = getLayoutDays();
  console.log("onMounted matrixDays", matrixDays.value);
});

// ---> S 值绑定 <---

const modelValue = defineModel({ type: [String], default: "" });
const startModelValue = defineModel("start", { type: [String], default: "" });
const endModelValue = defineModel("end", { type: [String], default: "" });

const confirm = () => {
  const { 0: { value: startValue } = {}, 1: { value: endValue } = {} } = toValue(
    activatedModelList
  );

  switch (props.type) {
    case "date":
      modelValue.value = formatDate(startValue);
      break;
    case "dateRange":
      startModelValue.value = formatDate(startValue);
      endModelValue.value = formatDate(endValue);
      console.log("startModelValue.value",startModelValue.value);
      console.log("endModelValue.value",endModelValue.value);
      break;
    case "datetime":
      modelValue.value = formatDate(startValue, "YYYY-MM-DD HH:mm:ss");
      break;
    case "dateTimeRange":
      startModelValue.value = formatDate(startValue, "YYYY-MM-DD HH:mm:ss");
      endModelValue.value = formatDate(endValue, "YYYY-MM-DD HH:mm:ss");
      break;
    default:
      break;
  }
};

// ---> E 值绑定 <---

// ---> S 日期选择 <---
const activatedModelList = ref([]);
const handleItem = (item = {}) => {
  const { type = "date" } = props;
  if (["date", "datetime"].includes(type)) {
    activatedModelList.value = [item];
  } else {
    if (activatedModelList.value.length === 2) {
      activatedModelList.value = [item];
    } else {
      activatedModelList.value.push(item);
    }
  }
  console.log("item", item);
  console.log("activatedModelList", activatedModelList.value);
};

// ---> E 日期选择 <---

// ---> S 日期单选 <---

// ---> E 日期单选 <---

// ---> S 周 <---
const weekList = shallowRef(["日", "一", "二", "三", "四", "五", "六"]);
// ---> E 周 <---

// ---> S 样式 <---

// 激活
const isActivated = (item = {}) => {
  return activatedModelList.value.find((fi) => `${fi.value}` === `${item.value}`);
};

const isActivatedRange = (item = {}) => {
  const { type = "" } = props;
  const { value = "" } = item;

  const { 0: { value: startValue } = {}, 1: { value: endValue } = {} } = toValue(
    activatedModelList
  );
  return (
    ["dateRange", "dateTimeRange"].includes(type) &&
    value >= startValue &&
    value <= endValue
  );
};

const isActivatedRangeStartOrEnd = (item = {}, position = "start") => {
  const { type = "" } = props;
  const { value = "" } = item;

  const activatedModelListValue = toValue(activatedModelList);
  activatedModelListValue.sort((a, b) => a.value - b.value);
  const {
    0: { value: startValue } = {},
    1: { value: endValue } = {},
  } = activatedModelListValue;

  return (
    ["dateRange", "dateTimeRange"].includes(type) &&
    ((position === "start" && value === startValue) ||
      (position === "end" && value === endValue))
  );
};

// 当前
const isCurrent = (item = {}) => {
  const nowDate = new Date();
  const currentYear = nowDate.getFullYear();
  const currentMonth = nowDate.getMonth();
  const currentDate = nowDate.getDate();
  const currentTime = new Date(currentYear, currentMonth, currentDate).getTime();
  return `${currentTime}` === `${item.value}`;
};

// ---> E 样式 <---

const test = () => {
  //   days.value = getDays();
  console.log("matrixDays", getLayoutDays());
};
</script>
<template>
  <view class="loong-datetime-date-time">
    <!-- S 遮罩 -->
    <view class="datetime_mask"> </view>
    <!-- E 遮罩 -->

    <!-- S 内容 -->
    <view class="datetime_main">
      <!-- S 操作 -->
      <view class="datetime_header">
        <view class="header_left"></view>
        <view class="header_month" @click="test"><text> 2021年10月 </text></view>
        <view class="header_right"> </view>
        <!-- S 关闭按钮 -->

        <view class="datetime_header_cancel">
          <view class="datetime_header_cancel_right"></view>
          <view class="datetime_header_cancel_left"></view>
        </view>

        <!-- E 关闭按钮 -->
      </view>
      <!-- E 操作 -->
      <!-- S 日期 -->
      <view class="datetime_days">
        <!-- S 星期 -->
        <view class="datetime_days_week">
          <template v-for="(item, key) in weekList" :key="key">
            <view class="week_item">{{ item }}</view>
          </template>
        </view>
        <!-- E 星期 -->
        <!-- S 日期 -->

        <view class="datetime_days_content">
          <template v-for="(row, rowKey) in matrixDays" :key="rowKey">
            <view class="days_row">
              <template v-for="(item, itemKey) in row" :key="itemKey">
                <view
                  class="days_item_wrap"
                  :class="{
                    'is--range': isActivatedRange(item),
                    'is--range-start': isActivatedRangeStartOrEnd(item, 'start'),
                    'is--range-end': isActivatedRangeStartOrEnd(item, 'end'),
                  }"
                >
                  <view
                    class="days_item"
                    :class="{
                      'is--activated': isActivated(item),
                    }"
                    @click="handleItem(item)"
                    >{{ item.label }}

                    <view class="days_item--current" v-if="isCurrent(item)"></view>
                  </view>
                </view>
              </template>
            </view>
          </template>
        </view>

        <!-- E 日期 -->
      </view>
      <!-- E 日期 -->
      <!-- S 日期选择 -->
      <view class="datetime_selection">
        <view class="selection_date">2024-08-30</view>
        <view class="selection_time">13:30:00</view>
      </view>
      <!-- E 日期选择 -->
      <!-- S 尾部 -->
      <view class="datetime_footer">
        <slot name="footer">
          <view class="footer_operation">
            <button class="footer_operation_confirm" @click="confirm">确定</button>
          </view>
        </slot>
      </view>

      <!-- E 尾部 -->
    </view>
    <!-- E 内容 -->
  </view>
</template>
<style lang="scss">
$loong-datetime-primay: $uni-color-primary or #007aff !default;
$loong-datetime-mask-color: $uni-bg-color-mask or rgba(0, 0, 0, 0.4) !default;
$loong-datetime-border-color: #f0eded !default;
$loong-datetime-selection-color: #2f3237 !default;
$loong-datetime-header-color: #2f3237 !default;
.loong-datetime-date-time {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  .datetime_mask {
    width: 100%;
    height: 100%;
    background-color: $loong-datetime-mask-color;
  }
  .datetime_main {
    position: absolute;
    width: 100%;
    bottom: 0;
    background-color: #fff;
    border-radius: 16rpx 16rpx 0 0;
  }
  .datetime_selection {
    height: 80rpx;
    display: flex;
    align-items: center;
    justify-content: space-around;
    border-top: solid 1rpx $loong-datetime-border-color;
    color: $loong-datetime-selection-color;
  }

  .datetime_header {
    height: 110rpx;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .header_left,
  .header_right {
    padding: 12rpx;
    border: solid 4rpx $loong-datetime-header-color;
    border-top-left-radius: 4rpx;
    transform: rotate(-45deg);
    background-clip: content-box;
  }
  .header_left {
    border-right: none;
    border-bottom: none;
  }
  .header_right {
    border-left: none;
    border-top: none;
    border-top-right-radius: 4rpx;
  }
  .header_month {
    color: $loong-datetime-header-color;
    font-size: 34rpx;
    font-weight: bold;
    margin: 0 30rpx;
  }

  .datetime_header_cancel {
    position: absolute;
    width: 35rpx;
    height: 35rpx;
    margin-right: 30rpx;
    right: 0;
  }
  .datetime_header_cancel_right,
  .datetime_header_cancel_left {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 35rpx;
    height: 4rpx;
    border-radius: 4rpx;
    background-color: $loong-datetime-header-color;
  }
  .datetime_header_cancel_right {
    transform: translate(-50%, -50%) rotate(45deg);
  }
  .datetime_header_cancel_left {
    transform: translate(-50%, -50%) rotate(-45deg);
  }

  .datetime_days_week,
  .days_row {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  .datetime_days_week {
    color: #b2b2b2;
    border-bottom: solid 1rpx $loong-datetime-border-color;
  }
  .days_row {
    margin-bottom: 4rpx;
  }

  .days_item,
  .week_item {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 60rpx;
    height: 60rpx;
  }
  .days_item_wrap {
    padding: 8rpx;
    width: 100%;
    display: flex;
    justify-content: center;
    &.is--range {
      background-color: rgba($loong-datetime-primay, 0.1);
    }
    &.is--range-start {
      border-top-left-radius: 30rpx;
      border-bottom-left-radius: 30rpx;
    }
    &.is--range-end {
      border-top-right-radius: 30rpx;
      border-bottom-right-radius: 30rpx;
    }
  }
  .days_item {
    color: #000;
    font-weight: 600;
    position: relative;
  }
  .days_item--current {
    position: absolute;
    padding: 6rpx;
    background-color: red;
    border-radius: 50%;
    top: 0;
    right: 0;
  }
  .datetime_days {
    margin: 0 16rpx;
  }
  .datetime_days_content {
    margin: 30rpx 0;
  }
  .datetime_footer {
    border-top: solid 1rpx $loong-datetime-border-color;
  }
  .footer_operation {
    height: 80rpx;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .footer_operation_confirm {
    height: 60rpx;
    line-height: 60rpx;
    width: 600rpx;
    border-radius: 40rpx;
    display: inline-block;
    color: #fff;
    background-color: $loong-datetime-primay;
    &.is--disabled {
      background-color: #ccc;
    }
  }
  .is--activated {
    border-radius: 50%;
    color: #fff;
    box-shadow: 0 0 10rpx $loong-datetime-primay;
    background-color: $loong-datetime-primay;
  }
}
</style>
