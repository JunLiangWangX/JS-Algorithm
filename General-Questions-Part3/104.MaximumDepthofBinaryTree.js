/*
 * @Description: 给定一个二叉树 root ，返回其最大深度。
 * @Author: JunLiangWang
 * @Date: 2023-08-11 10:48:58
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-08-11 10:50:58
 */



/**
 * @description: dfs  TC:O(n)  SC:O(1)
 * @author: JunLiangWang
 * @param {*} root  给定二叉树根节点
 * @return {*}
 */
function dfs(root){
    /**
     * 该方案使用深度优先的方式，在递归的参数中加入当前节点的层级
     * 每次递归则将层级+1，然后记录最大深度即可。
     */

    // 记录最大深度
    let maxDeep=0;

    /**
     * @description: 递归实现深度优先
     * @author: JunLiangWang
     * @param {*} root 当前节点
     * @param {*} deep 层级
     * @return {*}
     */    
    function recursion(root,deep){
        // 当前节点为空直接返回
        if(!root)return 
        // 记录最大深度
        if(deep>maxDeep)maxDeep=deep
        // 继续递归左子树，层级+1
        recursion(root.left,deep+1)
        // 继续递归右子树，层级+1
        recursion(root.right,deep+1)
    }
    // 执行递归
    recursion(root,1)
    // 返回结果
    return maxDeep
}