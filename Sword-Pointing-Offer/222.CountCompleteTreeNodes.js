/*
 * @Description: 给你一棵 完全二叉树 的根节点 root ，求出该树的节点个数。
 * @Author: JunLiangWang
 * @Date: 2023-12-11 09:06:44
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-12-11 09:09:23
 */


/**
 * @description: 深度优先  TC:O(n)  SC:O(1)
 * @author: JunLiangWang
 * @param {*} root 给定树的根节点
 * @return {*}
 */
function dfs(root){
    /**
     * 本方案使用深度优先遍历二叉树
     * 计算其节点即可
     */

    // 记录节点树
    let count=0;
    /**
     * @description: 递归回溯实现深度优先
     * @author: JunLiangWang
     * @param {*} root 子树根节点
     * @return {*}
     */    
    function recursion(root){
        if(!root)return
        count++;
        recursion(root.left)
        recursion(root.right)
    }
    // 执行递归
    recursion(root)
    // 返回结果
    return count
}