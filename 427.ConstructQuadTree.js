/*
 * @Description: 给你一个 n * n 矩阵 grid ，矩阵由若干 0 和 1 组成。请你用四叉树表示该矩阵 grid 。
 * @Author: JunLiangWang
 * @Date: 2024-01-15 10:18:13
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2024-01-15 10:32:43
 */


/**
 * @description: 递归回溯   TC:O(n^2)  SC:O(n^2)
 * @author: JunLiangWang
 * @param {*} grid 给定矩阵
 * @return {*}
 */
function recursionBacktracking(grid) {
    /**
     * 本方案使用递归回溯的方式，将矩阵不断行列递归2分，
     * 直到长度为1，然后回溯过程将4个矩阵合并为1个，构
     * 造节点。
     */

    /**
     * @description: 递归
     * @author: JunLiangWang
     * @param {*} startRow 开始行索引
     * @param {*} startCol 开始列索引
     * @param {*} length   矩阵长度
     * @return {*}
     */
    function recursion(startRow, startCol, length) {
        // 直到长度为1，构造节点返回
        if (length == 1) return new Node(grid[startRow][startCol], true);
        // 2分行列
        let cuLength = length / 2,
        // 继续递归，获得左右上/左右下的矩阵节点
            nodeList = [recursion(startRow, startCol, cuLength),
            recursion(startRow, startCol + cuLength, cuLength),
            recursion(startRow + cuLength, startCol, cuLength),
            recursion(startRow + cuLength, startCol + cuLength, cuLength)]
        // 根据规则，合并4个矩阵，构造节点
        for (let i = 0; i < 4; i++) {
            // 如果子矩阵ifLeaf为false，或者其值不相等，则需要将其作为子节点
            if (!nodeList[i].isLeaf || (i != 0 && nodeList[i].val != nodeList[i - 1].val)) {
                return new Node(grid[startRow][startCol], false, nodeList[0],
                    nodeList[1], nodeList[2], nodeList[3])
            }
        }
        // 如果子矩阵ifLeaf为true，且其值全等，则需要子节点全为null，其isLeaf也为true
        return new Node(grid[startRow][startCol], true);
    }

    // 执行递归返回节点
    return recursion(0, 0, grid.length)
}
