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

const listToTree = (data, keyName = 'id', parentName = 'parentId', childName = 'children') => {
    if (isEmpty(data)) return []
    const tree = []
    const tempMap = new Map()
    data.forEach(item => {
        tempMap.set(item[keyName], item)
        if (!isBlank(item[parentName]) && tempMap.has(item[parentName])) {
            const parentItem = tempMap.get(item[parentName])
            if (isNull(parentItem[childName])) {
                parentItem[childName] = new Array()
            }
            parentItem[childName].push(item)
        } else {
            tree.push(item)
        }
    })
    return tree
}

export { isBlank, isEmpty, isNull, listToTree }
