/*
 * @Description: 给定字符串s根据给定的行数numRows，以从上往下、从左到右进行N字形排列，
                 之后，你的输出需要从左往右逐行读取，产生出一个新的字符串。
 * @Author: JunLiangWang
 * @Date: 2023-02-26 22:32:18
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-02-26 22:46:34
 */

/**
 * @description: 利用数组转换  TC:O(n)  SC:O(n)
 * @author: JunLiangWang
 * @param {*} s   需转换的字符串
 * @param {*} numRows  需转换的行数
 * @return {*}
 */
function arrayConversion(s,numRows)
{
    // 如果行数小于等于1则直接返回源字符串即可
    if(numRows<=1)return s
    var stringArray=new Array(numRows).fill('')
    var currentRow=0
    // 方向，true：向下，false:向上
    var direction=true
    for(let i=0;i<s.length;i++)
    {
        stringArray[currentRow]+=s[i]
        if(direction)currentRow++
        else currentRow--
        // 如果当前行到达底部or顶部，改变方向
        if(currentRow==numRows-1||currentRow==0)direction=!direction
    }
    var converString=''
    // 逐行拼接字符串
    for(let i=0;i<stringArray.length;i++)
    {
        converString+=stringArray[i]
    }
    return converString
}