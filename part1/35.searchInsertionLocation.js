/*
 * @Description: 给定一个升序数组和一个目标值，在数组中找到目标值，并返回其索引。
                 如果目标值不存在于数组中，返回它将会被按顺序插入的位置。
 * @Author: JunLiangWang
 * @Date: 2023-04-20 09:06:22
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-04-20 09:17:33
 */


/**
 * @description: 二分查找   TC:O(logn)  SC:O(1)
 * @author: JunLiangWang
 * @param {*} nums   输入数组
 * @param {*} target 目标值
 * @return {*}
 */
function binarySearch(nums,target){
    // 初始化左指针为0，右指针为nums最后一个元素
    let left=0,right=nums.length-1,middle=0;
    // 当left>right证明比对完成数组元素，跳出循环
    while(left<=right)
    {
        // 计算中间指针位置
        middle=Math.floor((left+right)/2);
        // 如果middle所指值等于target，直接返回其位置
        if(nums[middle]==target)return middle;
        // 如果middle所指值大于target，由于数组为升序，
        // nums[middle]>target，证明区间[middle,right]
        // 元素都大于target，因此舍去，继续在[left,middle-1]
        // 区间二分查找
        if(nums[middle]>target) right=middle-1;
        // 反之nums[middle]<target，由于数组为升序，
        // 证明区间[left,middle]元素都小于target，因此
        // 社区，继续在[middle+1,right]区间二分查找
        else  left=middle+1;
    }

    // 如果未找到相等元素，则此时middle为其最接近的元素
    // 如果nums[middle]<target,则在middle+1插入target即可
    // 如果nums[middle]>target,则在middle插入target即可
    return nums[middle]>target?middle:middle+1;
}