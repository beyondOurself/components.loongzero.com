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
const props = defineProps({});

const options = shallowRef([
  [{ value: 1111, label: "111" }, 2, 3, 4, 5],
]);
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
</script>
<template>
  <view class="loong-picker">
    <button @click="open">点击显示</button>
    绑定值： {{ bindValue }}
    <loong-picker
      ref="PICKER_REF"
      v-model="bindValue"
      title="多值选择"
      :options="options"
      @change="changeValue"
    >
      <template #default="{ item, index }">
        <view v-if="index === 0" width="" height="" controls>
          {{ item.label }}
        </view>
        <view v-else>数据项: {{ item.label }}</view>
      </template>
    </loong-picker>
    <view> 单项选择 </view>
    <button @click="openSingle">点击显示</button>
    绑定值： {{ bindSingleValue }}
    <loong-picker
      ref="PICKER_SINGLE_REF"
      v-model="bindSingleValue"
      title="单值选择"
      :options="options"
      @change="changeValue"
    >
    </loong-picker>
  </view>
</template>
<style lang="scss">
.loong-picker {
}
</style>
