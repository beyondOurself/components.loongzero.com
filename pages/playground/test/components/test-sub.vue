<script setup>
import {
  ref,
  watch,
  computed,
  watchEffect,
  onMounted,
  onUnmounted,
  toValue,
  useSlots,
} from "vue";

defineOptions({
  name: "TestSub",
});
const props = defineProps({
  options: {
    type: [Array, Object],
    default: () => [],
  },
});
const slots = useSlots();
console.log("TestSub", slots);
</script>
<template>
  <view class="test-sub">
    <view>子组件</view>
    <template v-for="(item, index) of options" :key="index">
      <view class="">
        <slot :name="item.prop" v-if="slots[item.prop]"> </slot>
        <view v-else> {{ item.prop }} </view>
      </view>
    </template>
  </view>
</template>
<style lang="scss">
.test-sub {
}
</style>
