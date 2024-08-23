import {
	getEnumProxy
} from './common.js'

export const COMPONENT_TYPE_ENUM = getEnumProxy({
	INPUT: 'input',
	TEXT_AREA: 'text_area',
	RADIO: 'radio',
	CHECKBOX: 'checkbox',
	SLIDER: 'slider',
	SWITCH: 'switch',
	// xxx: 'xxx',
})