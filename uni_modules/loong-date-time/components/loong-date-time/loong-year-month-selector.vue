<!--
 * @Author: canlong.shen  年月选择器
 * @Date: 2024-09-03 17:14:06
 * @LastEditors: canlong.shen
 * @FilePath: \components.loongzero.com\uni_modules\loong-date-time\components\loong-date-time\loong-year-month-selector.vue
 * @Description: 
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

import { getYears, getCurrentYearMonth } from "./utils/days.js";

defineOptions({
  name: "LoongYearMonthSelector",
});

const props = defineProps({});

const emits = defineEmits(["change"]);

const modelValue = defineModel({ type: [String], default: "" });
const yearModelValue = defineModel("year", { type: [String], default: "" });
const monthModelValue = defineModel("month", { type: [String], default: "" });
const getYearsIndex = (year = "") => {
  return years.findIndex((item) => `${item}` === `${year}`);
};

const getMonthsIndex = (month = "") => {
  return months.findIndex((item) => `${item}` === `${month}`);
};

let years = [];
const months = [];

const initData = () => {
  for (let i = 1; i <= 12; i++) {
    months.push(i);
  }
  years = getYears();
};

initData();

// ---> S 绑定数值 <---
const bindIndexList = ref([]);
watchEffect(() => {
  const bindModelValue = toValue(modelValue);
  const bindYearModelValue = toValue(yearModelValue);
  const bindMonthModelValue = toValue(monthModelValue);

  let yearStr = new Date().getFullYear();
  let monthStr = new Date().getMonth() + 1;
  const yearMonthList = bindModelValue.split("-");

  if (bindModelValue && yearMonthList.length === 2) {
    yearStr = yearMonthList[0];
    monthStr = yearMonthList[1];
  } else if (bindYearModelValue && bindMonthModelValue) {
    yearStr = bindYearModelValue;
    monthStr = bindMonthModelValue;
  }
  nextTick(() => {
    bindIndexList.value = [getYearsIndex(yearStr), getMonthsIndex(monthStr)];
  });
});
// ---> E 绑定数值 <---

let yearValue = "";
let monthValue = "";
const change = (event = {}) => {
  const { detail: { value = [] } = {} } = event;
  yearValue = years[value[0]];
  monthValue = months[value[1]];
};

const confirm = () => {
  if (openYearRef) {
    openYearRef.value = yearValue;
  }
  if (openMonthRef) {
    openMonthRef.value = monthValue;
  }

  yearModelValue.value = yearValue;
  monthModelValue.value = monthValue;
  modelValue.value = `${yearValue}-${monthValue}`;
  emits("change", yearValue, monthValue);
  close();
};

// ---> S 显隐 <---
let openYearRef = null;
let openMonthRef = null;
const visible = ref(false);

const open = (yearRef = ref(""), monthRef = ref("")) => {
  openYearRef = yearRef;
  openMonthRef = monthRef;
  const yearValue = toValue(yearRef);
  const monthValue = toValue(monthRef);
  if (yearValue && monthValue) {
    modelValue.value = `${yearValue}-${monthValue}`;
  }
  visible.value = true;
};

const close = () => {
  yearValue = "";
  monthValue = "";
  openYearRef = null;
  openMonthRef = null;
  visible.value = false;
};

// ---> E 显隐 <---

defineExpose({
  open,
});
</script>
<template>
  <view class="loong-year-month-selector" v-show="visible">
    <view class="year_month_selector_main">
      <view class="year_month_selector_header">
        <!-- S 关闭按钮 -->

        <view class="year_month_selector_cancel" @click="close">
          <view class="year_month_selector_cancel_right"></view>
          <view class="year_month_selector_cancel_left"></view>
        </view>

        <!-- E 关闭按钮 -->
      </view>
      <view class="year_month_selector_container">
        <picker-view
          class="year_month_selector_picker"
          immediate-change
          :value="bindIndexList"
          @change="change"
        >
          <picker-view-column class="tiem_picker_column_years">
            <view class="tiem_picker_item" v-for="(item, index) in years" :key="index"
              >{{ item }}年</view
            >
          </picker-view-column>
          <picker-view-column>
            <view class="tiem_picker_item" v-for="(item, index) in months" :key="index"
              ><view> </view>{{ item }}<view> 月 </view></view
            >
          </picker-view-column>
        </picker-view>
      </view>
      <!-- S 尾部 -->

      <view class="year_month_selector_footer">
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

.loong-year-month-selector {
  position: fixed;

  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: $loong-time-mask-color;
  z-index: 9999;
  @include base-component;
}

.year_month_selector_main {
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
.year_month_selector_container {
  flex: 1;
}
.year_month_selector_header {
  position: relative;
  height: 60rpx;
}
.year_month_selector_footer {
  height: 80rpx;
}
.year_month_selector_picker {
  height: 100%;
}
.tiem_picker_item {
  display: flex;
  justify-content: center;
  align-items: center;
}
.tiem_picker_column_years {
  border-top-left-radius: 16rpx;
  border-bottom-left-radius: 16rpx;
}
.tiem_picker_column_second {
  border-top-right-radius: 16rpx;
  border-bottom-right-radius: 16rpx;
}

.year_month_selector_cancel {
  position: absolute;
  width: 35rpx;
  height: 35rpx;
  margin-right: 30rpx;
  right: 0;
  top: 30rpx;
}
.year_month_selector_cancel_right,
.year_month_selector_cancel_left {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 35rpx;
  height: 4rpx;
  border-radius: 4rpx;
  background-color: $loong-time-header-color;
}
.year_month_selector_cancel_right {
  transform: translate(-50%, -50%) rotate(45deg);
}
.year_month_selector_cancel_left {
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
