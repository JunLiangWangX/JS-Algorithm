


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