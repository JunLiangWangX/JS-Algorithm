/*
 * @Description: 给定一个仅包含 0 和 1 、大小为 rows x cols 的二维二进制矩阵，
                 找出只包含 1 的最大矩形，并返回其面积。
 * @Author: JunLiangWang
 * @Date: 2023-07-11 14:11:49
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-07-11 14:39:01
 */


/**
 * @description: 暴力破解   TC:O(n^3)  SC:O(n^2)
 * @author: JunLiangWang
 * @param {*} matrix  给定矩阵
 * @return {*}
 */
function bruteForce(matrix) {
    /**
     * 该方案使用暴力破解，我们首先计算出矩阵的每个元素的上边连续 1 的数量
     * 例如:
     *     matrix=  1 0 1 0 0
     *              1 0 1 1 1
     *              1 1 1 1 1 
     *              1 0 0 1 0
     * 
     * 计算矩阵每个元素的上边连续1的数量
     * 
     *    rect=  1 0 1 0 0
     *           2 0 2 1 1
     *           3 1 3 2 2
     *           4 0 0 3 0
     * 
     * 我们可以通过遍历rect中的每个元素，将每个元素都假设为矩阵的右下角端点，
     * 我们已经知道该行左边所有元素的高度，我们即可向左遍历元素获得所有高度，
     * 然后以最小的高度计算出该元素作为矩阵右下角端点能获得的最大面积
     * 
     */

    // 原矩阵高度
    let m = matrix.length,
    // 原矩阵长度
        n = matrix[0].length,
    // 定义新的矩阵，记录每个元素的上边连续的1的数量
        rect = new Array(m).fill(0).map(() => new Array(n).fill(0)),
    // 记录最大面积
        maxArea = 0;
    
    // 遍历原有矩阵，计算矩阵每个元素的上边连续1的数量
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            // 如果当前元素等于1，其上边连续1的数量等于
            // 上一个元素上边连续1的数量+1
            if (matrix[i][j] == 1) {
                rect[i][j] = (i > 0 ? rect[i - 1][j] : 0) + 1
            }
            // 当前元素等于0则不连续，默认为0
        }
    }
    // 遍历新的矩阵所有元素
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            // 如果当前元素等于0，证明其高度为0，
            // 以它为矩阵右下角端点面积为0，跳过
            if (rect[i][j] == 0) {
                continue;
            }
            // 否则其高度不为0

            // 将高度赋值为当前元素值
            let height = rect[i][j];
            // 向左遍历所有元素，获得每个元素的高度，以最小高度计算
            // 该元素作为矩阵右下角端点能获得的最大面积
            for (let k = j; k >= 0; k--) {
                height = Math.min(height, rect[i][k]);
                maxArea = Math.max(maxArea, (j - k + 1) * height);
            }
        }
    }
    // 返回结果
    return maxArea;
}