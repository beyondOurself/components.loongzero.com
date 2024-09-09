<!--
 * @Description: 日期时间
 * @Author: canlong.shen 
 * @Date: 2024-08-30 17:53:33
 * @LastEditors: canlong.shen
 * @LastEditTime: 2024-09-09 16:46:23
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
  nextTick,
} from "vue";

import { getDays, getLayoutDays, formatDate, getCurrentYearMonth } from "./utils/days.js";
import LoongTimeSelector from "./loong-time-selector.vue";
import LoongYearMonthSelector from "./loong-year-month-selector.vue";
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
    validator: (v) => ["date", "dateRange", "datetime", "datetimeRange"].includes(v),
  },
  disabled: {
    type: [Function],
    default: () => undefined,
  },
  placeholder: {
    type: [String],
    default: "请选择日期",
  },
  isFormItem: {
    type: [Boolean],
    default: false,
  },
});

const matrixDays = shallowRef([]);

const initData = () => {
  matrixDays.value = getLayoutDays(new Date(), props.disabled);
};
initData();

// ---> S 值绑定 <---

const modelValue = defineModel({ type: [String], default: "" });
const startModelValue = defineModel("start", { type: [String], default: "" });
const endModelValue = defineModel("end", { type: [String], default: "" });

const confirm = () => {
  const { 0: { value: startValue } = {}, 1: { value: endValue } = {} } = toValue(
    activatedModelList
  );

  const selectedStartDataValue = toValue(selectedStartData);
  const selectedStartTimeValue = toValue(selectedStartTime);
  const selectedEndDataValue = toValue(selectedEndData);
  const selectedEndTimeValue = toValue(selectedEndTime);

  switch (props.type) {
    case "date":
      if (!selectedStartDataValue) {
        return;
      }
      modelValue.value = selectedStartDataValue;
      break;
    case "dateRange":
      if (!selectedStartDataValue || !selectedEndDataValue) {
        return;
      }
      startModelValue.value = selectedStartDataValue;
      endModelValue.value = selectedEndDataValue;
      modelValue.value = `${selectedStartDataValue}~${selectedEndDataValue}`;

      break;
    case "datetime":
      if (!selectedStartDataValue || !selectedStartTimeValue) {
        return;
      }
      modelValue.value = `${selectedStartDataValue} ${selectedStartTimeValue}`;
      break;
    case "datetimeRange":
      if (
        !selectedStartDataValue ||
        !selectedStartTimeValue ||
        !selectedEndDataValue ||
        !selectedEndTimeValue
      ) {
        return;
      }
      startModelValue.value = `${selectedStartDataValue} ${selectedStartTimeValue}`;
      endModelValue.value = `${selectedEndDataValue} ${selectedEndTimeValue}`;
      modelValue.value = `${selectedStartDataValue} ${selectedStartTimeValue}~${selectedEndDataValue} ${selectedEndTimeValue}`;

      break;
    default:
      break;
  }

  close();
};

// ---> E 值绑定 <---

// ---> S 日期选择 <---
const activatedModelList = ref([]);
const handleItem = (item = {}) => {
  const { disabled = false, isCur = false, value = "" } = item;
  if (disabled) {
    return;
  }

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
};

// ---> E 日期选择 <---

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
    ["dateRange", "datetimeRange"].includes(type) &&
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
    ["dateRange", "datetimeRange"].includes(type) &&
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

const popup = ref(false);
const maskStyleGet = () => {
  const styler = {};
  if (popup.value) {
    styler.opacity = 1;
  } else {
    styler.opacity = 0;
  }

  return styler;
};

const pickerStyleGet = computed(() => {
  return {
    transform: `translateY(${popup.value ? "0" : "100%"})`,
  };
});

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

// ---> E 样式 <---

// ---> S 遮罩 <---

const triggerMask = () => {
  close();
};

// ---> E 遮罩 <---

// ---> S 日期选择 <---

const selectedStartData = ref("");
const selectedStartTime = ref("00:00:00");
const selectedEndData = ref("");
const selectedEndTime = ref("00:00:00");

