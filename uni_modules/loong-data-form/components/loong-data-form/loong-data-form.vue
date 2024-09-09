<!--
 * @Description: 数据驱动表单
 * @Author: canlong.shen 
 * @Date: 2024-08-21 17:35:53
 * @LastEditors: canlong.shen
 * @LastEditTime: 2024-09-09 16:42:39
 * @FilePath: \components.loongzero.com\uni_modules\loong-data-form\components\loong-data-form\loong-data-form.vue
-->

<script setup>
import { ref, watch, computed, watchEffect, onMounted, onUnmounted } from "vue";
import { COMPONENT_TYPE_ENUM } from "@/uni_modules/loong-utils/js_sdk/enum.js";
defineOptions({
  name: "LoongDateForm",
});
const props = defineProps({
  options: {
    type: [Array],
    default: () => ref([]),
  },
  model: {
    type: [Object],
    default: () => ref({}),
  },
});
</script>
<template>
  <view class="loong-data-form">
    <loong-form :model="model">
      <template
        v-for="({ label = '', prop = '', type = '', range = [] } = {}, index) in options"
      >
        <loong-form-item :prop="prop" :label="label">
          <slot :name="prop">
            <!-- S 输入框 -->
            <template v-if="type === COMPONENT_TYPE_ENUM.INPUT">
              <loong-input
                isFormItem
                v-model="model[prop]"
                class="form_item_inner"
              ></loong-input>
            </template>
            <!-- E 输入框 -->
            <!-- S 单选框 -->
            <template v-if="type === COMPONENT_TYPE_ENUM.RADIO">
              <loong-radio v-model="model[prop]" :options="range"></loong-radio>
            </template>
            <!-- E 单选框 -->
            <!-- S 复选框 -->
            <template v-if="type === COMPONENT_TYPE_ENUM.CHECKBOX">
              <loong-checkbox v-model="model[prop]" :options="range"></loong-checkbox>
            </template>
            <!-- E 复选框 -->
            <!-- S 开关选择器 -->
            <template v-if="type === COMPONENT_TYPE_ENUM.SWITCH">
              <loong-switch v-model="model[prop]" :options="range"></loong-switch>
            </template>
            <!-- E 开关选择器 -->
            <!-- S 滑块选择器 -->
            <template v-if="type === COMPONENT_TYPE_ENUM.SLIDER">
              <loong-slider class="form_item_inner" v-model="model[prop]"></loong-slider>
            </template>
            <!-- E 滑块选择器 -->
            <!-- S 日期选择器 -->
            <template v-if="type === COMPONENT_TYPE_ENUM.DATE">
              <loong-date-time
                isFormItem
                class="form_item_inner"
                v-model="model[prop]"
                type="date"
              ></loong-date-time>
            </template>
            <!-- E 日期选择器 -->
            <!-- S 日期时间选择器 -->
            <template v-if="type === COMPONENT_TYPE_ENUM.DATETIME">
              <loong-date-time
                isFormItem
                class="form_item_inner"
                v-model="model[prop]"
                type="datetime"
              ></loong-date-time>
            </template>
            <!-- E 日期时间选择器 -->
            <!-- S 日期范围选择器 -->
            <template v-if="type === COMPONENT_TYPE_ENUM.DATE_RANGE">
              <loong-date-time
                isFormItem
                class="form_item_inner"
                v-model="model[prop]"
                type="dateRange"
              ></loong-date-time>
            </template>
            <!-- E 日期范围选择器 -->
            <!-- S 日期时间范围选择器 -->
            <template v-if="type === COMPONENT_TYPE_ENUM.DATETIME_RANGE">
              <loong-date-time
                isFormItem
                class="form_item_inner"
                v-model="model[prop]"
                type="datetimeRange"
              ></loong-date-time>
            </template>
            <!-- E 日期时间范围选择器 -->
            <!-- S 文本输入框 -->
            <template v-if="type === COMPONENT_TYPE_ENUM.TEXTAREA">
              <loong-textarea
                isFormItem
                class="form_item_inner"
                v-model="model[prop]"
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
