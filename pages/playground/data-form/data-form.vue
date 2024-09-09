<!--
 * @Description: 
 * @Author: canlong.shen 
 * @Date: 2024-08-21 10:29:38
 * @LastEditors: canlong.shen
 * @LastEditTime: 2024-09-09 16:31:43
 * @FilePath: \components.loongzero.com\pages\playground\data-form\data-form.vue
-->
<script setup>
import { onMounted, ref } from "vue";
import { COMPONENT_TYPE_ENUM } from "@/uni_modules/loong-utils/js_sdk/enum.js";
const props = defineProps({});

const labelWidth = ref(100);

const formModel = ref({});

const FORM_REF = ref(null);

onMounted(() => {
  console.log("FORM_REF.value", ">>>", FORM_REF.value);
});

const validation = () => {
  FORM_REF.value.validate((values) => {
    console.log("values", ">>>", values);
  });
};

const reset = () => {
  FORM_REF.value.reset();
};

const options = ref([
  {
    label: "label",
    prop: "prop1",
    type: COMPONENT_TYPE_ENUM.INPUT,
  },
  {
    label: "label2",
    prop: "prop2",
    type: COMPONENT_TYPE_ENUM.RADIO,
    range: [
      {
        label: "radio1",
        value: 1,
      },
      {
        label: "radio2",
        value: 2,
      },
      {
        label: "radio3",
        value: 3,
      },
    ],
  },
  {
    label: "label3",
    prop: "prop3",
    type: COMPONENT_TYPE_ENUM.CHECKBOX,
    range: [
      {
        label: "checkbox1",
        value: 1,
      },
      {
        label: "checkbox2",
        value: 2,
      },
      {
        label: "checkbox3",
        value: 3,
      },
    ],
  },
  {
    label: "label4",
    prop: "prop4",
    type: COMPONENT_TYPE_ENUM.SWITCH,
    range: [
      {
        label: "关1",
        value: "0",
      },
      {
        label: "开1",
        value: "1",
      },
    ],
  },
  {
    label: "label5",
    prop: "prop5",
    type: COMPONENT_TYPE_ENUM.SLIDER,
  },
  {
    label: "label6",
    prop: "prop6",
    type: COMPONENT_TYPE_ENUM.DATE,
  },
  {
    label: "label7",
    prop: "prop7",
    type: COMPONENT_TYPE_ENUM.DATETIME,
  },
  {
    label: "label8",
    prop: "prop8",
    type: COMPONENT_TYPE_ENUM.DATE_RANGE,
  },
  {
    label: "label9",
    prop: "prop9",
    type: COMPONENT_TYPE_ENUM.DATETIME_RANGE,
  },
  {
    label: "label10",
    prop: "prop11",
    type: COMPONENT_TYPE_ENUM.DATETIME_RANGE,
  },
  {
    label: "label10",
    prop: "prop10",
    type: COMPONENT_TYPE_ENUM.TEXTAREA,
  },
]);
const model = ref({});

const test = () => {
  console.log("COMPONENT_TYPE_ENUM", ">>>", COMPONENT_TYPE_ENUM.INPUT);
};
</script>
<template>
  <view class="form">
    <button type="default" @click="test">测试</button>
    <loong-data-form :model="model" :options="options"></loong-data-form>
  </view>
</template>
<style lang="scss" scoped></style>
<style lang="scss"></style>
