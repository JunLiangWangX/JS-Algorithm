/*
 * @Description: 给定一个n × n的二维矩阵请你将该矩阵顺时针旋转 90 度（仅允许O(1)的空间复杂度）。
 * @Author: JunLiangWang
 * @Date: 2023-05-11 17:31:13
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-05-11 22:01:51
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
        // 遍历矩阵列，对角线翻转
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


/**
 * @description: 四角旋转  TC:O(n^2)  SC:O(1)
 * @author: JunLiangWang
 * @param {*} matrix 给定矩阵
 * @return {*}
 */
function fourCornerRotation(matrix){
    /**
     * 该算法利用四角旋转的方式，相较于上一算法减少了许多重复
     * 位移，由于最近刚刚阳康，脑子感觉特别不够用，难以使用语
     * 言表达出该算法，可能需要各位自行利用例子体会算法过程才
     * 能理解该算法
     */
    let l=matrix.length
    for(let i=0;i<Math.floor(l/2);++i){
        for(let j=i;j<l-1-i;++j){
            let temp=matrix[i][j]
            matrix[i][j]=matrix[l-1-j][i]
            matrix[l-1-j][i]=matrix[l-1-i][l-1-j]
            matrix[l-1-i][l-1-j]=matrix[j][l-1-i]
            matrix[j][l-1-i]=temp
        }
    }
}