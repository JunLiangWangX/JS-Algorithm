/*
 * @Description: 给你一个整数数组 coins ，表示不同面额的硬币；以及一个整数 amount ，表示总金额。
                 计算并返回可以凑成总金额所需的 最少的硬币个数 。如果没有任何一种硬币组合能组成
                 总金额，返回 -1 。你可以认为每种硬币的数量是无限的。
 * @Author: JunLiangWang
 * @Date: 2024-03-01 16:39:30
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2024-03-01 16:54:31
 */


/**
 * @description: 深度优先  TC:O(n^3)  SC:O(n)
 * @param {*} coins  给定整数数组
 * @param {*} amount 给定整数
 */
function dfs(coins, amount) {
    /**
     * 本方案使用深度优先，利用递归不断对amount
     * 减去所有硬币面额，直到amount小于等于0结束
     * 递归，等于0证明硬币能够组成总金额，然后记
     * 录比较最小硬币数即可，小于0证明硬币无法组
     * 成总金额无需处理
     */

    // 记录组成总金额的最小硬币数
    let minCount = Infinity
    /**
     * @description: 递归实现深度优先
     * @param {*} diff 当前剩余总金额
     * @param {*} count 已组合的硬币数量
     */
    function recursion(diff, count) {
        // 如果当前剩余总金额等于0，证明硬币能够
        // 组成总金额，然后记录比较最小硬币数，
        // 结束递归
        if (diff == 0) {
            minCount = Math.min(minCount, count)
            return
        }
        // 如果当前剩余总金额小于0证明硬币无法组
        // 成总金额无需处理结束递归
        if (diff < 0) return
        // 否则，不断对amount减去所有硬币面额，继续递归
        for (let coin of coins) dfs(diff - coin, count + 1)
    }
    // 执行递归
    recursion(amount, 0)
    // 返回结果
    return minCount == Infinity ? -1 : minCount;
}