/*
 * @Description: 给定一个 m x n 二维字符网格 board 和一个单词（字符串）列表 words， 
                 返回所有二维网格上的单词 。
 * @Author: JunLiangWang
 * @Date: 2024-01-12 11:55:26
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2024-01-12 12:08:21
 */


/**
 * @description: 前缀树
 * @author: JunLiangWang
 * @param {*} board 给定矩阵
 * @param {*} words 单词列表
 * @return {*}
 */
function trie(board, words) {
    // 前缀树
    let wordMap = {}
    /**
     * @description: 将字符串转换为前缀树
     * @author: JunLiangWang
     * @param {*} node 当前节点
     * @param {*} str 字符串
     * @param {*} index 索引
     * @return {*}
     */
    function strToMap(node, str, index) {
        // 如果索引超出字符串长度直接return
        if (str.length == index) {
            // 标记当前单词为结尾
            node.end = true
            return
        }
        // 如果树中无该单词则new
        if (node[str[index]] == undefined) node[str[index]] = {}
        // 递归
        strToMap(node[str[index]], str, index + 1)
    }
    // 将单词列表转换为前缀树
    words.forEach((val) => {
        strToMap(wordMap, val, 0)
    })
    // 输出数组
    let outArray = [],
        // 记录已找到的单词
        resultMap = new Map(),
        // 记录已找过的字符
        map = new Array(board.length).fill(0).map(() => new Array(board[0].length).fill(0))
    /**
     * @description: 递归实现dfs
     * @author: JunLiangWang
     * @param {*} node 当前节点
     * @param {*} str  已走过的单词
     * @param {*} i    矩阵横索引
     * @param {*} j    矩阵列索引
     * @return {*}
     */
    function recursion(node, str, i, j) {
        // 当前走到的字符
        let char = board[i][j]
        // 如果该字符在字典树该节点中不存在，
        // 则证明无该单词，直接return
        if (!node[char]) return
        // 如果该节点为end，证明已找到单词
        if (node[char].end) {
            // 如果该单词未找到过，则直接push到结果
            if (!resultMap.get(str + char)) outArray.push(str + char)
            resultMap.set(str + char, true)
        }
        // 标记已走过矩阵该字符
        map[i][j] = 1
        // 左右上下递归
        if (i - 1 >= 0 && map[i - 1][j] == 0) recursion(node[char], str + char, i - 1, j)
        if (i + 1 < board.length && map[i + 1][j] == 0) recursion(node[char], str + char, i + 1, j)
        if (j - 1 >= 0 && map[i][j - 1] == 0) recursion(node[char], str + char, i, j - 1)
        if (j + 1 < board[0].length && map[i][j + 1] == 0) recursion(node[char], str + char, i, j + 1)
        // 重置为未走过
        map[i][j] = 0
    }
    // 遍历执行dfs
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            recursion(wordMap, '', i, j)
        }
    }
    // 返回结果
    return outArray
}