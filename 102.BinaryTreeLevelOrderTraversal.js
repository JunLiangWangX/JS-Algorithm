/*
 * @Description: 给你二叉树的根节点 root ，返回其节点值的 层序遍历 。 （即逐层地，从左到右访问所有节点）。
 * @Author: JunLiangWang
 * @Date: 2023-08-09 09:46:38
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-08-09 09:52:12
 */


/**
 * @description: 深度优先  TC:O(n)  SC:O(n)
 * @author: JunLiangWang
 * @param {*} root  给定树的根节点
 * @return {*}
 */
function dfs(root){
    /**
     * 该方案使用深度优先的方式，在递归的参数中加入当前节点的层级
     * 每次递归则将层级+1，后续将当前节点值加入层级即可
     */

    // 定义输出数组
    let outArray=[];

    /**
     * @description: 递归实现深度优先遍历
     * @author: JunLiangWang
     * @param {*} root  当前根节点
     * @param {*} index 当前层数
     * @return {*}
     */    
    function recursion(root,index){
        // 如果根节点为空，直接返回
        if(!root)return 
        // 如果当前层级未定义数组，则定义
        if(!outArray[index])outArray[index]=[]
        // 给当前层级添加根节点的值
        outArray[index].push(root.val)
        // 继续递归左子树
        recursion(root.left,index+1)
        // 继续递归右子树
        recursion(root.right,index+1)
    }
    // 执行递归
    recursion(root,0)
    // 返回结果
    return outArray
}