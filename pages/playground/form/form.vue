<script setup>
import { ref } from 'vue';

const props = defineProps({});

const labelWidth = ref(100)

</script>
<template>
	<view class="form">
		<loong-form>
			<loong-form-item label="标签11111" >
				<loong-input ></loong-input>
			</loong-form-item>
			<loong-form-item label="标签222" >
				<loong-input></loong-input>
			</loong-form-item>
			<loong-form-item label="标签33">
				<loong-input></loong-input>
			</loong-form-item>
		</loong-form>
		
		<loong-input style=""></loong-input>
	</view>
</template>
<style lang="scss" scoped></style>
<style lang="scss"></style>