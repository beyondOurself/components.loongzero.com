<script setup>
import { ref } from "vue";

const props = defineProps({});

const bindValue = ref("");
const bindDateTimeValue = ref("");
const start = ref("");
const end = ref("");
const startDatetime = ref("");
const endDatetime = ref("");

const setDisabledValueCall = (item = {}) => {
  // return item.isNext
  return false;
};

const LOONG_DATE_TIME_REF = ref(null)
const openDatePicker = () => {
  LOONG_DATE_TIME_REF.value.open();
};
</script>
<template>
  <view class="datetime-demo">
    <view class="datetime-demo">
    <button @click="openDatePicker">打开时间面板</button>
      <!-- S 日期单选 -->
      <!-- {{ bindValue }}
      <loong-date-time
        type="date"
        v-model="bindValue"
      ></loong-date-time> -->
      <!-- E 日期单选 -->
      <!-- S 日期时间单选 -->
      <!-- {{ bindDateTimeValue }}
      <loong-date-time
        type="datetime"
        v-model="bindDateTimeValue"
      ></loong-date-time> -->
      <!-- E 日期时间单选 -->
      <!-- S 日期区间选择 -->
      <!-- {{ start }}
      {{ end }}
      <loong-date-time
        v-model:start="start"
        v-model:end="end"
        type="dateRange"
        v-model="bindValue"
        :setDisabledValueCall="setDisabledValueCall"
      ></loong-date-time> -->
      <!-- E 日期区间选择 -->
      <!-- S 日期时间区间选择 -->
      {{ startDatetime }}
      {{ endDatetime }}
      <loong-date-time
        ref="LOONG_DATE_TIME_REF"
        v-model:start="startDatetime"
        v-model:end="endDatetime"
        type="datetimeRange"
        :setDisabledValueCall="setDisabledValueCall"
      ></loong-date-time>
      <!-- E 日期时间区间选择 -->
    </view>
  </view>
</template>
<style lang="scss" scoped></style>
