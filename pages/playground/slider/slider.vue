<script setup>
import { ref , watch , computed , watchEffect , onMounted ,onUnmounted } from 'vue';
 
  
defineOptions({
	 name:'SliderDemo'
})
 const props = defineProps({
  
})
const bindValue = ref(0)
</script>
<template>
  <view class="slider-demo">
  {{ bindValue }}
	  <loong-slider v-model="bindValue"></loong-slider>
  </view>
</template>
<style lang="scss">
 .slider-demo { 

      }
</style>