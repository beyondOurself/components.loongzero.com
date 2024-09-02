<script setup>
import { ref } from "vue";

const props = defineProps({});

const bindValue = ref("");
const bindDateTimeValue = ref("");
const start = ref("");
const end = ref("");

const setDisabledValueCall = (item = {}) => {
  // return item.isNext
  return false;
};
</script>
<template>
  <view class="datetime-demo">
    <view class="datetime-demo">
      <!-- S 日期单选 -->
      <!-- {{ bindValue }}
      <loong-date-time
        type="date"
        v-model="bindValue"
      ></loong-date-time> -->
      <!-- E 日期单选 -->
      <!-- S 日期时间单选 -->
      {{ bindDateTimeValue }}
      <loong-date-time
        type="datetime"
        v-model="bindDateTimeValue"
      ></loong-date-time>
      <!-- E 日期时间单选 -->

      <!-- {{ start }}
      {{ end }}
      <loong-date-time
        v-model:start="start"
        v-model:end="end"
        type="dateRange"
        v-model="bindValue"
        :setDisabledValueCall="setDisabledValueCall"
      ></loong-date-time> -->
    </view>
  </view>
</template>
<style lang="scss" scoped></style>
