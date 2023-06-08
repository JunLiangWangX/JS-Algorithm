/*
 * @Description: 一个机器人位于一个 m x n 网格的左上角 （起始点在下图中标记为 “Start” ）。
                 机器人每次只能向下或者向右移动一步。机器人试图达到网格的右下角（在下图中标
                 记为 “Finish”）。现在考虑网格中有障碍物。那么从左上角到右下角将会有多少条
                 不同的路径？网格中的障碍物和空位置分别用 1 和 0 来表示。
 * @Author: JunLiangWang
 * @Date: 2023-06-08 08:59:25
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-06-08 09:29:52
 */



/**
 * @description: dfs  TC:O(2^n)  SC:O(1)
 * @author: JunLiangWang
 * @param {*} obstacleGrid  给定m x n网格
 * @return {*}
 */
function dfs(obstacleGrid) {
    /**
     * 该方案使用深度优先遍历的方式，使用递归模拟机器人行进过程
     */

    // 记录路径数量
    let pathCount = 0,
        // x最大值
        maxX = obstacleGrid[0].length - 1,
        // y最大值
        maxY = obstacleGrid.length = 1;
    /**
     * @description: 递归回溯算法
     * @author: JunLiangWang
     * @param {*} x   当前机器人X坐标
     * @param {*} y   当前机器人Y坐标
     * @return {*}
     */
    function recursionBacktracking(x, y) {
        // 如果当前路径为石头，直接返回
        if (obstacleGrid[y][x] === 1) return;
        // 当机器人到达终点
        if (y === maxY && x === maxX) {
            // 路径数量加1
            pathCount++;
            return;
        }
        // 如果未达到终点

        // 如果并未达到横坐标边界，则x+1继续递归
        if (y < maxY) recursionBacktracking(x, y + 1);
        // 如果并未达到纵坐标边界，则y+1继续递归
        if (x < maxX) recursionBacktracking(x + 1, y);
    }
    // 执行递归
    recursionBacktracking(0, 0);
    // 返回结果
    return pathCount;
}


/**
 * @description:  动态规划   TC:O(n^2)  SC:O(n^2)
 * @author: JunLiangWang
 * @param {*} obstacleGrid 给定m x n网格
 * @return {*}
 */
function dp(obstacleGrid) {
    /**
     * 该方案使用动态规划的方式，定义一个(m+1)*(n+1)的矩阵(DPArray)，其中矩阵的
     * 某一个元素，例如DPArray[i][j]表示到达(j,i)总共有多少条路径，已知
     * 机器人只能向下/向右移动，因此到达(j,i)有多少条路径就等于到达上一格
     * 即(j-1,i)与到达左一格即(j,i-1)的路径数量之和，公式则为：
     * DPArray[i][j]=DPArray[i-1][j]+DPArray[i][j-1]，之所以是定义(m+1)*(n+1)的
     * 矩阵就是方便该处获取到DPArray[i-1][j]与DPArray[i][j-1]的值，如果
     * obstacleGrid[i-1][j-1]等于1，证明当前坐标有障碍物，此时DPArray[i][j]应等于0。
     * 最终DPArray最后一个元素则为达到终点的总数量
     * 
     */

    let m = obstacleGrid.length, n = obstacleGrid[0].length,
        // 定义一个(m+1)*(n+1)的矩阵
        DPArray = new Array(m + 1).fill(0).map(() => new Array(n + 1).fill(0));
    // 初始化(0,1)处路径数量为1，由于(1,1)处的路径数量肯定是为1的，而(1,1)处路径数量
    // 等于(1,0)的路径数量加上(0,1)的路径数量，因此需要先将两者其一初始化为1
    DPArray[0][1] = 1;
    // 从(1至m，1至n)遍历数组
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (obstacleGrid[i - 1][j - 1] === 1)
                DPArray[i][j] = 0;
            else
                // 到达(j,i)的路径数量就等于到达上一格即(j-1,i)与到达左一格即(j,i-1)的路
                // 径数量之和，即：DPArray[i][j]=DPArray[i-1][j]+DPArray[i][j-1]
                DPArray[i][j] = DPArray[i - 1][j] + DPArray[i][j - 1];
        }
    }
    // 返回结果
    return DPArray[m][n];
}