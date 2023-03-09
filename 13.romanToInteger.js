/*
 * @Description: 罗马数字转整数
 * @Author: JunLiangWang
 * @Date: 2023-03-09 09:21:31
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-03-09 09:36:44
 */


/**
 * @description: 一般方法  TC:O(n)  SC:O(1)
 * @author: JunLiangWang
 * @param {*} s 输入的roman字符串
 * @return {*}
 */
function normal(s)
{
    //roman标识
    const mark={I:1,V:5,X:10,L:50,C:100,D:500,M:1000}
    //总计数
    let number=0
    //上一次数值大小，用于比对
    let last=0
    // 从字符串最后开始，因为roman字符串一般为降序
    for(let i=s.length-1;i>=0;i--)
    {
        const value=mark[s[i]]
        // 当为降序规则，则为加法
        if(value>=last)number+=value
        // 当违反了降序规则，则为减法
        else number-=value
        last=value
    }
    return number
}