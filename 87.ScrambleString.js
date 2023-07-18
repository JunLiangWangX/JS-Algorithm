/*
 * @Description: 你两个 长度相等 的字符串 s1 和 s2，判断 s2 是否是 s1 的扰乱字符串。如果是，返回 true ；否则，返回 false 。
 * @Author: JunLiangWang
 * @Date: 2023-07-18 08:49:26
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-07-18 09:03:15
 */


/**
 * @description: 递归回溯   TC:O(2^n)  SC:O(1)
 * @author: JunLiangWang
 * @param {*} s1  给定字符串s1
 * @param {*} s2  给定字符串s2
 * @return {*}
 */
function recursionBacktracking(s1, s2) {
    /**
     * 该方案使用递归回溯模拟生成扰乱字符串过程
     */

    // 如果两字符串相等，s2则为s1的扰乱字符串
    if (s1 == s2) return true;
    // 如果两字符串长度不相等，s2则不为s1的扰乱字符串
    if (s1.length != s2.length) return false;

    // 从索引1(由于索引0的情况s1==s2已判断)遍历两字符
    // 串(s1,s2长度相等，因此使用s1的长度即可)
    for (let i = 1; i < s1.length; i++) {
        // 从i处分割字符串s1，preString为前缀
        // lastString为后缀
        const preString = s1.substr(0, i),
            lastString = s1.substr(i),
        // 从i处分割字符串s2，comparePreString为前缀
        // compareLastString为后缀
            comparePreString = s2.substr(0, i),
            compareLastString = s2.substr(i);
        // 判断无交换的情况，即:s2=preString+lastString，继续
        // 递归判断preString是否comparePreString的扰乱字符串
        // lastString是否compareLastString的扰乱字符串，如果是
        // 证明s2为s1的扰乱字符串，此时返回true
        if (recursionBacktracking(preString, comparePreString) && recursionBacktracking(lastString, compareLastString)) return true;
        // 否则判断有交换的情况，即:s2=lastString+preString,

        // 从后到前以i位置分割字符串，获得交换后的preString，lastString
        const exchangeComparePreString = s2.substr(0, s2.length - i),
            exchangeCompareLastString = s2.substr(s2.length - i);
        // 继续递归判断preString是否exchangeCompareLastString的扰乱字符串
        // lastString是否exchangeComparePreString的扰乱字符串，如果是
        // 证明s2为s1的扰乱字符串，此时返回true
        if (recursionBacktracking(preString, exchangeCompareLastString) && recursionBacktracking(lastString, exchangeComparePreString)) return true
    }
    // 如果遍历完成仍无，则返回false
    return false;
}