watchEffect(() => {
  const {
    0: { value: startValue, formatValue: startformatValue = "" } = {},
    1: { value: endValue, formatValue: endformatValue = "" } = {},
  } = toValue(activatedModelList);

  selectedStartData.value = startformatValue;
  selectedEndData.value = endformatValue;
});

// ---> E 日期选择 <---

// ---> S 时间选择 <---

const LOONG_TIME_SELECTOR_REF = ref(null);

const changeTime = (position = "start") => {
  if (position === "start") {
    LOONG_TIME_SELECTOR_REF.value.open(selectedStartTime);
  } else if (position === "end") {
    LOONG_TIME_SELECTOR_REF.value.open(selectedEndTime);
  }
};

// ---> E 时间选择 <---

// ---> S 年月选择 <---
const { year: currentYear, month: currentMonth } = getCurrentYearMonth();
const selectedYearData = ref(currentYear);
const selectedMonthData = ref(currentMonth);
const LOONG_YEAR_MONTH_SELECTOR_REF = ref(null);
const openYearMonth = () => {
  LOONG_YEAR_MONTH_SELECTOR_REF.value.open();
};
const changeYearMonth = (year = 0, month = 0) => {
  nextTick(() => {
    matrixDays.value = getLayoutDays(new Date(year, +month - 1), props.disabled);
  });
};

const triggerPrevMonth = () => {
  const selectedYearDataValue = toValue(selectedYearData);
  const selectedMonthDataValue = toValue(selectedMonthData);
  let prevMonth = +selectedMonthDataValue - 1;
  let pervYear = +selectedYearDataValue;
  if (prevMonth === 0) {
    prevMonth = 12;
    pervYear = selectedYearDataValue - 1;
    if (pervYear < 1900) {
      pervYear = 1900;
    }
  }
  selectedMonthData.value = prevMonth;
  selectedYearData.value = pervYear;
  changeYearMonth(pervYear, prevMonth);
};
const triggerNextMonth = () => {
  const selectedYearDataValue = toValue(selectedYearData);
  const selectedMonthDataValue = toValue(selectedMonthData);
  let nextMonth = +selectedMonthDataValue + 1;
  let nextYear = +selectedYearDataValue;
  if (nextMonth === 13) {
    nextMonth = 1;
    nextYear = selectedYearDataValue + 1;
    const maxYear = new Date().getFullYear() + 100;
    if (nextYear > maxYear) {
      nextYear = maxYear;
    }
  }
  selectedMonthData.value = nextMonth;
  selectedYearData.value = nextYear;
  changeYearMonth(nextYear, nextMonth);
};

// ---> E 年月选择 <---

// ---> S 输入框选择 <---

const inputValueGet = computed(() => {
  return modelValue.value || "";
});

// ---> E 输入框选择 <---

