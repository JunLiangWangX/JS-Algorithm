/*
 * @Description: 给定一个 m x n 的矩阵，如果一个元素为 0 ，则将其所在行和列的所有元素都设为 0 。请使用 原地 算法。
 * @Author: JunLiangWang
 * @Date: 2023-06-20 08:57:13
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-06-20 09:12:14
 */



/**
 * @description: 两次扫描   TC:O(n^2)  SC:O(n)
 * @author: JunLiangWang
 * @param {*} matrix
 * @return {*}
 */
function twoScans(matrix){
    /**
     * 本方案使用两次扫描的方式，定义两数组(row,col)，其长度等于
     * 矩阵的行/列数，遍历矩阵所有元素，当矩阵元素Matrix[i][j]等
     * 于0时，则将row[i]与col[j]置为true，表示i行/j列出现了0，
     * 直至遍历完矩阵所有元素。
     * 
     * 随后第二次遍历矩阵元素，当矩阵元素Matrix[i][j]的行或列存在
     * 0时，即row[i]===true或col[j]===true，则将该元素置为0
     */
    const m = matrix.length, n = matrix[0].length;
    // 定义两数组(row,col)，记录矩阵某行/某列出现了0
    const row = new Array(m).fill(false);
    const col = new Array(n).fill(false);
    // 遍历矩阵所有元素，当矩阵元素Matrix[i][j]等于0时，
    // 则将row[i]与col[j]置为true，表示i行/j列出现了0。
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (matrix[i][j] === 0) {
                row[i] = col[j] = true;
            }
        }
    }
    // 第二次遍历矩阵元素，当矩阵元素Matrix[i][j]的行或
    // 列存在0时，即row[i]===true或col[j]===true，则将
    // 该元素置为0
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (row[i] || col[j]) {
                matrix[i][j] = 0;
            }
        }
    }
}
