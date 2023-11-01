/*
 * @Description: 给你一棵二叉树的根节点 root ，返回其节点值的 后序遍历 。
 * @Author: JunLiangWang
 * @Date: 2023-10-24 09:29:41
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-10-24 09:34:28
 */


/**
 * @description: 深度优先  TC:O(n)  SC:O(n)
 * @author: JunLiangWang
 * @param {*} root 给定树的头节点
 * @return {*}
 */
function dfs(root){
    /**
     * 本方案使用深度优先的方式，后序遍历树的节点
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
        // 递归遍历左子树
        recursion(root.left)
        // 递归遍历右子树
        recursion(root.right)
        // 向数组添加根节点
        outArray.push(root.val)
    }
    // 执行递归
    recursion(root)
    // 返回结果
    return outArray
}


/**
 * @description: 迭代法  TC:O(n)  SC:O(n)
 * @author: JunLiangWang
 * @param {*} root 给定树的头节点
 * @return {*}
 */
function iteration(root){
    /***
     * 本方案使用迭代法，利用迭代法对树进行
     * 前序遍历相信大家都比较清楚，而后序遍
     * 历与前序遍历相同，只不过返回结果时将
     * 前序遍历结果翻转就是后序遍历了
     */

    // 以下为利用迭代对树进行前序遍历
    if(!root)return [];
    const stack=[root],outArray=[]
    while(stack.length>0){
        let peek=stack.pop()
        outArray.push(peek.val)
        if(peek.left)stack.push(peek.left)
        if(peek.right)stack.push(peek.right)
    }
    // 将结果翻转则是后序遍历
    return outArray.reverse();
}