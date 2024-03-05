/*
 * @Description: 定两个字符串 s 和 t ，编写一个函数来判断 t 是否是 s 的字母异位词。
 * @Author: JunLiangWang
 * @Date: 2023-11-22 09:08:29
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-11-22 09:17:48
 */


/**
 * @description: 数组   TC:O(n)  SC:O(1)
 * @author: JunLiangWang
 * @param {*} s 给定字符串s
 * @param {*} t 给定字符串t
 * @return {*}
 */
function array(s, t) {
    /**
     * 本题使用数组的方式，由于字符串中仅
     * 存在小写字母，因此我们可以通过构建
     * 一个26位的数组，利用数组记录字符串
     * 中a-z的字符数量即可
     */
    // 如果两者长度不一致，肯定不为字母异位词
    if (s.length != t.length) return false
    // 定义一个26位的数组记录单词数量
    let wordList = new Array(26).fill(0)
    // 遍历字符串
    for (let i = 0; i < s.length; i++) {
        // 记录单词数量
        wordList[s.charCodeAt(i) - 97]++;
        wordList[t.charCodeAt(i) - 97]--;
    }
    // 遍历数组，如果某个单词数量不为0，则
    // 证明两字符串中该单词数量不一样
    for (let i = 0; i < 26; i++)if (wordList[i] != 0) return false
    return true
}



/**
 * @description: 哈希表  TC:O(n)  SC:O(n)
 * @author: JunLiangWang
 * @param {*} s 给定字符串s
 * @param {*} t 给定字符串t
 * @return {*}
 */
function hashMap(s, t) {
    /**
     * 本题使用哈希表的方式，与上述使用
     * 数组的方式思路一样，利用哈希表记
     * 录字符串中单词的数量
     */

    // 如果两者长度不一致，肯定不为字母异位词
    if (s.length != t.length) return false
    // 定义哈希表
    let map = new Map
    // 遍历字符串s，在hashMap中记录单词
    for (let i = 0; i < s.length; i++) {
        let count = map.get(s[i])
        map.set(s[i], count == undefined ? 1 : count + 1)
    }
    // 遍历字符串t
    for (let i = 0; i < t.length; i++) {
        let count = map.get(t[i])
        // 如果hashMap中单词数量为0，或没有
        // 这个单词，证明两字符单词数量不一致
        if (count == 0 || count == undefined) return false
        map.set(t[i], count - 1)
    }
    // 遍历hashMap，如果存在数量不为0的单词
    // 证明两字符单词数量不一致
    for (let key in map) if (map.get(key) != 0) return false

    return true
}
