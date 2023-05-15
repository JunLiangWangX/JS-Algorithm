/*
 * @Description: 给你一个整数x，如果x是一个回文整数，返回true；否则返回false。
 * @Author: JunLiangWang
 * @Date: 2023-03-01 09:22:51
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-03-01 09:29:05
 */


/**
 * @description: 翻转法    TC:O(n)  SC:O(1)
 * @author: JunLiangWang
 * @param {*} x
 * @return {*}
 */
function overTurn(x)
{
    // 利用回文数左右对称的原理，即将回文数翻转后仍等于未翻转时数值

    // 转换为字符串
    let xString=x.toString()
    // 翻转字符串存放变量
    let overTurnString=''
    // 翻转字符串
    for(let item of xString)overTurnString=item+overTurnString
    // 如果翻转后仍等于翻转前则为回文数，否则不为。
    return xString==overTurnString
}