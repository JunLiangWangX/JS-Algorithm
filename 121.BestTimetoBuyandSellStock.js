/*
 * @Description: 定一个数组 prices ，它的第 i 个元素 prices[i] 表示一支给定股票第 i 天的价格。
                 你只能选择 某一天 买入这只股票，并选择在 未来的某一个不同的日子 卖出该股票。设
                 计一个算法来计算你所能获取的最大利润。
 * @Author: JunLiangWang
 * @Date: 2023-09-07 09:40:57
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-09-07 09:56:05
 */

/**
 * @description: 暴力破解   TC:O(n^2)  SC:O(1)
 * @author: JunLiangWang
 * @param {*} prices 给定数组
 * @return {*}
 */       
function bruteForce(prices){
    /**
     * 该方案使用暴力破解法，利用嵌套遍历数组所有元素
     * 以及与其之后元素的差值，最大的差值即为最大利润
     */

    // 记录最大利润
    let max=0
    // 遍历所有元素
    for(let i=0;i<prices.length;i++)
    {
        // 遍历当前元素之后的元素
        for(let j=i+1;j<prices.length;j++)
        {
           // 计算差值
           let DValue=prices[j]-prices[i]
           // 更新最大差值
           if(DValue>max)max=DValue
        }
    }
    // 返回结果
    return max
}

