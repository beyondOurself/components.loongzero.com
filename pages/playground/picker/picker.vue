<script setup>
import {
  ref,
  shallowRef,
  computed,
  reactive,
  toRefs,
  onMounted,
  onBeforeUnmount,
  nextTick,
} from "vue";

defineOptions({
  name: "LoongPicker",
});
const props = defineProps({
 
});

const options = shallowRef([[{ value: 1111, label: "111" }, 2, 3, 4, 5]]);

const bindValue = shallowRef([]);
const handelChangeValue = () => {
  bindValue.value = [1111, "二", "e"];
  console.log("点击了");
  // PICKER_REF.value.open();
};

const changeValue = (values = [], indexs = [], options = []) => {
  console.log("values", values);
  console.log("indexs", indexs);
  console.log("options", options);
};

const PICKER_REF = ref(null);
const open = () => {
  PICKER_REF.value.open();
};

// ---> S 单项选择 <---
const PICKER_SINGLE_REF = ref(null);
const openSingle = () => {
  PICKER_SINGLE_REF.value.open();
};
const bindSingleValue = ref("");
// ---> E 单项选择 <---

// ---> S 多项选择 <---
const bindValueMultiple = shallowRef([1111, 2222]);
const multipleOptions = shallowRef([
  [{ value: 1111, label: "111" }, 2, 3, 4, 5],
  [{ value: 2222, label: "222" }, 6, 7, 8, 9],
]);
// ---> E 多项选择 <---
</script>
<template>
  <view class="loong-picker">
    <!-- <button @click="open">多项点击显示</button> -->
    <!-- {{ inputValueGet }} -->
    <!-- 绑定值： {{ bindValue }} -->
    <loong-picker
      ref="PICKER_REF"
      v-model="bindValueMultiple"
      title="多值选择"
      :options="multipleOptions"
      @change="changeValue"
    >
      <template #item="{ data, index }">
        <view>数据项: {{ data.label }}</view>
      </template>
    </loong-picker>

    <!-- <button @click="openSingle">点击显示单项选择</button>
    绑定值： {{ bindSingleValue }}
    <loong-picker
      ref="PICKER_SINGLE_REF"
      v-model="bindSingleValue"
      title="单值选择"
      :options="options"
      @change="changeValue"
    >
    </loong-picker> -->
  </view>
</template>
<style lang="scss">
.loong-picker {
}
</style>
