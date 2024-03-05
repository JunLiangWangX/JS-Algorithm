/*
 * @Description: 给定一个含有 n 个正整数的数组和一个正整数 target 。找出该数组中满足其总和大于
                 等于 target 的长度最小的 连续子数组 [numsl, numsl+1, ..., numsr-1,numsr] ，
                 并返回其长度。
 * @Author: JunLiangWang
 * @Date: 2023-11-16 09:53:30
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-11-16 10:02:57
 */



/**
 * @description: 滑动窗口  TC:O(n)  SC:O(1)
 * @author: JunLiangWang
 * @param {*} target 给定目标值
 * @param {*} nums   给定数组
 * @return {*}
 */
function slidingWindow(target, nums) {
    /**
     * 本方案使用滑动窗口的方式，定义左右两指针，并定义
     * 一个sum变量，存放左指针到右指针元素的和。
     * 
     * 当sum小于目标值，并且右指针未超出数组范围，则我们
     * 继续向右移动右指针，增大元素和
     * 
     * 当sum大于等于目标值满足条件，比较之前记录的左右指针
     * 将其更新为最短的子数组，最后我们向右移动左指针，减
     * 小元素和
     * 
     * 最后如果sum小于目标值，并且右指针超出了数组范围，证明
     * 我们已遍历完成，此时返回结果即可
     */

    // 定义左右指针与存放元素的和的变量
    let left = 0, right = 0, sum = 0,
    // 记录相距最短的左右指针
     start = 0, end = nums.length + 1;
    while (1) {
        // 当sum小于目标值，并且右指针未超出数组范围，
        // 则我们继续向右移动右指针，增大元素和
        if (sum < target && right < nums.length) {
            sum += nums[right];
            right++;
        }
        // 当sum大于等于目标值满足条件，比较之前记录的
        // 左右指针将其更新为最短的子数组，最后我们向右
        // 移动左指针，减小元素和
        else if (sum >= target) {
            if (right - left < end - start) {
                start = left;
                end = right;
            }
            sum -= nums[left];
            left++;
        }
        // 如果sum小于目标值，并且右指针超出了数组范围，
        // 证明我们已遍历完成，此时返回结果即可
        else {
            return end == nums.length + 1 ? 0 : end - start
        }
    }
}