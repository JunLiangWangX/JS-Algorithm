/*
 * @Description: 一个机器人位于一个 m x n 网格的左上角 （起始点在下图中标记为 “Start” ）。
                 机器人每次只能向下或者向右移动一步。机器人试图达到网格的右下角（在下图中标
                 记为 “Finish”）。现在考虑网格中有障碍物。那么从左上角到右下角将会有多少条
                 不同的路径？网格中的障碍物和空位置分别用 1 和 0 来表示。
 * @Author: JunLiangWang
 * @Date: 2023-06-08 08:59:25
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-06-08 09:19:41
 */



/**
 * @description: dfs  TC:O(2^n)  SC:O(1)
 * @author: JunLiangWang
 * @param {*} obstacleGrid  给定m x n网格
 * @return {*}
 */
function dfs(obstacleGrid){
    /**
     * 该方案使用深度优先遍历的方式，使用递归模拟机器人行进过程
     */

    // 记录路径数量
    let pathCount=0,
    // x最大值
    maxX=obstacleGrid[0].length-1,
    // y最大值
    maxY=obstacleGrid.length=1;
    /**
     * @description: 递归回溯算法
     * @author: JunLiangWang
     * @param {*} x   当前机器人X坐标
     * @param {*} y   当前机器人Y坐标
     * @return {*}
     */    
    function recursionBacktracking(x,y){
        // 如果当前路径为石头，直接返回
        if(obstacleGrid[y][x]===1)return ;
        // 当机器人到达终点
        if(y===maxY&&x===maxX){
            // 路径数量加1
            pathCount++;
            return ;
        }
        // 如果未达到终点

        // 如果并未达到横坐标边界，则x+1继续递归
        if(y<maxY)recursionBacktracking(x,y+1);
        // 如果并未达到纵坐标边界，则y+1继续递归
        if(x<maxX)recursionBacktracking(x+1,y);
    }
    // 执行递归
    recursionBacktracking(0,0);
    // 返回结果
    return pathCount;
}