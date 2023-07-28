/*
 * @Description: 给定一个二叉树的根节点 root ，返回 它的 中序 遍历 。
 * @Author: JunLiangWang
 * @Date: 2023-07-28 10:29:40
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-07-28 10:57:17
 */


/**
 * @description: 递归回溯   TC:O(n)  SC:O(n)
 * @author: JunLiangWang
 * @param {*} root  给定树的头节点
 * @return {*}
 */
function recursionBackTracking(root) {
    /**
     * 该方案利用递归回溯，对树进行中序遍历(左根右)
     */

    // 如果树为空，直接返回[]
    if (!root) return []
    // 记录中序遍历结果
    let outArray = []
    /**
     * @description: 递归中序遍历
     * @author: JunLiangWang
     * @param {*} node 当前节点
     * @return {*}
     */
    function recursion(node) {
        // 如果存在左节点继续递归，直到没有左节点
        if (node.left) recursion(node.left)
        // 记录最左的节点，然后依次回溯记录
        outArray.push(node.val)
        // 最后存在右节点继续递归
        if (node.right) recursion(node.right)
    }

    // 执行递归
    recursion(root)
    // 返回结果
    return outArray
}


/**
 * @description: 迭代法   TC:O(n)   SC:O(n)
 * @author: JunLiangWang
 * @param {*} root 给定树的头节点
 * @return {*}
 */
function iteration(root) {
    /**
     * 递归回溯本质上是利用函数调用机制维护了一个栈，因此
     * 我们可以自己定义一个栈，然后使用迭代的方式模拟这个
     * 过程，而不需要使用递归
     */
    // 定义一个栈
    let stack = [],
        // 记录中序遍历结果
        outArray = [];

    // 当头节点为空并且栈中并为节点，结束遍历
    while (root || stack.length) {
        // 不断遍历左节点，并将其添加到栈中，
        // 直到为树中最左节点
        while (root) {
            stack.push(root)
            root = root.left
        }
        // 此时栈顶为最左节点，中序遍历其
        // 此时应该出栈，并记录它的值

        // 将当前最左节点出栈
        let lastNode = stack.pop()
        // 记录它的值
        outArray.push(lastNode.val)
        // 遍历它的右节点
        root = lastNode.right
    }

    // 返回结果
    return outArray;
}
