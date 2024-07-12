// 判断变量为空
const isNull = (item) => {
    return typeof item === 'undefined' || item === null
}

// 判断数组为空
const isEmpty = (item) => {
    return isNull(item) || (item instanceof Array && item.length === 0)
}

// 判断字符串为空
const isBlank = (item) => {
    return isNull(item) || ((typeof item === 'string' || item instanceof String) && item == '')
}

export { isNull, isEmpty, isBlank }