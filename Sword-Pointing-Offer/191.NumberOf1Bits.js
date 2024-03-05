/*
 * @Description: 编写一个函数，输入是一个无符号整数（以二进制串的形式），返回其二进制
                 表达式中数字位数为 '1' 的个数（也被称为汉明重量）。
 * @Author: JunLiangWang
 * @Date: 2024-02-26 09:47:12
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2024-02-26 09:55:28
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


/**
 * @description: 位运算  TC:O(logn)  SC:O(1)
 * @param {*} n 给定无符号整数
 * @return {*}
 */
function bitOperations(n){
    /**
     * 本方案使用位运算的性质加速我们的检查过程，我们不断让当前的
     * n 与 n−1 做与运算，直到 n 变为 0 即可。因为每次运算会使得
     * n 的最低位的 1 被翻转，因此运算次数就等于 n 的二进制位中 
     * 1 的个数。
     */
    let count = 0;
    while (n) {
        n &= n - 1;
        count++;
    }
    return count;
}
