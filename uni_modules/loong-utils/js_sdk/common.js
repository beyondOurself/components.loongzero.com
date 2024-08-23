// 创建枚举代理对象
export const getEnumProxy = (raw = {}) => {
	return new Proxy(raw, {
		set(target, prop, value) {
			throw new Error(`不可修改 ${prop}`);
		},
		deleteProperty(target, prop) {
			throw new Error(`不可删除 ${prop}`);
		}
	})
};