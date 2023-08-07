/*
 * @Description: 一个机器人位于一个 m x n 网格的左上角 （起始点在下图中标记为 “Start” ）。机器人每次只能
                 向下或者向右移动一步。机器人试图达到网格的右下角（在下图中标记为 “Finish” ）。问总共有多
                 少条不同的路径？
 * @Author: JunLiangWang
 * @Date: 2023-06-07 09:04:34
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-06-07 09:48:07
 */



/**
 * @description: 深度优先   TC:O(2^n)   SC:O(1)
 * @author: JunLiangWang
 * @param {*} m  给定纵坐标边界
 * @param {*} n  给定横坐标边界
 * @return {*}
 */
function dfs(m,n){
    /**
     * 该方案使用深度优先遍历的方式，使用递归模拟机器人行进过程
     */

    // 记录路径数量
    let pathCount=0;
    /**
     * @description: 递归回溯算法
     * @author: JunLiangWang
     * @param {*} x   当前机器人X坐标
     * @param {*} y   当前机器人Y坐标
     * @return {*}
     */    
    function recursionBacktracking(x,y){
        // 当机器人到达终点
        if(x===n&&y===m)
        {
            // 路径数量加1
            pathCount++;
            return ;
        }
        // 如果未达到终点

        // 如果并未达到横坐标边界，则x+1继续递归
        if(x<n)recursionBacktracking(x+1,y);
        // 如果并未达到纵坐标边界，则y+1继续递归
        if(y<m)recursionBacktracking(x,y+1);
    }

    // 执行递归回溯，开始坐标为(1,1)
    recursionBacktracking(1,1)
    // 返回结果
    return pathCount;
}


/**
 * @description: 动态规划   TC:O(n^2)  SC:O(n^2)
 * @author: JunLiangWang
 * @param {*} m  给定纵坐标边界
 * @param {*} n  给定横坐标边界
 * @return {*}
 */
function dp(m,n){
    /**
     * 该方案使用动态规划的方式，定义一个(m+1)*(n+1)的矩阵(DPArray)，其中矩阵的
     * 某一个元素，例如DPArray[i][j]表示到达(j,i)总共有多少条路径，已知
     * 机器人只能向下/向右移动，因此到达(j,i)有多少条路径就等于到达上一格
     * 即(j-1,i)与到达左一格即(j,i-1)的路径数量之和，公式则为：
     * DPArray[i][j]=DPArray[i-1][j]+DPArray[i][j-1]，之所以是定义(m+1)*(n+1)的
     * 矩阵就是方便该处获取到DPArray[i-1][j]与DPArray[i][j-1]的值，
     * 最终DPArray最后一个元素则为达到终点的总数量
     * 
     */

    // 定义一个(m+1)*(n+1)的矩阵
    let DPArray=new Array(m+1).fill(0).map(()=>new Array(n+1).fill(0));
    // 初始化(0,1)处路径数量为1，由于(1,1)处的路径数量肯定是为1的，而(1,1)处路径数量
    // 等于(1,0)的路径数量加上(0,1)的路径数量，因此需要先将两者其一初始化为1
    DPArray[0][1]=1;
    // 从(1至m，1至n)遍历数组
    for(let i=1;i<=m;i++){
        for(let j=1;j<=n;j++){
            // 到达(j,i)的路径数量就等于到达上一格即(j-1,i)与到达左一格即(j,i-1)的路
            // 径数量之和，即：DPArray[i][j]=DPArray[i-1][j]+DPArray[i][j-1]
            DPArray[i][j]=DPArray[i-1][j]+DPArray[i][j-1];
        }
    }
    // 返回结果
    return DPArray[m][n];
}


/**
 * @description: 组合数学  TC:O(n)  SC:O(1)
 * @author: JunLiangWang
 * @param {*} m  给定纵坐标边界
 * @param {*} n  给定横坐标边界
 * @return {*}
 */
function combinatorialMathematics(m,n){
    /**
     * 该方案我们使用数学中排列组合的组合思想，从左上角到右下角的过程中，
     * 我们总共需要移动m+n−2次，其中有m−1次向下移动，n−1次向右移动。因
     * 此路径的总数，就等于从 m+n−2次移动中选m−1次向下移动的方案数，即
     * 组合数：C (m-1)
     *          (m+n-2)
     */

    let ans = 1;
    for (let x = n, y = 1; y < m; ++x, ++y) {
        ans = Math.floor(ans * x / y);
    }
    return ans;

}