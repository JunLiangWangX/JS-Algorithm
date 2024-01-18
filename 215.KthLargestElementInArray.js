/*
 * @Description: 给定整数数组 nums 和整数 k，请返回数组中第 k 个最大的元素。
                 你必须设计并实现时间复杂度为 O(n) 的算法解决此问题。
 * @Author: JunLiangWang
 * @Date: 2024-01-18 09:53:12
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2024-01-18 10:04:48
 */


/**
 * @description: 快排  TC:O(n)  SC:O(logn)
 * @author: JunLiangWang
 * @param {*} nums 给定数组
 * @param {*} k    返回第k大元素
 * @return {*}
 */
function fastSort(nums, k){
    /**
     * 本方案使用快速排序，快速排序的核心思想其实很简单，
     * 通过不断递归二分数组，直到仅为一个元素无法再分，
     * 直接返回由一个元素组成的数组，然后回溯阶段不断将
     * 两个有序数组合并为一个有序数组，最终即完成排序
     */

    /**
     * @description: 合并两个有序数组
     * @author: JunLiangWang
     * @param {*} arr1 有序数组1
     * @param {*} arr2 有序数组2
     * @return {*}
     */    
    function mergeSortedArray(arr1, arr2) {
        let mergeArray = [], i = 0, j = 0;
        // 遍历两数组，将较大元素放入数组中
        while (arr1[i] != undefined && arr2[j] != undefined) {
            if (arr1[i] > arr2[j]) {
                mergeArray.push(arr1[i])
                i++;
            }
            else {
                mergeArray.push(arr2[j])
                j++;
            }
        }
        // 把剩余元素push到新数组中
        if (arr1[i] != undefined) for (; i < arr1.length; i++)mergeArray.push(arr1[i])
        else for (; j < arr2.length; j++)mergeArray.push(arr2[j])
        // 返回合并后的数组
        return mergeArray;
    }
    /**
     * @description: 递归二分
     * @author: JunLiangWang
     * @param {*} left 左指针
     * @param {*} right 右指针
     * @return {*}
     */    
    function recursion(left, right) {
        // 仅为一个元素无法再分，直接返回由一个元素组成的数组
        if (left == right) return [nums[left]]
        // 否则，继续二分
        let middle = Math.floor((left + right) / 2)
        // 返回 合并 二分后两个有序数组
        return mergeSortedArray(recursion(left, middle), recursion(middle + 1, right))
    }
    // 返回结果
    return recursion(0, nums.length - 1)[k - 1]
}