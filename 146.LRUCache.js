/*
 * @Description: 请你设计并实现一个满足  LRU (最近最少使用) 缓存 约束的数据结构。
 * @Author: JunLiangWang
 * @Date: 2023-10-25 17:02:35
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-10-25 17:31:05
 */

/**
 * 对于本题的get(int key)函数，根据key然后返回value，这个肯定是
 * 使用哈希Map确定无疑的，也满足O(1)的时间复杂度
 * 
 * 但最近最少使用，一开始我准备使用栈的，将操作过后的key直接移动
 * 到栈顶，栈底就是最少操作的key，但这里出现了一个问题，其他元素
 * 也需要跟着移动这也导致了不满足O(1)的时间复杂度，因此想要满足O(1)
 * 的时间复杂度就必须使用链表，需要通过链表模拟栈的行为，因此选用
 * 双向链表！
 * 
 * 通过hahsMap存储key的value以及链表的节点，但凡操作该节点，则将
 * 将节点移动到链表的头部，最后通过一个遍历记录链表的底部，底部
 * 节点则是操作最少的节点。
 * 
 * 哈希表+双向链表即可满足要求
 * 
 */

/**
 * @description: 定义双向链表节点
 * @author: JunLiangWang
 * @param {*} key  key
 * @param {*} last 上一个节点
 * @param {*} next 下一个节点
 * @return {*}
 */
var NodeList = function (key, last, next) {
    this.key = key
    this.last = last ? last : null
    this.next = next ? next : null
}
/**
 * @description: 定义LRUCache结构
 * @author: JunLiangWang
 * @param {*} capacity 大小
 * @return {*}
 */
var LRUCache = function (capacity) {
    // 存储节点大小
    this.size = capacity;
    // 定义双向链表，保留头部方便更改头节点
    this.nodeList = new NodeList(0, null, null);
    // 定义链表最后一个节点，即为操作最少的节点
    this.leastNode = null;
    // 定义hashMap
    this.map = new Map();
};
/**
 * @description: 将节点移动到链表顶部
 * @author: JunLiangWang
 * @param {*} node 节点
 * @return {*}
 */
LRUCache.prototype.changeNodePosition = function (node) {

    // 如果该节点是头节点则无需移动
    if (node.last == this.nodeList) return;

    // 交换节点操作，同时注意更新最后一个节点，举一个列子仔细看就能明白
    let lastNode = node.last
    let nextNode = node.next
    lastNode.next = nextNode
    if (!nextNode)
        this.leastNode = lastNode
    else
        nextNode.last = lastNode
    node.last = this.nodeList
    node.next = this.nodeList.next
    this.nodeList.next.last = node
    this.nodeList.next = node

};
/**
 * @description: get操作
 * @author: JunLiangWang
 * @param {*} key key
 * @return {*}
 */
LRUCache.prototype.get = function (key) {
    // 从hashmap中拿出该key的值
    let mapValue = this.map.get(key)
    // 如果存在
    if (mapValue) {
        // 由于操作了该节点，因此他是最近操作最多的
        // 节点，需要将其放入链表顶部
        this.changeNodePosition(mapValue.node)
        // 返回值
        return mapValue.value
    }
    // 不存在返回-1
    else return -1;
};

/**
 * @description: put操作
 * @author: JunLiangWang
 * @param {*} key key
 * @param {*} value 值
 * @return {*}
 */
LRUCache.prototype.put = function (key, value) {
    // 获取map中是否已存在该key
    let mapValue = this.map.get(key)

    // 如果已存在
    if (mapValue) {
        // 则将该节点放入链表顶部，同上的道理
        this.changeNodePosition(mapValue.node)
        // 更新key的值
        mapValue.value = value
        // 更新map中的值
        this.map.set(key, mapValue)
    }
    // 如果不存在，但空间充足
    else if (this.size > 0) {
        // 直接构建该节点，并将节点移动至头部
        let node = new NodeList(key, this.nodeList, this.nodeList.next)
        if (this.nodeList.next)
            this.nodeList.next.last = node
        this.nodeList.next = node
        // 存入map
        this.map.set(key, {
            value: value,
            node: node
        })
        // 如果是首个节点，则底部节点需要更新为该节点
        if (this.leastNode == null) this.leastNode = node
        // 空间-1
        this.size--
    }
    // 如果不存在，且空间不足
    else {
        // 拿到底部节点的key
        let leastNodeKey = this.leastNode.key
        // 删除map中的内容
        this.map.set(leastNodeKey, undefined)
        // 构建一个新节点，并将节点移动至头部 
        let node = new NodeList(key, this.nodeList, this.nodeList.next)
        if (this.nodeList.next)
            this.nodeList.next.last = node
        this.nodeList.next = node
        // 存入map
        this.map.set(key, {
            value: value,
            node: node
        })

        // 更新底部节点为删除的节点的上一个节点
        if (this.leastNode.last)
            this.leastNode.last.next = null
        this.leastNode = this.leastNode.last

    }
};
