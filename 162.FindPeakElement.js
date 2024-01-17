/*
 * @Description: 给你一个整数数组 nums，找到峰值元素并返回其索引。
                 数组可能包含多个峰值，在这种情况下，返回 任何一个
                 峰值 所在位置即可。
 * @Author: JunLiangWang
 * @Date: 2024-01-17 09:12:30
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2024-01-17 09:15:37
 */


/**
 * @description: 二分  TC:O(logn)  SC:O(logn)
 * @author: JunLiangWang
 * @param {*} nums 给定数组
 * @return {*}
 */
function binarySearch(nums){
    /**
     * 题中说了数组相邻元素互不相等，因此我仅需要
     * 找到数组最大值，即可找到峰值元素。
     */

    /**
     * @description: 递归+二分
     * @author: JunLiangWang
     * @param {*} start 开始索引
     * @param {*} end   结束索引
     * @return {*}
     */    
    function recursion(start,end){
        // 如果无法继续二分，返回当前索引
        if(start==end)return start
        // 获得中间索引
        let middle=Math.floor((start+end)/2),
        // 继续递归
        left= recursion(start,middle),
        right=recursion(middle+1,end)
        // 比较两索引的值大小，返回值较大的索引
        return nums[left]>nums[right]?left:right
    }
    // 执行递归，返回结果
    return recursion(0,nums.length-1)
}