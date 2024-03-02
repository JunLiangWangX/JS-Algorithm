/*
 * @Description: 给你一个整数数组 nums ，找到其中最长严格递增子序列的长度。
                 子序列 是由数组派生而来的序列，删除（或不删除）数组中的元
                 素而不改变其余元素的顺序。例如，[3,6,2,7] 是数组 [0,3,1,
                 6,2,2,7] 的子序列。
 * @Author: JunLiangWang
 * @Date: 2024-03-02 09:48:18
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2024-03-02 09:57:08
 */


/**
 * @description: 动态规划  TC:O(n^2)  SC:O(n)
 * @param {*} nums 给定数组
 */
function dp(nums) {
    /**
     * 本方案使用动态规划，本题动态规划较好理解，利用DP数组存放
     * nums中每个元素与之前的元素能够组成的严格递增的最长序列的
     * 长度，对于某元素n而言其最长序列则为 max(DP[n-1],DP[n-2]
     * ....DP[0])+1即可
     * 
     * 例如：
     *     nums:[10, 9, 2, 5, 3, 7, 101, 18]
     *     则DP:[1,  1, 1, 2, 2, 3, 4,   4]
     */
    // 记录严格递增的最长序列
    let maxLength = 1, 
    // DP数组，初始化全为1
    DP = new Array(nums.length).fill(1);
    // 遍历nums数组元素
    for (let i = 1; i < nums.length; i++) {
        // 遍历之前的元素
        for (let j = 0; j < i; j++) {
            // 如果比当前元素小，证明可以组成序列
            if (nums[j] < nums[i]) {
                // 记录当前元素能够组成的最长的序列
                DP[i] = Math.max(DP[i], DP[j] + 1)
                // 更新最长序列
                maxLength = Math.max(DP[i], maxLength)
            }
        }
    }
    // 返回结果
    return maxLength;
}