/*
 * @Description: 给你二叉树的根节点 root ，返回它节点值的 前序 遍历。
 * @Author: JunLiangWang
 * @Date: 2023-10-23 10:26:44
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-10-23 10:29:21
 */


/**
 * @description: 深度优先  TC:O(n)  SC:O(n)
 * @author: JunLiangWang
 * @param {*} root 给定树的头节点
 * @return {*}
 */
function dfs(root) {
    /**
     * 本方案使用深度优先的方式，前序遍历树的节点
     */

    // 记录树的节点
    let outArray = []
    /**
     * @description: 递归实现深度优先
     * @author: JunLiangWang
     * @param {*} root  子树根节点
     * @return {*}
     */    
    function recursion(root) {
        // 如果根节点为空，直接return
        if (!root) return
        // 向数组添加根节点
        outArray.push(root.val)
        // 递归遍历左子树
        recursion(root.left)
        // 递归遍历右子树
        recursion(root.right)
    }
    // 执行递归
    recursion(root)
    // 返回结果
    return outArray
}