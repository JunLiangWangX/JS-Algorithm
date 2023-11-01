/*
 * @Description: 给定一个三角形 triangle ，找出自顶向下的最小路径和。
 * @Author: JunLiangWang
 * @Date: 2023-09-05 10:13:44
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-09-05 11:02:54
 */

/**
 * @description: 动态规划   TC:O(n^2)  SC:O(1)
 * @author: JunLiangWang
 * @param {*} triangle  给定二维数组
 * @return {*}
 */
function dp(triangle) {
    /**
     * 该方案使用动态规划，试想如下例子：
     * 1
     * 1 2
     * 1 2 3
     * 
     * 对于第二行可得路径和为[2,3]，第三行
     * 路径和为[3,(4, 5),6],因此我们可得出
     * 对于第i行j列，其路径和为
     * f[i][j]+=f[i-1][j]  j==0
     * f[i][j]+=min(f[i-1][j],f[i-1][j-1]) j!=0
     * 
     * 根据此编写代码即可
     */
    for (let i = 1; i < triangle.length; i++) {
        triangle[i][0] += triangle[i - 1][0];
        let j = 1;
        for (; j < triangle[i].length - 1; j++) {
            triangle[i][j] += Math.min(triangle[i - 1][j], triangle[i - 1][j - 1])
        }
        triangle[i][j] += triangle[i - 1][j - 1]
    }
    return Math.min(...triangle[triangle.length - 1])
}