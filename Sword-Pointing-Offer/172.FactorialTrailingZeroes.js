/*
 * @Description: 给定一个整数 n ，返回 n! 结果中尾随零的数量。
 * @Author: JunLiangWang
 * @Date: 2024-02-28 09:31:46
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2024-02-28 09:42:03
 */


/**
 * @description: 数学方法  TC:O(logn)  SC:O(1)
 * @param {*} n 给定整数n
 */
function mathMethod(n){
    /**
     * 本题题意为阶乘后的结果的结尾有几个连续的0
     * 其实也就是能被10整除多少次。换句话说n的因子
     * 中有多少个数相乘能得10，对于其因子而言只有
     * 2*5的倍数，以及10*1的倍数能够得10，因此我们
     * 不断对n/5即可得到阶乘结果得结尾有几个连续的0
     */
    let count=0;
    while(n!=0){
        n=Math.floor(n/5)
        count+=n
    }
    return count
}