/*
 * @Description: 给你一个二叉树的根节点 root ，判断其是否是一个有效的二叉搜索树。
 * @Author: JunLiangWang
 * @Date: 2023-08-03 09:08:35
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-08-03 09:17:43
 */



/**
 * @description: 中序遍历  TC:O(n)  SC:O(n)
 * @author: JunLiangWang
 * @param {*} root 给定二叉树根节点
 * @return {*}
 */
function InorderTraversal(root){
    /**
     * 二叉搜索树有个非常明显的特性，即：二叉搜索树中序遍历是严格递增有序的。
     * 因此我们只需要中序遍历二叉树，如果它是严格递增的即为一颗二叉搜索树。
     */

    // 记录上一个节点值，判断是否严格递增
    let lastValue=null;

    /**
     * @description: 递归中序遍历(左根右)
     * @author: JunLiangWang
     * @param {*} root 当前节点
     * @return {*}
     */    
    function recursion(root){
        // 如果当前节点为空，是二叉搜索树，直接返回true
        if(!root)return true;
        // 继续递归左子树，看其是否为二叉搜索树
        let leftTreeIsBST= recursion(root.left)
        // 如果当前节点值小于等于上一个节点值，证明中序遍历不是严格递增的
        // 即该树不是一个二叉搜索树，返回false
        if(lastValue!=null&&lastValue>=root.val)return false;
        // 更新上一个节点值为当前节点值
        lastValue=root.val
        // 继续递归右子树，看其是否为二叉搜索树
        let rightTreeIsBST=recursion(root.right)
        // 如果左右子树都为二叉搜索树，则证明该节点作为根的子树为二叉搜索树
        return leftTreeIsBST&rightTreeIsBST
    }

    // 执行递归
    return recursion(root)
}
