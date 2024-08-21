
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