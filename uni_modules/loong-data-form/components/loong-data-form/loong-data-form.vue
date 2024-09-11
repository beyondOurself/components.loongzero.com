<!--
 * @Description: 数据驱动表单
 * @Author: canlong.shen 
 * @Date: 2024-08-21 17:35:53
 * @LastEditors: canlong.shen
 * @LastEditTime: 2024-09-10 18:43:58
 * @FilePath: \components.loongzero.com\uni_modules\loong-data-form\components\loong-data-form\loong-data-form.vue
-->

<script setup>
import {
  ref,
  watch,
  computed,
  watchEffect,
  onMounted,
  onUnmounted,
  toRefs,
  toValue,
} from "vue";
import { COMPONENT_TYPE_ENUM } from "@/uni_modules/loong-utils/js_sdk/enum.js";
defineOptions({
  name: "LoongDateForm",
});
const props = defineProps({
  options: {
    type: [Array],
    default: () => [],
  },
});

// ---> S 初始化 model <---

const modelValue = defineModel({ type: [String], default: () => ({}) });

const initModelValue = () => {
  const { options = [] } = props;
  for (const option of toValue(options)) {
    const { prop = "", value = "" } = option;
    // 初始化对象未定义才取配置的默认值
    if (typeof modelValue.value[prop] === "undefined") {
      modelValue.value[prop] = value;
    }
  }

  console.log("modelValue22", modelValue.value);
};
initModelValue();

// ---> E 初始化 model <---

// ---> S 配置项 <---

const optionsGet = computed(() => {
  const { options = [] } = props;

  return options.map((option = {}) => {
    const { rules = [] } = option;
    const optionCopy = { ...option };
    if (typeof rules === "boolean") {
      optionCopy.rules = [
        {
          required: true,
        },
      ];
    }

    return optionCopy;
  });
});

// ---> E 配置项 <---

// ---> S 提交 <---
const LOONG_FORM_REF = ref(null);
const validate = (call = () => {}) => {
  return LOONG_FORM_REF.value.validate(call);
};

// ---> E 提交 <---

defineExpose({
  validate,
});
</script>
<template>
  <view class="loong-data-form">
    <loong-form :model="modelValue" ref="LOONG_FORM_REF">
      <template
        v-for="(
          {
            label = '',
            prop = '',
            type = '',
            range = [],
            placeholder = '',
            rules = [],
          } = {},
          index
        ) in optionsGet"
      >
        <loong-form-item :prop="prop" :label="label" :rules="rules">
          <slot :name="prop">
            <!-- S 输入框 -->
            <template v-if="type === COMPONENT_TYPE_ENUM.INPUT">
              <loong-input
                class="form_item_inner"
                isFormItem
                v-model="modelValue[prop]"
                :placeholder="placeholder"
              ></loong-input>
            </template>
            <!-- E 输入框 -->
            <!-- S 单选框 -->
            <template v-if="type === COMPONENT_TYPE_ENUM.RADIO">
              <loong-radio v-model="modelValue[prop]" :options="range"></loong-radio>
            </template>
            <!-- E 单选框 -->
            <!-- S 复选框 -->
            <template v-if="type === COMPONENT_TYPE_ENUM.CHECKBOX">
              <loong-checkbox
                v-model="modelValue[prop]"
                :options="range"
              ></loong-checkbox>
            </template>
            <!-- E 复选框 -->
            <!-- S 弹窗选择器 -->
            <template v-if="type === COMPONENT_TYPE_ENUM.PICKER">
              <loong-picker
                class="form_item_inner"
                isFormItem
                v-model="modelValue[prop]"
                :placeholder="placeholder"
                :options="range"
              ></loong-picker>
            </template>
            <!-- E 弹窗选择器 -->
            <!-- S 开关选择器 -->
            <template v-if="type === COMPONENT_TYPE_ENUM.SWITCH">
              <loong-switch v-model="modelValue[prop]" :options="range"></loong-switch>
            </template>
            <!-- E 开关选择器 -->
            <!-- S 滑块选择器 -->
            <template v-if="type === COMPONENT_TYPE_ENUM.SLIDER">
              <loong-slider
                class="form_item_inner"
                v-model="modelValue[prop]"
              ></loong-slider>
            </template>
            <!-- E 滑块选择器 -->
            <!-- S 日期选择器 -->
            <template v-if="type === COMPONENT_TYPE_ENUM.DATE">
              <loong-date-time
                isFormItem
                type="date"
                class="form_item_inner"
                :placeholder="placeholder"
                v-model="modelValue[prop]"
              ></loong-date-time>
            </template>
            <!-- E 日期选择器 -->
            <!-- S 日期时间选择器 -->
            <template v-if="type === COMPONENT_TYPE_ENUM.DATETIME">
              <loong-date-time
                isFormItem
                class="form_item_inner"
                type="datetime"
                v-model="modelValue[prop]"
                :placeholder="placeholder"
              ></loong-date-time>
            </template>
            <!-- E 日期时间选择器 -->
            <!-- S 日期范围选择器 -->
            <template v-if="type === COMPONENT_TYPE_ENUM.DATE_RANGE">
              <loong-date-time
                isFormItem
                type="dateRange"
                class="form_item_inner"
                v-model="modelValue[prop]"
                :placeholder="placeholder"
              ></loong-date-time>
            </template>
            <!-- E 日期范围选择器 -->
            <!-- S 日期时间范围选择器 -->
            <template v-if="type === COMPONENT_TYPE_ENUM.DATETIME_RANGE">
              <loong-date-time
                isFormItem
                type="datetimeRange"
                class="form_item_inner"
                v-model="modelValue[prop]"
                :placeholder="placeholder"
              ></loong-date-time>
            </template>
            <!-- E 日期时间范围选择器 -->
            <!-- S 文本输入框 -->
            <template v-if="type === COMPONENT_TYPE_ENUM.TEXTAREA">
              <loong-textarea
                isFormItem
                class="form_item_inner"
                v-model="modelValue[prop]"
                :placeholder="placeholder"
              ></loong-textarea>
            </template>
            <!-- E 文本输入框 -->
          </slot>
        </loong-form-item>
      </template>
    </loong-form>
  </view>
</template>
<style lang="scss" scoped>
@import "~@/uni_modules/loong-scss/index.scss";

.loong-data-form {
  @include base-component;
}

.form_item_inner {
  width: 100%;
}
</style>
