/*
 * @Description: 给你二叉树的根结点 root ，请你将它展开为一个单链表
 * @Author: JunLiangWang
 * @Date: 2023-08-28 12:21:30
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-08-28 12:30:58
 */


/**
 * @description: 深度优先先序遍历  TC:O(n)  SC:O(n)
 * @author: JunLiangWang
 * @param {*} root 给定树的根节点
 * @return {*}
 */
function dfs(root){
    /**
     * 该方案采用深度优先先序遍历的方法，由于题中
     * 说单链表的顺序为二叉树的先序遍历，且该题只
     * 能在原树结构中修改，因此我们创建一个数组，
     * 然后使用深度优先先序遍历树的节点，然后将节
     * 点push到数组中，最后我们再遍历数组将前一个
     * 元素的右节点变更为后一个元素，左节点变更为
     * 空即可。
     */

    // 如果树为空直接返回null
    if(!root)return null;
    // 记录先序遍历树的节点
    let list=[];
    /**
     * @description: 递归实现深度优先先序遍历
     * @author: JunLiangWang
     * @param {*} root 当前子树根节点
     * @return {*}
     */    
    function recursion(root){
        // 如果当前根节点为空，直接返回
        if(!root)return ;
        // 添加根节点到数组中
        list.push(root);
        // 继续递归左节点
        recursion(root.left);
        // 继续递归右节点
        recursion(root.right);
    }
    // 执行递归
    recursion(root);
    // 最后遍历数组将前一个元素的右节点变更为
    // 后一个元素，左节点变更为空。
    for(let i=1;i<list.length;i++){
        list[i-1].right=list[i];
        list[i-1].left=null;
    }
}