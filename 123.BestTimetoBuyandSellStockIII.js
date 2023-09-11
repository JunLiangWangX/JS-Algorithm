/*
 * @Description: 给定一个数组，它的第 i 个元素是一支给定的股票在第 i 天的价格。
                 设计一个算法来计算你所能获取的最大利润。你最多可以完成 两笔 交易。
 * @Author: JunLiangWang
 * @Date: 2023-09-11 14:14:48
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-09-11 14:14:54
 */


/**
 * @description: 动态规划  TC:O(n)  SC:O(1)
 * @author: JunLiangWang
 * @param {*} prices 给定数组
 * @return {*}
 */
function dp(prices){
    let firstBuy=prices[0],
    secondBuy=-prices[0],
    firstProfit=0,
    secondProfit=0;
    for(let i=1;i<prices.length;i++){
        firstBuy=Math.min(firstBuy,prices[i]);
        firstProfit=Math.max(firstProfit,prices[i]-firstBuy);
        secondBuy=Math.max(secondBuy,firstProfit-prices[i]);
        secondProfit=Math.max(secondProfit,secondBuy+prices[i]);
    }
    return secondProfit;
}