import typeJson from './type.json';

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


export const COMPONENT_TYPE_ENUM = getEnumProxy(typeJson)