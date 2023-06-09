/*
 * @Description: 给定一个包含非负整数的 m x n 网格 grid ，请找出一条从左上角
                 到右下角的路径，使得路径上的数字总和为最小。说明：每次只能向
                 下或者向右移动一步。
 * @Author: JunLiangWang
 * @Date: 2023-06-09 08:49:43
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-06-09 09:07:54
 */



/**
 * @description: 动态规划  TC:O(n^2)   SC:O(n^2)
 * @author: JunLiangWang
 * @param {*} grid  给定m*n的网格
 * @return {*}
 */
function dp(grid){
    
    /**
     * 该方案使用动态规划的方式，定义一个m*n的矩阵(DPArray)，其中矩阵的
     * 某一个元素，例如DPArray[i][j]表示到达i行j列(记作[i,j])的最小和，
     * 已知每次只能向下/向右移动一步，因此到达[i,j]的最小和就等于[i,j]
     * 的当前值加上（到达上一格[i-1,j]的最小和与到达左一格[i,j-1]的最小和
     * 的最小值），即：
     *    DPArray[i][j]=grid[i][j]+Min(DPArray[i-1][j],DPArray[i][j-1])
     * 最终DPArray最后一个元素则为达到终点的最小和。
     * 
     * 后面的代码中我之所以是定义(m+1)*(n+1)的矩阵(DPArray)，是因为考虑到
     * 能够方便获取到DPArray[i-1][j]与DPArray[i][j-1]的值。
     * 
     */

    // 定义一个(m+1)*(n+1)的矩阵
    let m=grid.length,n=grid[0].length,
    DPArray=new Array(m+1).fill(0).map(()=>new Array(n+1).fill(Infinity));
    // 赋值[0,1]元素为0，
    DPArray[0][1]=0;
    
    // 从(1至m，1至n)遍历数组
    for(let i=1;i<=m;i++){
        for(let j=1;j<=n;j++){
            // 到达[i,j]的最小和就等于[i,j]的当前值加上（到达上一格[i-1,j]的
            // 最小和与到达左一格[i,j-1]的最小和的最小值）
            DPArray[i][j]=grid[i-1][j-1]+Math.min(DPArray[i-1][j],DPArray[i][j-1]);
        }
    }

    // 返回结果
    return DPArray[m][n];
}