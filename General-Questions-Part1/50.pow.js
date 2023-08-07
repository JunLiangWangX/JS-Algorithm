/*
 * @Description: 实现 pow(x, n) ，即计算 x 的整数 n 次幂函数（即，xn ）。
 * @Author: JunLiangWang
 * @Date: 2023-05-15 09:41:15
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-05-15 10:25:32
 */



/**
 * @description: 暴力破解   TC:O(n)  SC:O(1)
 * @author: JunLiangWang
 * @param {*} x  给定幂运算指数
 * @param {*} n  给定幂运算底数
 * @return {*}
 */
function bruteForce(x, n) {
    /**
     * 该方案使用暴力破解的方式，当指数n为负数时，我们可以计算x^(-n)
     * 再取倒数得到结果，因此我们只需要考虑 n 为自然数的情况即可。暴
     * 力破解即为模拟幂运算过程，遍历指数次数，结果不断乘上x即达到了
     * x*x*x........n个x相乘的结果
     */
    let exponent = n > 0 ? n : -n,
        result = 1;
    while (exponent-- > 0) {
        result *= x;
    }
    return n > 0 ? result : 1 / result;
}


/**
 * @description: 快速幂   TC:O(logn)  SC:O(1)
 * @author: JunLiangWang
 * @param {*} x  给定幂运算指数
 * @param {*} n  给定幂运算底数
 * @return {*}
 */
function fastPower(x, n) {
    /**
     * 本方案采用快速幂，上述暴力破解算法是一个x逼近x^n，我们可以
     * 考虑采用成倍递增的方式逼近x^n，即x -> x^2 -> x^4 -> x^8
     */

    // 指数为负数转为正数处理
    let exponent = n > 0 ? n : -n,
        //  初始化结果为1
        result = 1;
    // 当指数小于等于0，证明
    while (exponent > 0) {
        // 如果指数二进制表示的最低位为1，那么需要计入结果统计
        if (exponent % 2 === 1) result *= x
        // 成倍递增逼近
        x *= x
        // 舍弃指数二进制表示的最低位，这样我们每次只要判断最低位即可
        exponent = Math.floor(exponent / 2)
    }
    // 返回结果
    return n > 0 ? result : 1 / result;
}