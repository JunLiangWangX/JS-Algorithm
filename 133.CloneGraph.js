/*
 * @Description: 给你无向 连通 图中一个节点的引用，请你返回该图的 深拷贝（克隆）。
 * @Author: JunLiangWang
 * @Date: 2023-10-09 09:50:59
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-10-09 10:14:51
 */


/**
 * @description: 深度优先  TC:O(n)  SC:O(n)
 * @author: JunLiangWang
 * @param {*} node 给定图的节点
 * @return {*}
 */
function dfs(node) {
    /**
     * 该方案使用深度优先遍历的方式，由于无向连通图可能存在回环，
     * 因此我们需要使用hashMap记录已遍历的节点，当再次遇到则无需
     * 遍历避免死循环
     */

    if (!node) return null;
    // 记录已遍历的节点，key为原图节点，value为克隆图节点
    const recordMap = new Map();

    /**
     * @description: 利用递归回溯实现深度优先
     * @author: JunLiangWang
     * @param {*} currentNode 当前节点
     * @return {*}
     */
    function recursionBacktracking(currentNode) {
        // 克隆当前节点
        const cloneNode = new Node(currentNode.val);
        // 记录已遍历的节点
        recordMap.set(currentNode, cloneNode);
        // 遍历当前节点的连通节点
        currentNode.neighbors.forEach(item => {
            // 当连通节点未被遍历，则递归
            if (!recordMap.has(item)) {
                recursionBacktracking(item);
            }
            // 获得连通节点的克隆值，并加入克隆节点的连通节点中
            cloneNode.neighbors.push(recordMap.get(item));
        });
    }
    // 执行递归
    recursionBacktracking(node);
    // 返回结果
    return recordMap.get(node);
}


/**
 * @description: 广度优先  TC:O(n)  SC:O(n)
 * @author: JunLiangWang
 * @param {*} node 给定图的节点
 * @return {*}
 */
function bfs(node) {

    /**
     * 该方案使用广度优先算法，广度优先算法依靠一个队列，
     * 先将根节点入队，然后循环不断将队列中的节点出队，然
     * 后将出队节点不为空的连通节点再次入队。如此往复直到
     * 队列为空
     * 
     */

    if (!node) return null;
    // 记录已遍历的节点，key为原图节点，value为克隆图节点
    const recordMap = new Map();
    // 克隆/记录当前的节点
    recordMap.set(node, new Node(node.val));
    // 将当前节点加入队列中
    const quene = [node];
    // 当队列不为空则继续遍历
    while (quene.length) {
        // 出队
        const currentNode = quene.shift();
        // 遍历当前节点的连通节点
        currentNode.neighbors.forEach(item => {
            // 如果未遍历过
            if (!recordMap.has(item)) {
                // 将该节点入队
                quene.push(item);
                // 克隆/记录该节点
                recordMap.set(item, new Node(item.val));
            }
            // 获得连通节点的克隆值，并加入克隆节点的连通节点中
            recordMap.get(currentNode).neighbors.push(recordMap.get(item));
        })
    }
    // 返回结果
    return (recordMap.get(node));
}