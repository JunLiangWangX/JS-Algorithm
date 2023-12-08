/*
 * @Description: 你一棵二叉树的根节点 root ，翻转这棵二叉树，并返回其根节点。
 * @Author: JunLiangWang
 * @Date: 2023-12-08 09:21:49
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-12-08 09:25:07
 */


/**
 * @description: 深度优先  TC:O(n)  SC:O(n)
 * @author: JunLiangWang
 * @param {*} root 给定树根节点
 * @return {*}
 */
function dfs(root) {
    /**
     * 本方案使用深度优先的方式遍历树的节点，
     * 然后交换遍历的左右节点即可
     */
    if (!root) return root
    let left = dfs(root.left),
        right = dfs(root.right)
    root.left = right
    root.right = left
    return root
}