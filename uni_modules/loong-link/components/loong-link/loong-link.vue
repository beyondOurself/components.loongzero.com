<script setup>
import { ref, watch, computed, watchEffect, onMounted, onUnmounted, toValue } from "vue";

defineOptions({
  name: "LoongLink",
});
const props = defineProps({});
</script>
<template>
  <view class="loong-link">
    <slot></slot>
  </view>
</template>
<style lang="scss" scoped>
@import "~@/uni_modules/loong-scss/index.scss";

$loong-link-color: $loong-primary;
.loong-link {
  @include base-component;
  display: inline-block;
  color: $loong-link-color;
  text-decoration: underline;
}
</style>
