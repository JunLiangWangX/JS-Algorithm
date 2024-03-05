/*
 * @Description: 在一个由 '0' 和 '1' 组成的二维矩阵内，找到只包含 '1' 的最大正方形，并返回其面积。
 * @Author: JunLiangWang
 * @Date: 2024-03-05 10:50:05
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2024-03-05 11:13:41
 */


/**
 * @description: 动态规划  TC:O(n^2)  SC:O(n^2)
 * @param {*} matrix 给定二维数组
 */
function dp(matrix){
    /**
     * 本方案使用动态规划，定义一个名为dp的二维数组，对于数组某元素dp[i][j]
     * 表示以(i,j)为右下角，且只包含1的正方形的边长最大值。那么如何计算dp中
     * 的每个元素值呢？对于每个位置(i,j)，检查在矩阵中该位置的值：
     *    1.如果该位置的值是0，则dp[i][j]=0，因为当前位置不可能在由1组成的正方形中；
     *    2.如果该位置的值是1，则dp[i][j]的值由其上方、左方和左上方的三个相邻位置的值决定。
     *      具体而言，当前位置的元素值等于三个相邻位置的元素中的最小值加1。
     */
    if (!matrix) return 0;
    let maxSide = 0;
    let rows = matrix.length, columns = matrix[0].length;
    let dp = new Array(rows + 1).fill(0).map(() => new Array(columns + 1).fill(0));
    for (let i = 1; i <= rows; i++) {
        for (let j = 1; j <= columns; j++) {
            if (matrix[i - 1][j - 1] == 1) {
                dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]) + 1;
                maxSide = Math.max(maxSide, dp[i][j]);
            }
        }
    }
    return maxSide * maxSide;
}