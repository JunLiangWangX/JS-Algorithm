/*
 * @Description: 给定一个n × n的二维矩阵请你将该矩阵顺时针旋转 90 度（仅允许O(1)的空间复杂度）。
 * @Author: JunLiangWang
 * @Date: 2023-05-11 17:31:13
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-05-11 19:52:32
 */



/**
 * @description: 对角线+水平翻转   TC:O(n^2)  SC:O(1)
 * @author: JunLiangWang
 * @param {*} matrix  给定矩阵
 * @return {*}
 */
function diagonalHorizontalRotation(matrix)
{
    /**
     *  顺时针旋转90°可通过对角线翻转+水平翻转实现，
     *  顺手拿下身边的物体模拟即可理解。
     */

    // 遍历矩阵行
    for(let i=0;i<matrix.length;i++)
    {
        // 遍历矩阵列，对角线翻转，因此从对线后一列元素
        // 翻转即可， 由于矩阵为正方形，因此此处也可以
        // 使用matrix.length比较
        for(let j=i+1;j<matrix.length;j++)
        {
            // 元素对换，实现对角线翻转
            [matrix[i][j],matrix[j][i]]=[matrix[j][i],matrix[i][j]]
        }
        // 遍历矩阵列，实现水平翻转
        for(let j=0;j<(matrix.length-1)/2;j++)
        {
            // 元素对换，实现水平翻转
            [matrix[i][j],matrix[i][matrix.length-1-j]]=
            [matrix[i][matrix.length-1-j],matrix[i][j]]
        }
    }
    // 返回结果
    return matrix;
}