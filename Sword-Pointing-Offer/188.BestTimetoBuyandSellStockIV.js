/*
 * @Description: 给你一个整数数组 prices 和一个整数 k ，其中 prices[i] 是某支给定的股票在第 i 天的价格。
                 设计一个算法来计算你所能获取的最大利润。你最多可以完成 k 笔交易。也就是说，你最多可以买 
                 k 次，卖 k 次。注意：你不能同时参与多笔交易（你必须在再次购买前出售掉之前的股票）。
 * @Author: JunLiangWang
 * @Date: 2024-03-04 10:04:06
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2024-03-04 10:16:19
 */



/**
 * @description: 动态规划  TC:O(n^2)  SC:O(n)
 * @param {*} k  给定一个整数，表示买卖次数
 * @param {*} prices 给定一个数组，表示股票趋势
 */
function dp(k,prices){
    /**
     * 本方案使用DP,定义两数组buy、profit，buy中
     * 元素表示，第n次买入后的剩余利润，buy[0]除
     * 外，buy[0]表示第1次买入的成本；  profit中
     * 元素表示第n次卖出后的利润。
     * 
     * 其中
     * 
     *  buy[0]=min(prices[i],buy[0])
     *  profit[0]=max(prices[i]-buy[0], profit[0])
     * 
     *  buy[n]=max(profit[n-1]-prices[i],buy[n])
     *  profit[n]=max(buy[n]+prices[i],profit[n])
     * 
     * 
     * 这是买卖股票的模板，无论1次、2次还是k次
     * 都可以使用这份模板实现。
     */
    let buy=new Array(k).fill(-prices[0]),
    profit=new Array(k).fill(0);
    buy[0]=prices[0]
    for(let i=1;i<prices.length;i++){
        buy[0]=Math.min(buy[0],prices[i])
        profit[0]=Math.max(profit[0],prices[i]-buy[0])
        for(let j=1;j<k;j++){
            buy[j]=Math.max(buy[j],profit[j-1]-prices[i])
            profit[j]=Math.max(profit[j],buy[j]+prices[i])
        }
    }
    return profit[k-1];
}