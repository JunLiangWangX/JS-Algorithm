/*
 * @Description: 给你一个可能存在 重复 元素值的数组 nums ，它原来是一个升序排列的数组，
                 并按上述情形进行了多次旋转。请你找出并返回数组中的 最小元素 。
 * @Author: JunLiangWang
 * @Date: 2023-11-04 10:40:12
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-11-04 10:42:46
 */


/**
 * @description: 二分  TC:O(logn)  SC:O(n)
 * @author: JunLiangWang
 * @param {*} nums 给定数组
 * @return {*}
 */
function binarySearch(nums){
    /**
     * 该方案使用二分查找的方式，该题与上一题一样其中的关键则为将局部有序
     * 的数组一分为二，其中一个一定是有序的，另一个一定又是局部有序的。
     * 
     * 因此我们利用该特性，不断将数组一分为二找到有序的部分，它最左边则是
     * 该部分最小值；然后再将局部有序的数组继续一分为二，又有一部分数组是
     * 有序的如此往复直到完成。
     * 
     * 但由于存在相同的元素，因此会存在以下情况无法判断哪边数组有序
     * 例如:  10  10  10 1  10  中间元素为：10   二分左边：10  二分右边：10
     *       10  1   10 10 10  中间元素为：10   二分左边：10  二分右边：10
     *
     * 当我们遇到左右以及中间指针所指元素相同时，我们只需要不断移动左指针直到遇到
     * 不同的元素或达到右指针所指的位置，此时区间[left,right]肯定是递增的，left
     * 所指元素肯定是区间[left,right]最小元素，比较返回最小值即可
     *
     */
    
    // 初始化左指针为0
    let left=0,
    // 右指针为数组最后一个元素
    right=nums.length-1,
    // 最小值为第一个元素
    min=nums[0];
    // 当左指针超过右指针，证明遍历完成，跳出循环
    while(left<=right){
        // 寻找中间值
        let middle=Math.floor((left+right)/2)

        // 当我们遇到左右以及中间指针所指元素相同时，我们只需要不断移动左指针直到遇到
        // 不同的元素或达到右指针所指的位置，此时区间[left,right]肯定是递增的，left
        // 所指元素肯定是区间[left,right]最小元素，比较返回最小值即可
        if(nums[left]==nums[middle]&&nums[right]==nums[middle]&&left!=right){
            while(nums[left]==nums[middle]&&left<right)left++
            return Math.min(nums[middle],nums[left],min)
        }

        // 找到有顺序的一半数组（无论如何分割数组，总有一半是全为升序的）
        // 如果nums[left]<=nums[middle]证明[left,middle]该区间全为升序
        if(nums[left]<=nums[middle]){
            // 它最左边则是该部分最小值
            min=Math.min(nums[left],min)
            // 继续遍历[middle+1,right]这部分局部有序的数组
            left=middle+1;
        }
        // 否则[middle,right]区间全为升序
        else
        {
            // 它最左边则是该部分最小值
            min=Math.min(nums[middle],min)
            // 继续遍历[left,middle-1]这部分局部有序的数组
            right=middle-1;
        }
    }
    // 返回最小值
    return min;
}