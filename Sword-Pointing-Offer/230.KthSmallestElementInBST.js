/*
 * @Description: 给定一个二叉搜索树的根节点 root ，和一个整数 k ，请你设
                 计一个算法查找其中第 k 个最小元素（从 1 开始计数）。
 * @Author: JunLiangWang
 * @Date: 2023-12-18 09:13:33
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-12-18 09:24:48
 */


/**
 * @description: 深度优先   TC:O(n)  SC:O(n)
 * @author: JunLiangWang
 * @param {*} root 给定树的根节点
 * @param {*} k    多少位
 * @return {*}
 */
function dfs(root,k){
    /**
     * 本方案使用深度优先中序遍历二叉树的节点，因为
     * 中序遍历二叉搜索树其节点值是升序的，因此我们
     * 在遍历到第k个节点时，其就为树中第k个小的元素
     */

    // 记录树中第k个小的元素
    let number = root.val
    /**
     * @description: 递归回溯实现深度优先中序遍历
     * @author: JunLiangWang
     * @param {*} root 当前子树根节点
     * @return {*}
     */    
    function recursion(root) {
        // 根节点为空，直接return
        if (!root) return
        // 递归左子树
        recursion(root.left)
        // 遇到第k个节点，则记录它的值
        if (k == 1) number = root.val
        k--;
        // 递归右子树
        recursion(root.right)
    }
    // 执行递归
    recursion(root)
    // 返回结果
    return number
}