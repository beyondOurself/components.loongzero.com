<script setup>
import { ref, watch, computed, watchEffect, onMounted, onUnmounted } from "vue";

defineOptions({
  name: "TextareaDemo",
});
const props = defineProps({});

const bindValue = ref("");
const bindValue2 = ref("愚蠢的地球人");

const change = (value = "") => {
  console.log("change", value);
};
</script>
<template>
  <view class="textarea-demo">
    <!-- {{ bindValue }} -->
    <loong-textarea v-model="bindValue" @change="change"></loong-textarea>
    <loong-textarea
      v-model="bindValue2"
      height="300"
      :maxlength="520"
      @change="change"
    ></loong-textarea>
    <loong-textarea
      disabled
	  isFormItem
      v-model="bindValue2"
      height="200"
      :maxlength="200"
      @change="change"
    ></loong-textarea>
  </view>
</template>
<style lang="scss">
.textarea-demo {
  padding: 16rpx;
}
</style>
