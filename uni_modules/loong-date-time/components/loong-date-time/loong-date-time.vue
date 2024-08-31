<!--
 * @Description: 日期时间
 * @Author: canlong.shen 
 * @Date: 2024-08-30 17:53:33
 * @LastEditors: canlong.shen
 * @LastEditTime: 2024-08-31 16:04:29
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

import { getDays, getLayoutDays } from "./utils/days.js";
defineOptions({
  name: "LoongDateTime",
});
const props = defineProps({});

const matrixDays = shallowRef([]);

onMounted(() => {
  matrixDays.value = getLayoutDays();
  console.log("onMounted matrixDays", matrixDays.value);
});

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
      <!-- S 头部 -->
      <view class="datetime_header">
        <view class="header_date">2024-08-30</view>
        <view class="header_time">13:30:00</view>
      </view>

      <!-- E 头部 -->

      <!-- S 操作 -->
      <view class="datetime_operation">
        <view class="operation_left"></view>
        <view class="operation_month" @click="test"><text> 2021年10月 </text></view>
        <view class="operation_right"> </view>
      </view>
      <!-- E 操作 -->
      <!-- S 日期 -->
      <view class="datetime_days">
        <!-- S 星期 -->
        <view class="datetime_days_week">
          <view class="week_item">日</view>
          <view class="week_item">一 </view>
          <view class="week_item">二</view>
          <view class="week_item">三</view>
          <view class="week_item">四</view>
          <view class="week_item">五</view>
          <view class="week_item">六</view>
        </view>
        <!-- E 星期 -->
        <!-- S 日期 -->

        <view class="datetime_days_content">
          <template v-for="(row, rowKey) in matrixDays" :key="rowKey">
            <view class="days_row">
              <template v-for="(item, itemKey) in row" :key="itemKey">
                <view class="days_item">{{ item.label }}</view>
              </template>
            </view>
          </template>
        </view>

        <!-- E 日期 -->
      </view>
      <!-- E 日期 -->

      <!-- S 尾部 -->
      <view class="datetime_footer">
        <slot name="footer">
          <view class="footer_operation">
            <view class="footer_operation_confirm">确定</view>
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
$loong-datetime-header-color: #2f3237 !default;
$loong-datetime-operation-color: #70757e !default;
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
  .datetime_header {
    height: 110rpx;
    display: flex;
    align-items: center;
    justify-content: space-around;
    border-bottom: solid 1rpx $loong-datetime-border-color;
    color: $loong-datetime-header-color;
  }

  .datetime_operation {
    height: 100rpx;

    display: flex;
    align-items: center;
    justify-content: center;
  }

  .operation_left,
  .operation_right {
    padding: 12rpx;
    border: solid 4rpx #afafaf;
    border-top-left-radius: 4rpx;
    transform: rotate(-45deg);
    background-clip: content-box;
  }
  .operation_left {
    border-right: none;
    border-bottom: none;
  }
  .operation_right {
    border-left: none;
    border-top: none;
    border-top-right-radius: 4rpx;
  }
  .operation_month {
    color: $loong-datetime-operation-color;
    margin: 0 30rpx;
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
  .days_item {
    color: #000;
    font-weight: 600;
  }
  .datetime_days_content {
    margin: 30rpx 0;
  }
  .datetime_days {
    margin: 0 16rpx;
  }
  .datetime_footer {
    border-top: solid 1rpx $loong-datetime-border-color;
  }
  .footer_operation {
    height: 80rpx;
    line-height: 80rpx;
    text-align: right;
  }

  .footer_operation_confirm {
    display: inline-block;
    color: $loong-datetime-primay;
	margin: 0 30rpx;
  }
}
</style>
