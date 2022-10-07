export const tranListToTreeData = (list, rootVale) => {
    const arr = []
    list.forEach(item => {
        if (item.pid === rootVale) {
            // 找到之后 就要去找 item 下面有没有子节点
            const children = tranListToTreeData(list, item.id)
            if (children.length) {
                // 如果children的长度大于0 说明找到了子节点
                item.children = children
            }
            arr.push(item)
        }
    })
    return arr
}