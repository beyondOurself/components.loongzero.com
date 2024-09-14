<!--
 * @Description: 
 * @Author: canlong.shen 
 * @Date: 2024-08-21 10:29:38
 * @LastEditors: canlong.shen 
 * @LastEditTime: 2024-09-13 16:04:17
 * @FilePath: /components.loongzero.com/pages/playground/data-form/data-form.vue
-->
<script setup>
import { onMounted, ref } from "vue";
import { COMPONENT_TYPE_ENUM } from "@/uni_modules/loong-utils/enum.js";
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
    prop: "prop0",
    rules: true,
    hollow: true,
    label: "label0",
  },
  {
    label: "label",
    prop: "prop1",
    type: COMPONENT_TYPE_ENUM.INPUT,
    rules: true,

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
    type: COMPONENT_TYPE_ENUM.PICKER,
    range: [[{ label: "1", value: "1111" }, 2, 3, 4]],
  },
  {
    label: "label6",
    prop: "prop6",
    type: COMPONENT_TYPE_ENUM.SLIDER,
  },
  {
    label: "label7",
    prop: "prop7",
    type: COMPONENT_TYPE_ENUM.DATE,
  },
  {
    label: "label8",
    prop: "prop8",
    type: COMPONENT_TYPE_ENUM.DATETIME,
  },
  {
    label: "label9",
    prop: "prop9",
    type: COMPONENT_TYPE_ENUM.DATE_RANGE,
  },
  {
    label: "label10",
    prop: "prop10",
    type: COMPONENT_TYPE_ENUM.DATETIME_RANGE,
  },
  {
    label: "label11",
    prop: "prop11",
    type: COMPONENT_TYPE_ENUM.TEXTAREA,
  },
]);
const model = ref({
  prop2: 1,
});

const test = () => {
  console.log("COMPONENT_TYPE_ENUM", ">>>", COMPONENT_TYPE_ENUM.INPUT);
  // model.value.prop2 = 2;
  validate();
};

const LOONG_DATA_FORM_REF = ref(null);
const validate = () => {
  LOONG_DATA_FORM_REF.value.validate((values) => {
    console.log("values", ">>>", values);
  });
};

const changeErrors = (errors = []) => {
    console.log('changeErrors',errors);
}
</script>
<template>
  <view class="form">
    {{ model }}
    <button type="default" @click="test">测试</button>
    <!-- <loong-data-form :modelValue="model" :options="options"></loong-data-form> -->
    <!-- 未绑定默认值 -->
    <loong-data-form ref="LOONG_DATA_FORM_REF" :modelValue="model" :options="options" @error="changeErrors" >
      <template #prop0>
      <loong-input v-model="model.prop0" placeholder="请输入"></loong-input>
        <view>愚蠢的地球人11{{true ?  1 : 2}}</view>
      </template>
    </loong-data-form>
  </view>
</template>
<style lang="scss" scoped></style>
<style lang="scss"></style>
