/*
 * @Description: 给定一个二叉树，判断它是否是高度平衡的二叉树。
 * @Author: JunLiangWang
 * @Date: 2023-08-22 09:23:09
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-08-22 09:33:42
 */


/**
 * @description: 递归回溯  TC:O(n)  SC:O(1)
 * @author: JunLiangWang
 * @param {*} root 给定树的根节点
 * @return {*}
 */
function recursionBackTracking(root){
    /**
     * 本方案采用递归回溯的方式，对于一棵平衡二叉树而言
     * 其任一子树都是平衡二叉树，因此我们可以使用自顶向
     * 下逐步递归其子树，直到子树为空，然后返回其树的高
     * 度，最后比对左右两子树的高度,如果超过1则不为平衡
     * 二叉树。
     */
    
    // 记录结果
    let result=true;
    /**
     * @description: 递归遍历树的所有子树
     * @author: JunLiangWang
     * @param {*} root 当前子树根节点
     * @return {*}
     */    
    function recursion(root){
        // 如果结果已经为false或root为空，直接返回0
        if(!result||!root)return 0;
        // 获取当前节点左子树高度
        let leftNodeHeight=recursion(root.left);
        // 获取当前节点右子树高度
        let rightNodeHeight=recursion(root.right);
        // 如果两树高度差大于1或结果已经为false,直接
        // 将result赋值fasle，然后返回0
        if(Math.abs(leftNodeHeight-rightNodeHeight)>1||!result){ 
            result=false;
            return 0;
        }
        // 否则证明两树高度差小于等于1，该子树为一棵平衡二叉树
        // 返回其最大子树高度+1
        return Math.max(leftNodeCount,rightNodeCount)+1;
    }
    // 执行递归
    recursion(root)
    // 返回结果
    return result;
}