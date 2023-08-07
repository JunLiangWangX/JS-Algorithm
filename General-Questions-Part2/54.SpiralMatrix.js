/*
 * @Description: 给你一个 m 行 n 列的矩阵 matrix ，请按照 顺时针螺旋顺序 ，返回矩阵中的所有元素。
 * @Author: JunLiangWang
 * @Date: 2023-05-29 08:59:46
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-05-29 09:18:53
 */


/**
 * @description: 模拟法   TC:O(n^2)   SC:O(n^2)
 * @author: JunLiangWang
 * @param {*} matrix  给定矩阵
 * @return {*}
 */
function simulation(matrix) {
    /**
     * 该方案利用模拟法，利用循环遍历模拟矩阵顺时针螺旋顺序输出元素
     */

    // 定义方向，0:向右，1：向下，2：向左，3：向上
    let dir = 0,
        // 当前元素所在行
        row = 0,
        // 当前元素所在列，从-1开始为了方便出来开始+1的情况
        col = -1,
        // 已经遍历了多少圈，每遍历一圈，row/col的最大值则会
        // 减一
        spinCount = 0,
        // 矩阵元素总数
        numberCount = matrix.length * matrix[0].length,
        // 输出数组
        outArray = [];
    // 遍历矩阵所有元素
    while (numberCount-- > 0) {
        // 选择方向
        switch (dir) {
            // 向右
            case 0:
                col++;
                // 当达到右边界，方向变为向下
                if (col === matrix[0].length - spinCount - 1) dir++;
                break;
            // 向下
            case 1:
                row++;
                // 当达到下边界，方向变为向左
                if (row === matrix.length - spinCount - 1) dir++;
                break;
            // 向左
            case 2:
                col--;
                // 当达到左边界，方向变为向上
                if (col === spinCount) dir++;
                break;
            // 向上
            case 3:
                row--;
                // 当达到上边界，方向变为向右，并且
                // 圈数+1
                if (row === spinCount + 1) {
                    dir = 0;
                    spinCount++;
                }
                break;
        }
        // 将当前元素添加到输出数组
        outArray.push(matrix[row][col]);
    }
    // 输出
    return outArray;
}