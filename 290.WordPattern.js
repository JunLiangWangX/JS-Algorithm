/*
 * @Description: 给定一种规律 pattern 和一个字符串 s ，判断 s 是否遵循相同的规律。
 * @Author: JunLiangWang
 * @Date: 2023-11-21 09:08:23
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-11-21 09:17:36
 */



/**
 * @description: 哈希表  TC:O(n)   SC:O(n)
 * @author: JunLiangWang
 * @param {*} pattern   给定字符串
 * @param {*} s         给定字符串
 * @return {*}
 */
function hashMap(pattern, s) {
    /**
     * 本方案使用hash表的方式，利用两个哈希表分别记录
     * pattern->s与s->pattern的映射关系，最终遍历时
     * 不断判断两者映射是否相同即可
     */
    let sIndex = 0, pToSMap = new Map(), sToPMap = new Map();
    // 遍历字符串pattern
    for (let i = 0; i < pattern.length; i++) {
        // 遍历字符串s，找到空格分割的单词
        let str = ''
        for (; sIndex < s.length; sIndex++) {
            if (s[sIndex] !== ' ') str += s[sIndex]
            else if (str != '') break;
        }
        // 如果单词为空并且字符串pattern还未遍历完成，
        // 证明两者无法映射，直接返回false
        if (str == '') return false
        // 拿到各自映射的字符
        let pToSStr = pToSMap.get(pattern[i]),
            sToPStr = sToPMap.get(str);
        // 判断是否相等，不相等证明两者无法映射，直接返回false
        if ((pToSStr && pToSStr != str) || (sToPStr && sToPStr != pattern[i])) return false
        pToSMap.set(pattern[i], str)
        sToPMap.set(str, pattern[i])
    }
    // 返回结果
    return sIndex == s.length
}