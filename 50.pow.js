/*
 * @Description: 实现 pow(x, n) ，即计算 x 的整数 n 次幂函数（即，xn ）。
 * @Author: JunLiangWang
 * @Date: 2023-05-15 09:41:15
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-05-15 10:16:12
 */



/**
 * @description: 暴力破解   TC:O(n)  SC:O(1)
 * @author: JunLiangWang
 * @param {*} x  给定幂运算指数
 * @param {*} n  给定幂运算底数
 * @return {*}
 */
function bruteForce(x,n){
    /**
     * 该方案使用暴力破解的方式，当指数n为负数时，我们可以计算x^(-n)
     * 再取倒数得到结果，因此我们只需要考虑 n 为自然数的情况即可。暴
     * 力破解即为模拟幂运算过程，遍历指数次数，结果不断乘上x即达到了
     * x*x*x........n个x相乘的结果
     */
    let exponent=n>0?n:-n,
        result=1;
    while(exponent-->0){
        result*=x;
    } 
    return n>0?result:1/result;
}