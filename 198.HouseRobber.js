/*
 * @Description: 给定一个代表每个房屋存放金额的非负整数数组，计算你不触动警报装置的情况下(如果两间相邻
                 的房屋在同一晚上被小偷闯入，系统会自动报警) ，一夜之内能够偷窃到的最高金额。
 * @Author: JunLiangWang
 * @Date: 2024-02-29 10:18:25
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2024-02-29 10:36:20
 */


/**
 * @description: 动态规划  TC:O(n^2)  SC:O(n)
 * @param {*} nums  给定非负数组
 */
function dp(nums){
    /**
     * 本方案使用动态规划，对于数n而言，其
     * 最大组合为：
     *  数n+Max(数n-2最大组合数,数n-3最大组合数....数0最大组合数)
     * 例如：
     *      数组：   3 2 8  9  7  1
     * 最大组合数：  3 2 11 12 18 13
     * 以此为状态方程编写代码即可
     */

    // 如何数组长度为1，直接返回唯一元素即可
    if(nums.length==1)return nums[0]
    // 遍历数组元素
    for(let i=0;i<nums.length;i++){
        let max=0
        // 获得之前元素的最大组合数
        // Max(数n-2最大组合数,数n-3最大组合数....数0最大组合数)
        for(let j=i-2;j>=0;j--)max=Math.max(max,nums[j])
        // 计算当前元素最大组合数
        nums[i]+=max
    }
    // 返回值
    return Math.max(nums[nums.length-1],nums[nums.length-2])
}

/**
 * @description: 动态规划优化  TC:O(n)  SC:O(1)
 * @param {*} nums  给定非负数组
 */
function dpOptimization(nums){
    /**
     * 上述DP使用了数组存储结果，并且每次都会重复遍历
     * 获取之前元素的最大组合数，为此我们可以使用滚动
     * 数组进行优化，在每个时刻只需要存储前两个元素的
     * 最大组合数即可。
     */

    // 如何数组长度为1，直接返回唯一元素即可
    if(nums.length==1)return nums[0]
    // 获取前两个元素的最大组合数
    let first=nums[0],second=Math.max(nums[0], nums[1]);
    // 遍历数组
    for(let i=2;i<nums.length;i++){

        let temp=second
        // 与前二最大组合数相加计算当前元素最大组合数，与前一元素比较
        // 以获最大组合数
        second=Math.max(first+nums[i],second)
        first=temp
    }
    // 返回结果
    return second
}