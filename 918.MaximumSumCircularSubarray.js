/*
 * @Description: 给定一个长度为 n 的环形整数数组 nums ，返回 nums 的非空 子数组 的最大可能和 。
 * @Author: JunLiangWang
 * @Date: 2024-01-16 16:13:52
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2024-01-16 16:24:47
 */


/**
 * @description: 取反  TC:O(n)  SC:O(1)
 * @author: JunLiangWang
 * @param {*} nums 给定数组
 * @return {*}
 */
function negate(nums) {
    /**
     * 本题与53.最大子数组和有些相似，但此处为环形数组，
     * 环形数组最大子数组和与一般数组的最大子数组和不同
     * 的地方在于环形数组最大子数组元素可能存在首尾两端，
     * 如下：
     * 环形数组最大子数组可能： M M M * * * * M M
     * 
     * 其实我们可以换一种思路，上述 * * * * 是否就是数组中
     * 最小子数组和呢？数组总和-最小子数组和，不就是首尾
     * 两端最大子数组和的情况吗？
     * 
     * 因此环形数组最大子数组和则等于：
     * Max(数组总和-最小子数组和，最大子数组和)
     * 
     * 分别对应以下两种情况：
     * 1.最大元素处于首位两端：M M M * * * * M M M
     * 2.最大元素连续：       * M M M M M * * * *
     * 
     */
    // 记录数组最大子数组和
    let max = nums[0],
        // 记录数组最小子数组和
        min = nums[0],
        // 记录数组总和
        sum = 0,
        // 当前连续元素最大总和
        sumMaxElement = 0,
        // 当前连续元素最小总和
        sumMinElement = 0
    // 遍历数组元素
    nums.forEach((val) => {
        // 计算数组最大子数组和
        sumMaxElement = Math.max(sumMaxElement + val, val)
        max = Math.max(max, sumMaxElement)
        // 计算数组最小子数组和
        sumMinElement = Math.min(sumMinElement + val, val)
        min = Math.min(min, sumMinElement)
        sum += val
    })
    // 如果数组最大子数组和小于等于0，证明数组总和也小于0
    // 因此直接返回max，否则比较
    return max > 0 ? Math.max(max, sum - min) : max
}