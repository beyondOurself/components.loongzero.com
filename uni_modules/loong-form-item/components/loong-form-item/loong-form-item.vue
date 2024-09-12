<script setup>
import { ref, watch, computed, onMounted, onUnmounted, inject, toValue } from "vue";

defineOptions({
  name: "LoongFormItem",
});
const props = defineProps({
  label: {
    type: [String],
    default: "label",
  },

  labelWidth: {
    type: [String, Number],
    default: "",
  },
  prop: {
    type: [String],
    default: "",
  },
  required: {
    type: [Boolean],
    default: false,
  },
  rules: {
    type: [Array],
    default: [],
  },
  hollow: {
    type: [Boolean],
    default: false,
  },
});

const maxLabelWidth = inject("form__max_label_width");

const labelStyler = computed(() => {
  const styler = {};
  const { labelWidth = "" } = props;

  if (labelWidth) {
    styler.width = `${labelWidth}rpx`;
  }
  const maxLableWidthValue = toValue(maxLabelWidth);

  if (maxLableWidthValue) {
    styler.width = `${maxLableWidthValue}px`;
  }
  return styler;
});
const formMessage = inject("form__message");
const isError = ref(false);
watch(formMessage, (message = []) => {
  if (message && message.length) {
    const findMessage = message.find((fi) => fi.field === props.prop);
    if (findMessage) {
      isError.value = true;
      const { message = "", field = "" } = findMessage;
      if (message === `${field} is required`) {
        errorMessage.value = `${props.label}不能为空`;
      } else {
        errorMessage.value = message;
      }
    } else {
      errorMessage.value = "";
    }
  } else {
    errorMessage.value = "";
  }
});

const formRules = inject("form__rules");
const formRulesValue = toValue(formRules);
if (formRulesValue && props.rules && props.prop) {
  formRules.value[props.prop] = props.rules;
}

// S >>> 错误提示  <<<
const errorMessage = ref("");
const isRequired = computed(() => {
  const { rules = [], required: propRequired = false } = props;
  const rulesRequired = rules.find((fi) => fi.required);
  return rulesRequired || propRequired;
});

// E >>> 错误提示  <<<

// ---> S 名称映射 <---
onMounted(() => {
  const formNameMap = inject("form__name_map");
  if (props.label && props.prop) {
    formNameMap[props.prop] = props.label;
  }
});
// ---> E 名称映射 <---

const mainClass = computed(() => {
  return [{ "form_item_main--error": isError.value }];
});
</script>
<template>
  <slot v-if="hollow"></slot>
  <view v-else class="loong-form-item">
    <view class="form_item_main" :class="mainClass">
      <view class="form_item_label" :style="labelStyler">
        <slot name="label" style="">
          <text>{{ label }}</text>
        </slot>
        <span class="item_label_required" v-show="isRequired">*</span>
      </view>
      <view class="form_item_content">
        <slot></slot>
        <view class="item_content_error" v-show="errorMessage">
          {{ errorMessage }}
        </view>
      </view>
    </view>
  </view>
</template>
<style lang="scss" scoped>
@import "~@/uni_modules/loong-scss/index.scss";

$loong-form-label-color: $loong-main-color !default;
$loong-form-label-gap: 16rpx !default;
$loong-form-font-size: 30rpx !default;
$loong-form-item-height: 120rpx !default;
$loong-form-item-color-error: $loong-error !default;
.loong-form-item {
  @include base-component;
}

.form_item_main {
  min-height: $loong-form-item-height;
  display: flex;
  align-items: center;
  font-size: $loong-form-font-size;
  box-sizing: border-box;
  border-bottom: 1rpx solid $loong-border-1;
}
.form_item_main--error {
  // border-bottom: 1rpx solid  $loong-form-item-color-error;
}

.form_item_label {
  color: $loong-form-label-color;
  margin-right: $loong-form-label-gap;
  display: flex;
}

.form_item_content {
  flex: 1;
  min-height: $loong-form-item-height;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.loong-input,
.input_body {
  min-height: $loong-form-item-height;
}

.item_label_required {
  color: $loong-form-item-color-error;
  font-weight: 700;
}
.item_content_error {
  position: absolute;
  bottom: 0;
  color: $loong-form-item-color-error;
  font-size: 24rpx;
}
</style>
