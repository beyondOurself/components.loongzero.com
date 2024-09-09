<!--
 * @Description: 数据驱动表单
 * @Author: canlong.shen 
 * @Date: 2024-08-21 17:35:53
 * @LastEditors: canlong.shen
 * @LastEditTime: 2024-09-09 14:37:03
 * @FilePath: \components.loongzero.com\uni_modules\loong-data-form\components\loong-data-form\loong-data-form.vue
-->

<script setup>
import { ref, watch, computed, watchEffect, onMounted, onUnmounted } from 'vue';
import { COMPONENT_TYPE_ENUM } from '@/uni_modules/loong-utils/js_sdk/enum.js';
defineOptions({
	name: ''
});
const props = defineProps({
	options: {
		type: [Array],
		default: () => ref([])
	},
	model: {
		type: [Object],
		default: () => ref({})
	}
});



</script>
<template>
	<view class="loong-data-form">
		<loong-form :model="model">
			<template v-for="({ label = '', prop = '', type = '' , range = []} = {}, index) in options">
				<loong-form-item :prop="prop" :label="label">
					<slot :name="prop">
						<!-- S 输入框 -->
						<template v-if="type === COMPONENT_TYPE_ENUM.INPUT">
							<loong-input isFormItem v-model="model[prop]" style="width: 100%" ></loong-input>
						</template>
						<!-- E 输入框 -->
						<!-- S 单选框 -->
						<template v-if="type === COMPONENT_TYPE_ENUM.RADIO">
							<loong-radio  v-model="model[prop]" :options="range" ></loong-radio>
						</template>
						<!-- E 单选框 -->
						<!-- S 复选框 -->
						<template v-if="type === COMPONENT_TYPE_ENUM.CHECKBOX">
							<loong-checkbox  v-model="model[prop]" :options="range" ></loong-checkbox>
						</template>
						<!-- E 复选框 -->
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
</style>
