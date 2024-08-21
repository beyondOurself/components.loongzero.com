// 拷贝对象
export const deepCopy = (obj) => {
	if (obj === null || typeof obj !== 'object') {
		return obj;
	}
	const copy = Array.isArray(obj) ? [] : {};
	for (let key in obj) {
		if (obj.hasOwnProperty(key)) {
			copy[key] = deepCopy(obj[key]);
		}
	}
	return copy;
}

export const getTypeDefualtValue = (value = '') => {
	const type = Object.prototype.toString.call(value)
	switch (type) {
		case '[object Number]':
			return 0;
		case '[object String]':
			return '';
		case '[object Boolean]':
			return false;
		case '[object Undefined]':
			return '';
		case '[object Null]':
			return '';
		case '[object Object]':
			return {};
		case '[object Array]':
			return [];
		case '[object Function]':
			return '';
		case '[object Date]':
			return '';
		default:
		    return ''
			break;
	}
}