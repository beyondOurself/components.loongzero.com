<!--
 * @Description: 
 * @Author: canlong.shen  消息演示
 * @Date: 2024-09-04 15:41:42
 * @LastEditors: canlong.shen
 * @LastEditTime: 2024-09-05 11:07:37
 * @FilePath: \components.loongzero.com\pages\playground\message\message.vue
-->

<script setup>
import { ref, watch, computed, watchEffect, onMounted, onUnmounted, toValue } from "vue";

defineOptions({
  name: "MessageDemo",
});
const props = defineProps({});

const MESSAGE_REF = ref(null);
const open = () => {

  MESSAGE_REF.value.open("测试消息")

  // MESSAGE_REF.value.error(
  //   "愚蠢的地球人愚蠢的地球人愚蠢的地球人愚蠢的地球人愚蠢的地球人愚蠢的地球人愚蠢的地球人愚蠢的地球人"
  // );
};
</script>
<template>
  <view class="message-demo">
    <button @click="open">测试</button>
    <loong-message ref="MESSAGE_REF"></loong-message>
  </view>
</template>
<style lang="scss" scoped>
.message-demo {
}

/* ::v-deep .loong-message {
  .message_main--error {
    background-color: green !important;
  }
} */

/* .data-v-b1c65820 .loong-message .message_main--error {
    background-color: green !important;
} */

</style>
