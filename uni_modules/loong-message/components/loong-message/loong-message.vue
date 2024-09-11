<!--
 * @Description: 消息提示 
 * @Author: canlong.shen 
 * @Date: 2024-08-21 10:57:45
 * @LastEditors: canlong.shen
 * @LastEditTime: 2024-09-10 18:50:41
 * @FilePath: \components.loongzero.com\uni_modules\loong-message\components\loong-message\loong-message.vue
-->

<script setup>
import { ref, watch, computed, watchEffect, onMounted, onUnmounted, toValue } from "vue";

defineOptions({
  name: "LoongFormMessage",
});
const props = defineProps({
  type: {
    type: [String],
    default: "info",
    validator: (v) => ["success", "error", "warning", "info"].includes(v),
  },
  duration: {
    type: [Number],
    default: 2000,
  },
});

// ---> S 打开 <---

const isOpen = ref(false);
let openTimeOutId = null;
const message = ref("");
const open = (msg = "") => {
  message.value = msg;
  isOpen.value = true;

  if (openTimeOutId) {
    clearTimeout(openTimeOutId);
  }
  openTimeOutId = setTimeout(() => {
    isOpen.value = false;
  }, props.duration);
};

const messageStyle = computed(() => {
  const isOpenValue = toValue(isOpen);
  const styler = {};

  styler["top"] = isOpenValue ? "0" : "-50%";

  return styler;
});
// ---> E 打开 <---
// ---> S 关闭 <---
const close = () => {
  isOpen.value = false;
};
// ---> E 关闭 <---

// ---> S 类型 <---
const currentType = ref(props.type);
const messageClass = computed(() => {
  const typeValue = toValue(currentType);
  return [
    {
      "message_main--success": typeValue == "success",
      "message_main--error": typeValue == "error",
      "message_main--warning": typeValue == "warning",
      "message_main--info": typeValue == "info",
    },
  ];
});
// ---> E 类型 <---

// ---> S 不同消息 <---

const openTypeMessage = (type, msg = "") => {
  currentType.value = type;
  open(msg);
};

const error = (msg = "") => {
  openTypeMessage("error", msg);
};

const success = (msg = "") => {
  openTypeMessage("success", msg);
};

const warning = (msg = "") => {
  openTypeMessage("warning", msg);
};

const info = (msg = "") => {
  openTypeMessage("info", msg);
};

// ---> E 不同消息 <---

defineExpose({ open, close, error, success, warning, info });
</script>
<template>
  <view class="loong-message">
    <view class="message_main" :class="messageClass" :style="messageStyle" @click="close">
      <text>{{ message }}</text>
    </view>
  </view>
</template>
<style lang="scss" scoped>
@import "~@/uni_modules/loong-scss/index.scss";
$loong-message-color-success: $loong-success !default;
$loong-message-color-bg-success: $loong-success-light !default;
$loong-message-color-error: $loong-error !default;
$loong-message-color-bg-error: $loong-error-light !default;
$loong-message-color-warning: $loong-warning !default;
$loong-message-color-bg-warning: $loong-warning-light !default;
$loong-message-color-info: $loong-info !default;
$loong-message-color-bg-info: $loong-info-light !default;
$loong-message-size: $loong-font-size-base !default;
$loong-message-spacing: $loong-spacing-lg !default;
.loong-message {
  @include base-component;
}

.message_main {
  position: fixed;
  left: 0;
  right: 0;
  text-align: center;
  padding: $loong-message-spacing;
  font-size: $loong-message-size;
  z-index: 99999;
  top: -50%;
  left: 0;
  transition: top 600ms ease-in-out;
}
.message_main--success {
  color: $loong-message-color-success;
  background-color: $loong-message-color-bg-success;
}
.message_main--error {
  color: $loong-message-color-error;
  background-color: $loong-message-color-bg-error;
}
.message_main--warning {
  color: $loong-message-color-warning;
  background-color: $loong-message-color-bg-warning;
}
.message_main--info {
  color: $loong-message-color-info;
  background-color: $loong-message-color-bg-info;
}
.message_main--visible {
  top: 0;
}
</style>
