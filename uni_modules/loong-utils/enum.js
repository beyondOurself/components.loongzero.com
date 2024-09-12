import {
	getEnumProxy
} from './common.js'

export const COMPONENT_TYPE_ENUM = getEnumProxy({
	INPUT: 'input',
	TEXTAREA: 'textarea',
	PICKER: 'picker',
	RADIO: 'radio',
	CHECKBOX: 'checkbox',
	SLIDER: 'slider',
	SWITCH: 'switch',
	DATE: "date",
	DATE_RANGE: "dateRange",
	DATETIME: "datetime",
	DATETIME_RANGE: "datetimeRange"
	// xxx: 'xxx',
})