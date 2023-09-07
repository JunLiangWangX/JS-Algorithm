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


/**
 * @description: 一次遍历  TC:O(n)  SC:O(1)
 * @author: JunLiangWang
 * @param {*} prices 给定数组
 * @return {*}
 */
function traverseOnce(prices){
    /**
     * 我们可对上述暴力破解进行进一步优化，使用一次遍历
     * 即可得出答案，我们只需要定义一个变量，在遍历过程
     * 中不断记录最小值，然后以此来计算利润差即可
     */

    if(prices.length<2)return 0
    // 初始化最小值为首个元素
    let minPrices=prices[0],
    // 初始化最大利润为0
    maxProfit=0;
    // 从第二个元素开始遍历数组
    for(let i=1;i<prices.length;i++){
        // 如果当前元素为最小值，则更新最小值
        if(prices[i]<minPrices)minPrices=prices[i]
        // 不是，则计算并更新最大利润
        else maxProfit=Math.max(maxProfit,prices[i]-minPrices)
    }
    // 返回最大利润
    return maxProfit;
}