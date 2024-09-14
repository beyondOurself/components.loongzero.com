import App from './App.vue'

import {
	createSSRApp
} from 'vue'


const loogComponentsConfig = {
	imagePrefix: "https://env-00jxha7c81fs.normal.cloudstatic.cn/happy"
}



export function createApp() {
	const app = createSSRApp(App)
	app.provide('loong_components_config', loogComponentsConfig)
	return {
		app
	}
}