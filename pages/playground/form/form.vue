<!--
 * @Description: 
 * @Author: canlong.shen 
 * @Date: 2024-08-21 10:29:38
 * @LastEditors: canlong.shen 
 * @LastEditTime: 2024-08-21 10:48:59
 * @FilePath: /components.loongzero.com/pages/playground/form/form.vue
-->
<script setup>
import { onMounted, ref } from 'vue';

const props = defineProps({});

const labelWidth = ref(100);

const formModel = ref({});

const FORM_REF = ref(null)

onMounted(() => {
	console.log('FORM_REF.value','>>>',FORM_REF.value)
})

const validation = () => {
	 
	 
	 FORM_REF.value.validate((values) => {
		 console.log('values','>>>',values)
	 })
 }


</script>
<template>
	<view class="form">
		<loong-form :model="formModel" ref="FORM_REF">
			<loong-form-item
				label="姓名"
				prop="label01"
				:rules="[
					{
						type: 'string',
						required: true,
					}
				]"
			>
				<loong-input v-model="formModel.label01"></loong-input>
			</loong-form-item>
			<loong-form-item
				label="年龄"
				prop="label02"
				:rules="[
					{
						type: 'string',
						required: true,
						message: '不能为空'
					}
				]"
			>
				<loong-input v-model="formModel.label02"></loong-input>
			</loong-form-item>
			<loong-form-item label="家庭住址">
				<loong-input></loong-input>
			</loong-form-item>
		</loong-form>


     
	 <button type="primary" @click="validation">测试</button>

	</view>
</template>
<style lang="scss" scoped></style>
<style lang="scss"></style>
