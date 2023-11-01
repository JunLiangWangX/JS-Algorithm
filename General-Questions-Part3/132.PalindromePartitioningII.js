/*
 * @Description: 给你一个字符串 s，请你将 s 分割成一些子串，使每个子串都是回文。
                 返回符合要求的 最少分割次数 。
 * @Author: JunLiangWang
 * @Date: 2023-10-08 09:51:24
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-10-08 10:02:42
 */


/**
 * @description: 动态规划   TC:O(n^2)  SC:O(n^2)
 * @author: JunLiangWang
 * @param {*} s  给定字符串
 * @return {*}
 */
function dp(s) {
    /**
     * 本方案使用两次动态规划的方法，首先利用动态规划找出字符串
     * s[i至j]是否为回文子串(0<=i,j<n)，然后再利用动态规划不断
     * 切割字符串记录最小的分割次数即可
     */
    let size = s.length,
    // 字符串S的所有子串是否为回文串的DP数组
    StrDPArray = new Array(size).fill(0).map(() =>
            new Array(size).fill(true))
    // 从后向前进行DP，这是因为对于子串s[i至j]，如果
    // s[i]==s[j]的情况下，其是否回文串是由其子串
    // s[i+1至j-1]是否为回文串决定的
    for (let i = size - 1; i >= 0; i--) {
        for (let j = i + 1; j < size; j++) {
            StrDPArray[i][j] = (s[i] == s[j] && StrDPArray[i + 1][j - 1])
        }
    }
    // 最小分割数的DP数组
    let CountDPArray = new Array(size);
    // 将子串最小分割数置为字符数，即为分割为单个字符
    for (let i = 0; i < size; i++)CountDPArray[i] = [i]
    // 遍历子串
    for (let i = 1; i < size; i++) {
        // 如果子串为回文串，直接置为0，无需分割
        if (StrDPArray[0][i]) {
            CountDPArray[i] = 0
        }
        // 否则
        else {
            // 从0分割子串，找出最小分割数 
            for (let j = 0; j < i; j++) {
                if (StrDPArray[j + 1][i]) {
                    CountDPArray[i] = Math.min(CountDPArray[i], CountDPArray[j] + 1);
                }
            }
        }
    }
    // 返回结果
    return CountDPArray[size - 1]
}