defineExpose({
  open,
  close,
});
</script>
<template>
  <view class="loong-datetime">
    <!-- S 输入框 -->
    <view class="datetime_input">
      <slot :data="{ modelValue }">
        <input
          disabled
          class="datetime_input_body"
          :class="{ 'is--form-item': isFormItem }"
          :value="inputValueGet"
          :placeholder="placeholder"
          @click.stop="open"
        />
      </slot>
    </view>
    <!-- E 输入框 -->
    <view class="datetime_wrap" v-if="isOpened">
      <!-- S 遮罩 -->
      <view class="datetime_mask" :style="maskStyleGet" @click.stop="triggerMask"> </view>
      <!-- E 遮罩 -->

      <!-- S 内容 -->
      <view class="datetime_main" :style="pickerStyleGet">
        <!-- S 操作 -->
        <view class="datetime_header">
          <view class="header_prev" @click.stop="triggerPrevMonth"></view>
          <view class="header_month" @click.stop="openYearMonth">
            {{ selectedYearData }}年{{ selectedMonthData }}月
          </view>
          <view class="header_next" @click.stop="triggerNextMonth"> </view>
          <!-- S 关闭按钮 -->

          <view class="datetime_header_cancel" @click.stop="close">
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
                        'is--disabled': item.disabled,
                      }"
                      @click.stop="handleItem(item)"
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
          <input
            class="selection_date_intput"
            type="text"
            disabled
            :value="selectedStartData"
            placeholder="选择日期"
          />

          <input
            v-if="['datetime', 'datetimeRange'].includes(type)"
            class="selection_date_intput"
            type="text"
            disabled
            placeholder="选择时间"
            :value="selectedStartTime"
            @click.stop="changeTime('start')"
          />
          <text v-if="['datetimeRange', 'dateRange'].includes(type)"> 至 </text>
          <input
            v-if="['datetimeRange', 'dateRange'].includes(type)"
            class="selection_date_intput"
            :class="{
              selection_date_end_intput:
                ['datetimeRange'].includes(type) && selectedEndData,
            }"
            type="text"
            disabled
            :value="selectedEndData"
            placeholder="选择日期"
          />
          <input
            v-if="['datetimeRange'].includes(type)"
            class="selection_date_intput"
            type="text"
            disabled
            placeholder="选择时间"
            :value="selectedEndTime"
            @click.stop="changeTime('end')"
          />
        </view>
        <!-- E 日期选择 -->
        <!-- S 尾部 -->
        <view class="datetime_footer">
          <slot name="footer">
            <view class="footer_operation">
              <button class="footer_operation_confirm" @click.stop="confirm">确定</button>
            </view>
          </slot>
        </view>

        <!-- E 尾部 -->
      </view>
      <!-- E 内容 -->
    </view>

    <!-- S 时间选择器 -->
    <loong-time-selector
      v-if="['datetime', 'datetimeRange'].includes(type)"
      ref="LOONG_TIME_SELECTOR_REF"
    ></loong-time-selector>
    <!-- E 时间选择器 -->
    <!-- S 年月选择器 -->
    <LoongYearMonthSelector
      ref="LOONG_YEAR_MONTH_SELECTOR_REF"
      v-model:year="selectedYearData"
      v-model:month="selectedMonthData"
      @change="changeYearMonth"
    ></LoongYearMonthSelector>
    <!-- E 年月选择器 -->
  </view>
</template>
<style lang="scss" scoped>
@import "~@/uni_modules/loong-scss/index.scss";

$loong-datetime-primay: $loong-primary !default;
$loong-datetime-mask-color: $loong-mask !default;
$loong-datetime-border-color: $loong-border-1 !default;
$loong-datetime-selection-color: $loong-main-color !default;
$loong-datetime-header-color: $loong-main-color !default;
.loong-datetime {
  @include base-component;
}

.datetime_input_body {
  &.is--form-item {
    text-align: right;
  }
}
.datetime_wrap {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 9999;
}

.datetime_mask {
  width: 100%;
  height: 100%;
  transition: opacity 0.3s ease-in-out;
  background-color: $loong-datetime-mask-color;
}
.datetime_main {
  position: absolute;
  width: 100%;
  bottom: 0;
  background-color: #fff;
  border-radius: 16rpx 16rpx 0 0;
  transform: translateY(100%); /* 初始位置在视图外 */
  transition: all 0.3s ease-in-out; /* 添加过渡效果 */
}
.datetime_selection {
  height: 80rpx;
  display: flex;
  align-items: center;
  justify-content: space-around;
  border-top: solid 1rpx $loong-datetime-border-color;
  color: $loong-datetime-selection-color;
}

.selection_date_intput {
  text-align: center;
  font-size: 28rpx;
}
.selection_date_end_intput {
  text-align: right;
}

.datetime_header {
  height: 110rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.header_prev,
.header_next {
  padding: 12rpx;
  border: solid 4rpx $loong-datetime-header-color;
  border-top-left-radius: 4rpx;
  transform: rotate(-45deg);
  background-clip: content-box;
}
.header_prev {
  border-right: none;
  border-bottom: none;
}
.header_next {
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
  &.is--disabled {
    color: #cecece;
  }
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
  font-size: 28rpx;

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
</style>
