<script setup>
import { ref } from "vue";

const props = defineProps({});

const bindValue = ref("");
const start = ref("");
const end = ref("");
</script>
<template>
  <view class="datetime-demo">
    <view class="datetime-demo">
      <!-- {{ bindValue }}
      <loong-date-time
        type="date"
        v-model="bindValue"
      ></loong-date-time> -->
      {{ start }}
      {{ end }}
      <loong-date-time
        v-model:start="start"
        v-model:end="end"
        type="dateRange"
        v-model="bindValue"
      ></loong-date-time>
    </view>
  </view>
</template>
<style lang="scss" scoped></style>
