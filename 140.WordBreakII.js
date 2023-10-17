/*
 * @Description: 给定一个字符串 s 和一个字符串字典 wordDict ，在字符串 s 中增加空格来构建一个句子，
                 使得句子中所有的单词都在词典中。以任意顺序 返回所有这些可能的句子。
 * @Author: JunLiangWang
 * @Date: 2023-10-17 09:13:16
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-10-17 09:42:59
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


/**
 * @description: 递归回溯+记忆化搜索  TC:O(2^n)  SC:O(n)
 * @author: JunLiangWang
 * @param {*} s  给定字符串s
 * @param {*} wordDict 给定字典
 * @return {*}
 */
function memoizedSearch(s, wordDict) {
    /**
     * 上述递归回溯方式每次重新递归都需要判断索引index
     * 中存在哪些在wordDict中的子串组合，对此我们利用
     * hashMap记录下index中存在子串组合，而不用每次重
     * 新比较查询，从而进行时间复杂度上的优化
     */

    // 输出数组
    let outArray = [],
        // 记录index中存在在wordDict的子串组合，
        // key为index，value为子串数组([str1,str1])
        recordMap = new Map();

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
        // 获得hashMap中记录的该index中的子串组合
        let recordArray = recordMap.get(index)
        // 如果有记录，证明查询过，直接使用无需再次查询
        if (recordArray) {
            // 根据查询的子串组合直接递归
            recordArray.forEach((element) => {
                recursion(index + element.length, str + jiange + element)
            })
        }
        // 如果没有记录，证明未查询过，遍历字符串s查询
        else {
            let tempArray = []
            // 遍历字符串s，查看其组合的子串tempStr是否存在
            // 于wordDict中，如果存在则记录子串以及其位置，
            // 然后该位置后一位继续递归字符串s
            for (let i = index; i < s.length; i++) {
                tempStr += s[i];
                if (wordDict.includes(tempStr)) {
                    tempArray.push(tempStr)
                    recursion(i + 1, str + jiange + tempStr)
                }
            }
            // 向hashMap中添加查询后的结果
            recordMap.set(index, tempArray)
        }

    }
    // 执行递归
    recursion(0, '')
    // 返回结果
    return outArray
}