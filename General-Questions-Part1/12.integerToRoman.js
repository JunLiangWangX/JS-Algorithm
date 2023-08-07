/*
 * @Description: 整数转罗马数字
 * @Author: JunLiangWang
 * @Date: 2023-03-08 09:10:28
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-03-08 09:25:04
 */

/**
 * @description: 贪心   TC:O(n)  SC:O(1)
 * @author: JunLiangWang
 * @param {*} num  输入的数字
 * @return {*}
 */
function greedy(num){
    // 此处根据mark[n][1]降序排列，为满足后续贪心法则
    const mark=[['M',1000],['CM',900],['D',500],['CD',400],['C',100],['XC',90],['L',50],['XL',40],
    ['X',10],['IX',9],['V',5],['IV',4],['I',1]];
    let number=num
    let roman=''
    // 此处贪心法则，从最大的进制值遍历
    for([symbol,key] of mark)
    {
        // 当number大于了当前进制值，由于使用了贪心法则（从最大的进制值开始遍历）则证明
        // 此进制值为number能满足的最大进制
        while(number>=key)
        {
            // 不断减去当前满足的最大进制，直到小于当前进制为止
            number-=key
            // 加上当前进制的roman字符
            roman+=symbol
        }
    }
    return roman
}