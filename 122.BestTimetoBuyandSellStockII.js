/*
 * @Description: 你一个整数数组 prices ，其中 prices[i] 表示某支股票第 i 天的价格。
                 在每一天，你可以决定是否购买和/或出售股票。你在任何时候 最多 只能持
                 有 一股 股票。你也可以先购买，然后在 同一天 出售。返回 你能获得的最
                 大利润。
 * @Author: JunLiangWang
 * @Date: 2023-09-08 09:31:14
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-09-08 09:43:51
 */


/**
 * @description: 贪心算法   TC:O(n)  SC:O(1)
 * @author: JunLiangWang
 * @param {*} prices 给定数组
 * @return {*}
 */
function greedy(prices) {
    /**
     * 该方案使用贪心算法，我们可以根据第二天
     * 涨跌情况来决定今天是否购入股票，如果第
     * 二天跌了，今天就不购入，如果第二天涨了
     * 今天则购入。
     * 
     * 我们假设购入了第一天的股票，如果第二天涨
     * 了则记录利润，然后再次购入第二天的股票。
     * 如果跌了，我们则只购入第二天的股票，上述
     * 假设失败。以此类推，直至最后一天。
     * 
     */

    // 如果天数少于两天无法盈利，直接返回0
    if (prices.length < 2) return 0
    // 我们假设购入第一天股票
    let buy = prices[0],
    // 记录利润
        profit = 0;
    // 从第二天开始遍历直到最后一天
    for (let i = 1; i < prices.length; i++) {
        // 如果明天的股票涨了，假设成立
        if (prices[i] > buy) {
            // 计算利润
            profit += (prices[i] - buy)
        }
        // 如果明天的股票跌了，假设失败
        // 我们不需要进行任何操作

        // 将购入股票刷新为明天的股票，继续遍历
        buy = prices[i]
    }
    // 返回利润
    return profit;
}