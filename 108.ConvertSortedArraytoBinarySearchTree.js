/*
 * @Description: 给你一个整数数组 nums ，其中元素已经按 升序 排列，请你将其转换为一棵 
                 高度平衡 二叉搜索树。高度平衡 二叉树是一棵满足「每个节点的左右两个子
                 树的高度差的绝对值不超过 1 」的二叉树。
 * @Author: JunLiangWang
 * @Date: 2023-08-18 08:43:35
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-08-18 09:17:00
 */



/**
 * @description: 递归回溯+二分  TC:O(n)  SC:O(1)
 * @author: JunLiangWang
 * @param {*} nums 给定升序数组
 * @return {*}
 */                 
function recursionBackTrackingAndBinary(nums){

    /**
     * 该方案使用递归回溯+二分的方式，对于一棵二叉搜索
     * 树而言，其中序遍历则为单调递增的数组，因此我们可
     * 以将给定数组nums看作为该树中序遍历的结果，但是我
     * 们如何确定其根节点呢？题中说是该树一个高度平衡的
     * 二叉树因此我们仅需要取数组的中间值作为根即可构造
     * 一棵高度平衡的二叉树
     * 
     */

    /**
     * @description: 递归
     * @author: JunLiangWang
     * @param {*} start  开始索引
     * @param {*} end    结束索引
     * @return {*}
     */    
    function recursion(start,end){
        // 如果开始索引大于结束索引证明遍历完成
        if(start>end)return null
        // 取得[start,end]的中间值，作为根元素
        let center=Math.floor((end+start)/2) 
        // 构造一棵树，其根节点为中间值，左节点为[start,center-1]区间
        // 继续递归的结果，右节点为[center+1,end]区间继续递归的结果
        return new TreeNode(nums[center],recursion(start,center-1), recursion(center+1,end))
    }
    // 执行递归，返回结果
    return recursion(0,nums.length-1)
}