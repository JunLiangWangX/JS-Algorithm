/*
 * @Description: 给你两棵二叉树的根节点 p 和 q ，编写一个函数来检验这两棵树是否相同。
                 如果两个树在结构上相同，并且节点具有相同的值，则认为它们是相同的。
 * @Author: JunLiangWang
 * @Date: 2023-08-07 09:02:50
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-08-07 09:10:03
 */


/**
 * @description: 深度优先  TC:O(n)  SC:O(n)
 * @author: JunLiangWang
 * @param {*} p  给定树头节点
 * @param {*} q  给定树头节点
 * @return {*}
 */                 
function dfs(p,q){
    /**
     * 该方案采用深度优先的方式
     */
    if(q==null&&p==null)return true
    else if(q==null||p==null)return false
    else if(q.val!=p.val)return false
    else return dfs(q.left,p.left)&&dfs(q.right,p.right)
}