/*
 * @Description: 给定一个 m x n 二维字符网格 board 和一个字符串单词 word 。
                 如果 word 存在于网格中，返回 true ；否则，返回 false 。单
                 词必须按照字母顺序，通过相邻的单元格内的字母构成，其中“相邻”
                 单元格是那些水平相邻或垂直相邻的单元格。同一个单元格内的字母
                 不允许被重复使用。
 * @Author: JunLiangWang
 * @Date: 2023-07-03 09:30:30
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-07-03 09:50:00
 */


/**
 * @description: 递归回溯   TC:O(2^n)  SC:O(n^2)
 * @author: JunLiangWang
 * @param {*} board  给定二维矩阵
 * @param {*} word   给定字符串单词
 * @return {*}
 */
function recursionBackTracking(board, word) {
    /**
     * 该方案使用递归回溯模拟选择word单词过程
     */
    
    // 矩阵高度
    let m = board.length,
    // 矩阵宽度
     n = board[0].length;
    // 如果矩阵字符数量小于单词字符数量，证明无法
    // 从矩阵中找到单词，直接返回false
    if (m * n < word.length) return false

    /**
     * @description: 递归
     * @author: JunLiangWang
     * @param {*} row   矩阵当前行索引
     * @param {*} col   矩阵当前列索引
     * @param {*} index 单词当前索引 
     * @param {*} list  在矩阵中已选中的单词列表（二维矩阵的一维映射）
     * @return {*}
     */    
    function recursion(row, col, index, list) {
        // 如果行/列索引超过范围，或矩阵当前元素不等于word当前元素，直接返回false
        if (row < 0 || col < 0 || row >= m || col >= n || board[row][col] != word[index]) return false;
        // 由于list是二维矩阵的一维映射，因此在二维矩阵元素在list的位置为：row*n+col;
        let cuIndex = row * n + col;
        // 如果当前索引等于word最后一个单词索引，证明已找到所有单词，直接返回true
        if (index == word.length - 1) return true;
        // 在list中记录矩阵该元素已被选中
        list[cuIndex] = true;

        // 如果下一个元素未被选中，使用下一个元素继续递归
        if (list[cuIndex + n] == false && recursion(row + 1, col, index + 1, [...list]))
            return true;
        // 如果上一个元素未被选中，使用上一个元素继续递归
        if (list[cuIndex - n] == false && recursion(row - 1, col, index + 1, [...list]))
            return true;
        // 如果右一个元素未被选中，使用右一个元素继续递归
        if (list[cuIndex + 1] == false && recursion(row, col + 1, index + 1, [...list]))
            return true;
        // 如果左一个元素未被选中，使用左一个元素继续递归
        if (list[cuIndex - 1] == false && recursion(row, col - 1, index + 1, [...list]))
            return true;
        // 所有递归仍无法满足，直接返回false
        return false;
    }

    // 遍历矩阵元素，从左到右/从上到下以其为开始点执行递归
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            // 如果递归结果为true，证明已找到所有元素，返回true
            if (recursion(i, j, 0, new Array(m * n).fill(false))) return true;
        }
    }
    // 遍历所有元素仍未满足，则返回false 
    return false;
}