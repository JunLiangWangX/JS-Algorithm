/*
 * @Description: 给你一个二叉搜索树的根节点 root ，返回 树中任意两不同节点值之间的最小差值 。
                 差值是一个正数，其数值等于两值之差的绝对值。
 * @Author: JunLiangWang
 * @Date: 2023-12-15 09:37:05
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-12-15 09:43:48
 */


/**
 * @description: 深度优先  TC:O(N)  SC:O(n)
 * @author: JunLiangWang
 * @param {*} root 给定树的根节点
 * @return {*}
 */
function dfs(root){
    /**
     * 本方案使用深度优先中序遍历二叉树的节点，因为
     * 中序遍历二叉搜索树其节点值是升序的，因此我们
     * 通过不断比较上一个节点与当前节点的差，即可获
     * 得不同节点之间的最小差值
     */

    // 记录上一个节点
    let lastValue=0,
    // 记录最小差值
    min=Number.MAX_VALUE,
    // 是否第一次遍历
    isFirst=true;
    /**
     * @description: 递归回溯实现深度优先中序遍历
     * @author: JunLiangWang
     * @param {*} root 子树根节点
     * @return {*}
     */
    function recursion(root){
        // 根节点为空，直接return
        if(!root)return 
        // 递归左子树
        recursion(root.left)
        // 如果不是第一个节点，则获得两节点差值，并与以往差值
        // 比较取最小值
        if(!isFirst) min=Math.min(min,root.val-lastValue)
        // 更新上个节点值为当前节点值
        lastValue=root.val
        isFirst=false
        // 递归右子树
        recursion(root.right)
    }
    // 执行递归
    recursion(root)
    // 返回结果
    return min;
}