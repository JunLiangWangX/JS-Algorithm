/*
 * @Description: 给你一个由 '1'（陆地）和 '0'（水）组成的的二维网格，请你计算网格中岛屿的数量。
                 岛屿总是被水包围，并且每座岛屿只能由水平方向和/或竖直方向上相邻的陆地连接形成。
                 此外，你可以假设该网格的四条边均被水包围。
 * @Author: JunLiangWang
 * @Date: 2023-12-19 11:18:52
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-12-19 11:25:04
 */


/**
 * @description: 递归  TC:O(nm)  SC:O(nm)
 * @author: JunLiangWang
 * @param {*} grid  给定二维数组
 * @return {*}
 */
function recursion(grid){
    /**
     * 本方案采用递归的方式，首先遍历数组元素
     * 当遇到1时，将该元素赋值为0，当该元素上
     * 下左右四个方向有元素为1时，则继续递归
     * 递归结束证明该岛屿所有板块找到，数量+1
     * 继续遍历
     */

    // 记录岛屿数量
    let count=0;
    /**
     * @description: 递归
     * @author: JunLiangWang
     * @param {*} i x轴
     * @param {*} j y轴
     * @return {*}
     */    
    function recursionMethod(i,j){
        // 将该元素置为0
        grid[i][j]=0;
        // 当该元素上下左右四个方向有元素
        // 为1时，则继续递归递归结束证明该
        // 岛屿所有板块找到
        if(i+1<grid.length&&grid[i+1][j]==1) recursionMethod(i+1,j)
        if(i-1>=0&&grid[i-1][j]==1) recursionMethod(i-1,j)
        if(j+1<grid[i].length&&grid[i][j+1]==1)recursionMethod(i,j+1)
        if(j-1>=0&&grid[i][j-1]==1)recursionMethod(i,j-1)
    }
    // 遍历数组元素
    for(let i=0;i<grid.length;i++){
        for(let j=0;j<grid[i].length;j++){
             // 当遇到1时，执行递归
             if(grid[i][j]==1){
                recursionMethod(i,j);
                // 递归结束，岛屿数量+1
                 count++;
             }
        }
    }
    // 返回结果
    return count
}