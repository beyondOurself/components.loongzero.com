<script setup>
import { ref, watch, computed, watchEffect, onMounted, onUnmounted, toValue } from "vue";

defineOptions({
  name: "SwitchDemo",
});
const props = defineProps({});

const options = ref([
  {
    label: "关1",
    value: "0",
  },
  {
    label: "开1",
    value: "1",
  },
]);

const options2 = ref([
  {
    value: "0",
  },
  {
    value: "1",
  },
]);

const bindValue = ref("1");
const bindValue2 = ref("0");
</script>
<template>
  <view class="switch-demo">
    {{ bindValue }}
    <view>
      <loong-switch :options="options" v-model="bindValue"></loong-switch>
    </view>
    <view>
      <loong-switch disabled :options="options2" v-model="bindValue2"></loong-switch>
    </view>
  </view>
</template>
<style lang="scss">
.switch-demo {
}
</style>
