/*
 * @Description: 给你一个字符串 s，移除所有非字母数字字符之后，
                 如果它是 回文串 ，返回 true ；否则，返回 false 。
 * @Author: JunLiangWang
 * @Date: 2023-09-13 09:27:52
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-09-13 09:32:22
 */


/**
 * @description: 双指针   TC:O(n)  SC:O(1)
 * @author: JunLiangWang
 * @param {*} s  给定字符串
 * @return {*}
 */
function doublePoint(s) {
    /**
     * 该方案使用双指针的方式，先将字符串转换为小写，
     * 然后使用正则排除0-9 a-z以外的字符，最后通过
     * 双指针，first指向首个字符，last指向最后一个字
     * 符，两指针不断向中间靠拢，如果所指字符不一样证
     * 明不是回文字符串，如果遍历完成所指字符全一样，
     * 则证明该字符串是回文串。
     */

    // 先将字符串转换为小写，然后使用正则排除0-9 a-z以外的字符
    s = s.toLowerCase().replace(/[^0-9a-z]/g, '');
    // 通过双指针，first指向首个字符，last指向最后一个字
    // 符，两指针不断向中间靠拢，如果所指字符不一样证
    // 明不是回文字符串，直接返回false
    for (let first = 0, last = s.length - 1; first < last; first++, last--)
        if (s[first] != s[last]) return false
    // 如果所指字符全一样，则证明该字符串是回文串,返回true
    return true;
}