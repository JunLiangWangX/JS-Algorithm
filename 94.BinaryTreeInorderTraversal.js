/*
 * @Description: 给定一个二叉树的根节点 root ，返回 它的 中序 遍历 。
 * @Author: JunLiangWang
 * @Date: 2023-07-28 10:29:40
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-07-28 10:33:51
 */


/**
 * @description: 递归回溯   TC:O(n)  SC:O(n)
 * @author: JunLiangWang
 * @param {*} root  给定树的头节点
 * @return {*}
 */
function recursionBackTracking(root){
    /**
     * 该方案利用递归回溯，对树进行中序遍历(左根右)
     */

    // 如果树为空，直接返回[]
    if(!root)return []
    // 记录中序遍历结果
    let outArray=[]
    /**
     * @description: 递归中序遍历
     * @author: JunLiangWang
     * @param {*} node 当前节点
     * @return {*}
     */    
    function recursion(node){
        // 如果存在左节点继续递归，直到没有左节点
        if(node.left)recursion(node.left)
        // 记录最左的节点，然后依次回溯记录
        outArray.push(node.val)
        // 最后存在右节点继续递归
        if(node.right)recursion(node.right)
    }

    // 执行递归
    recursion(root)
    // 返回结果
    return outArray
}
