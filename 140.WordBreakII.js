/*
 * @Description: 给定一个字符串 s 和一个字符串字典 wordDict ，在字符串 s 中增加空格来构建一个句子，
                 使得句子中所有的单词都在词典中。以任意顺序 返回所有这些可能的句子。
 * @Author: JunLiangWang
 * @Date: 2023-10-17 09:13:16
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-10-17 09:36:23
 */



/**
 * @description: 递归回溯   TC:O(2^n*n)  SC:O(n)
 * @author: JunLiangWang
 * @param {*} s   给定字符串s
 * @param {*} wordDict 给定字典
 * @return {*}
 */
function recursionBackTracking(s, wordDict) {
    /**
     * 本方案使用递归回溯的方式，遍历字符串s，当
     * 遍历子串存在wordDict中，则记录子串以及其位
     * 置，然后该位置后一位继续递归字符串s,并重复
     * 上述步骤，直到遍历完成字符串s，则获得结果
     */

    // 输出数组
    let outArray = [];

    /**
     * @description: 递归
     * @author: JunLiangWang
     * @param {*} index 开始遍历索引
     * @param {*} str   已组成的字符串
     * @return {*}
     */    
    function recursion(index, str) {
        // 如果索引超出数组长度，证明遍历完成
        // 此时将结果添加到输出数组
        if (index >= s.length) {
            outArray.push(str)
            return;
        }
        // 存放组合的子串
        let tempStr = '', 
        // 空格，如果为开头则不需要空格
        interval = index == 0 ? '' : ' '
        // 遍历字符串s，查看其组合的子串tempStr是否存在
        // 于wordDict中，如果存在则记录子串以及其位置，
        // 然后该位置后一位继续递归字符串s
        for (let i = index; i < s.length; i++) {
            tempStr += s[i];
            if (wordDict.includes(tempStr)) {
                recursion(i + 1, str + interval + tempStr)
            }
        }
    }
    // 执行递归
    recursion(0, '')
    // 返回结果
    return outArray
}