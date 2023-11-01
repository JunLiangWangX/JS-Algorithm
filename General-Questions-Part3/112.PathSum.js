/*
 * @Description: 给你二叉树的根节点 root 和一个表示目标和的整数 targetSum 。判断该树中是否存在 根节点到叶子节点 的路径，
                 这条路径上所有节点值相加等于目标和 targetSum 。如果存在，返回 true ；否则，返回 false 。
 * @Author: JunLiangWang
 * @Date: 2023-08-24 09:14:33
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-08-24 09:20:24
 */


/**
 * @description: 深度优先  TC:O(n)  SC:O(1)
 * @author: JunLiangWang
 * @param {*} root  给定树的根节点
 * @return {*}
 */
/**
 * @description: 深度优先  TC:O(n)  SC:O(1)
 * @author: JunLiangWang
 * @param {*} root  给定树的根节点
 * @param {*} targetSum 给定目标和整数
 * @return {*}
 */
function dfs(root,targetSum){
    /**
     * 本方案使用深度优先的方式，利用深度遍历树的节点
     * 并记录到达该节点的路径和，然后当遇到叶子节点则
     * 比较路径和是否与目标值相等，相等则满足题意返回
     * true，否则继续遍历其他节点，直到遍历完成所有节
     * 点。
     */

    // 如果节点为空，直接返回false
    if(!root)return false
    // 记录结果，初值为fasle
    let result=false;

    /**
     * @description: 利用递归实现深度遍历
     * @author: JunLiangWang
     * @param {*} root 当前根节点
     * @param {*} val  到达根节点的路径和
     * @return {*}
     */    
    function recursion(root,val){
        // 如果节点为空或已找到目标值，则直接返回val
        if(!root||result){
            return val
        }
        // 计算到达该节点的路径和
        let sum=val+root.val;
        // 当前为叶子节点且其路径和等于目标值，则满足要求
        if(!root.left&&!root.right&&sum==targetSum)result=true
        // 深度遍历左右节点
        recursion(root.left,sum)
        recursion(root.right,sum)
    }
    // 执行递归
    recursion(root,0)
    // 返回结果
    return result
}