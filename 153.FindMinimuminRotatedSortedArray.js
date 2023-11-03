/*
 * @Description: 给你一个元素值 互不相同 的数组 nums ，它原来是一个升序排列的数组，
                 并按上述情形进行了多次旋转。请你找出并返回数组中的 最小元素 。
 * @Author: JunLiangWang
 * @Date: 2023-11-03 15:09:18
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-11-03 15:29:11
 */


/**
 * @description: 二分   TC:O(logn)  SC:O(1)
 * @author: JunLiangWang
 * @param {*} nums 给定数组
 * @return {*}
 */                 
function binarySearch(nums){
    /**
     * 该方案使用二分查找的方式，其中的关键则为将局部有序的数组一分为二，
     * 其中一个一定是有序的，另一个一定又是局部有序的。
     * 
     * 因此我们利用该特性，不断将数组一分为二找到有序的部分，它最左边则是
     * 该部分最小值；然后再将局部有序的数组继续一分为二，又有一部分数组是
     * 有序的如此往复直到完成。
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