/*
 * @Description: 给你二叉树的根节点 root 和一个整数目标和 targetSum ，找出
                 所有 从根节点到叶子节点 路径总和等于给定目标和的路径。
 * @Author: JunLiangWang
 * @Date: 2023-08-25 09:14:04
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-08-25 09:21:43
 */


/**
 * @description: 深度优先  TC:O(n)  SC:O(n)
 * @author: JunLiangWang
 * @param {*} root  给定树的根节点
 * @param {*} targetSum 给定目标值
 * @return {*}
 */
function dfs(root,targetSum){
    /**
     * 本方案使用深度优先的方式，该题与112.路径总和类
     * 型， 不过112题只是判断是否存在一条路径和等于给
     * 定目标值，而该题是找出所有等于目标的的路径和,
     * 其实方法上并由没什么差别，我们同样利用深度遍历
     * 树的节点并记录到达该节点的路径和，然后当遇到叶
     * 子节点则比较路径和是否与目标值相等，相等则记录
     * 路径，然后继续遍历其他节点，直到遍历完成所有节
     * 点。
     */

    // 记录满足条件的路径
    let outArray=[];
    /**
     * @description: 递归实现深度优先遍历
     * @author: JunLiangWang
     * @param {*} root  当前根节点
     * @param {*} path  达到当前节点之前的路径
     * @param {*} sum   达到当前节点之前的路径和
     * @return {*}
     */    
    function recursion(root,path,sum){
         // 如果节点为空，直接返回false
         if(!root) return sum
         // 计算到达当前节点的路径和
         let tempSum=sum+root.val,
         // 得出达到当前节点的路径
         tempPath=[...path,root.val];
         // 当前为叶子节点且其路径和等于目标值，则满足要求
         if(tempSum===targetSum&&!root.left&&!root.right)outArray.push(tempPath)
         // 继续深度遍历其他左右节点
         recursion(root.left,tempPath,tempSum);
         recursion(root.right,tempPath,tempSum);
    }
    // 执行递归
    recursion(root,[],0)
    // 返回结果
    return outArray;
}