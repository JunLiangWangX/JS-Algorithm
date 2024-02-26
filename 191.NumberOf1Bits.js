/*
 * @Description: 编写一个函数，输入是一个无符号整数（以二进制串的形式），返回其二进制
                 表达式中数字位数为 '1' 的个数（也被称为汉明重量）。
 * @Author: JunLiangWang
 * @Date: 2024-02-26 09:47:12
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2024-02-26 09:50:02
 */


/**
 * @description: 转换为二进制字符串  TC:O(n)  SC:O(1)
 * @param {*} n 给定无符号整数
 * @return {*}
 */
function convertBinaryString(n){
    /**
     * 本方案将n转换为2进制字符串，
     * 然后遍历字符计算1的数量即可
     */
    let count=0,binaryString=n.toString(2);
    for(let i=0;i<binaryString.length;i++)binaryString[i]=='1'&&count++
    return count
}