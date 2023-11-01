/*
 * @Description: 给你一个二叉树的根节点 root ，树中每个节点都存放有一个 0 到 9 之间的数字。
                 每条从根节点到叶节点的路径都代表一个数字：例如，从根节点到叶节点的路径
                  1 -> 2 -> 3 表示数字 123 。计算从根节点到叶节点生成的 所有数字之和 。
 * @Author: JunLiangWang
 * @Date: 2023-09-21 10:53:30
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-09-21 11:07:44
 */


/**
 * @description: 深度遍历  TC:O(n)  SC:O(n)
 * @author: JunLiangWang
 * @param {*} root  给定根节点
 * @return {*}
 */
function dfs(root){
    /**
     * 这题还是比较简单的，直接深度遍历就ok，递归参数除了子树根节点以外
     * 再加上一个路径即可，我记录路径的方式是采用字符串，最后到达叶子节
     * 点再将字符串转换为数字计算路径和
     */

    /**
     * @description: 利用递归回溯实现深度遍历
     * @author: JunLiangWang
     * @param {*} root  当前子树根节点
     * @param {*} path  到底当前节点的路径
     * @return {*}
     */
    function recursionBacktracking(root,path){
        // 如果节点为空直接返回0
        if(!root){
            return 0
        }
        // 如果为叶子节点则返回路径
        if(!root.left&&!root.right){
            return (path+root.val)*1
        }
        // 返回路径和
        return recursionBacktracking(root.left,path+root.val)+recursionBacktracking(root.right,path+root.val)
    }
    // 执行递归返回结果
    return recursionBacktracking(root,'')
}