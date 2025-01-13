<script setup>
import { ref } from 'vue';
 
  
 const props = defineProps({
  
})
  
  const options = ref({classifies: [
					{
						label: '全部商品',
						value: '1'
					},
					{
						label: '分类1',
						value: '1'
					},
					{
						label: '分类2',
						value: '2'
					},
					{
						label: '分类3',
						value: '3'
					},
					{
						label: '分类4',
						value: '4'
					},
					{
						label: '分类5',
						value: '5'
					},
					{
						label: '分类6',
						value: '6'
					}
				],
				filters: [
					{
						title: '品牌',
						tags: [
							{
								label: '品牌1',
								value: 'brand1',
								image: 'https://env-00jxha7c81fs.normal.cloudstatic.cn/happy/search/classify/demo/%E4%B8%8B%E8%BD%BD%20%281%29.png',
								hot: true
							},
							{
								label: '品牌2',
								value: 'brand2',
								image: 'https://env-00jxha7c81fs.normal.cloudstatic.cn/happy/search/classify/demo/%E4%B8%8B%E8%BD%BD%20%282%29.png'
							},
							{
								label: '品牌3',
								value: 'brand3',
								image: 'https://env-00jxha7c81fs.normal.cloudstatic.cn/happy/search/classify/demo/%E4%B8%8B%E8%BD%BD%20%283%29.png'
							},
							{
								label: '品牌4',
								value: 'brand4',
								image: 'https://env-00jxha7c81fs.normal.cloudstatic.cn/happy/search/classify/demo/%E4%B8%8B%E8%BD%BD%20%283%29.png'
							}
						]
					},
					{
						title: '颜色',
						multiple: true,
						tags: [
							{
								label: '红色',
								value: 'red',
								hot: true
							},
							{
								label: '黄色',
								value: 'yellow'
							},
							{
								label: '蓝色',
								value: 'blue'
							},
							{
								label: '绿色',
								value: 'green'
							}
						]
					},
					{
						title: '尺寸',
						multiple: true,
						tags: [
							{
								label: '特大码',
								value: 'XXL ',
								hot: true
							},
							{
								label: '加大码',
								value: 'XL'
							},
							{
								label: '大码',
								value: 'L'
							},
							{
								label: '中码',
								value: 'M'
							},
							{
								label: '小码',
								value: 'S',
								hot: true
							},
							{
								label: '超小码',
								value: 'XS'
							}
						]
					}
				]})
  
</script>
<template>
  <view class="demo-classify">

    <loong-classify :options="options">
		
	
	</loong-classify>
  </view>
</template>
<style lang="scss" scoped>
	.demo-classify {
		background-color: red;
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
	}
</style>
<style lang="scss">
</style>
