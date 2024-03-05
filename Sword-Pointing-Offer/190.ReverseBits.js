/*
 * @Description: 颠倒给定的 32 位无符号整数的二进制位。
 * @Author: JunLiangWang
 * @Date: 2024-02-23 09:31:21
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2024-02-23 09:32:53
 */


/**
 * @description: 逐位颠倒  TC:O(logn)  SC:O(1)
 * @param {*} n 给定32位无符号整数
 * @return {*}
 */
function reverseBits(n) {
    let rev = 0;
    for (let i = 0; i < 32 && n > 0; ++i) {
        rev |= (n & 1) << (31 - i);
        n >>>= 1;
    }
    return rev >>> 0;
};