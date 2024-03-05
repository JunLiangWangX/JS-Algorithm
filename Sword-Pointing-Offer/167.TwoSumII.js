/*
 * @Description: 给你一个整数数组 numbers ，该数组已按 非递减顺序排列  ，
                 请你从数组中找出满足相加之和等于目标数 target 的两个数。
 * @Author: JunLiangWang
 * @Date: 2023-11-15 09:17:06
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-11-15 09:25:08
 */


/**
 * @description: 双指针   TC:O(n)  SC:O(1)
 * @author: JunLiangWang
 * @param {*} numbers  给定数组
 * @param {*} target   给定目标值
 * @return {*}
 */
function doublePoint(numbers, target){
    /**
     * 本题给定数组为有序数组，且是找到两个不同元素的和
     * 为目标值，因此使用双指针的方式就非常合适。
     * 
     * 定义左右两指针，指向数组左右两端，当两指针所指元素
     * 和等于目标值直接返回指针索引即可；当两指针所指元素
     * 小于目标值，由于数组是升序的，因此仅将左指针向右移
     * 动一位即可增大两元素和；当两指针所指元素大于目标值
     * ，由于数组是升序，因此仅当将右指针向左移动一位即可
     * 降低两元素和。
     */

    //定义左右两指针，指向数组左右两端
    let left=0,right=numbers.length-1;
    // 当左指针超出右指针，证明数组遍历完成
    while(left<right){
        // 计算两指针所指元素和
        let result=numbers[left]+numbers[right]
        // 等于目标值直接返回指针索引
        if(result==target)return [left+1,right+1]
        // 大于目标值，由于数组是升序，
        // 因此仅当将右指针向左移动一
        // 位即可降低两元素和。
        else if(result>target) right--;
        // 小于目标值，由于数组是升序的，
        // 因此仅将左指针向右移动一位即
        // 可增大两元素和
        else left++;
    }
    
    return null;
}