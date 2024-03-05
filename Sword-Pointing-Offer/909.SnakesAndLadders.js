/*
 * @Description: 给定一个n*n的矩阵棋盘，方格按从 1 到 n^2 编号,排列顺序从左下角[n-1,0]开始，蛇形排列。
                 玩家从1号方格出发，每次能够移动1到6格，当遇到的格子的值不为-1，则可以跳转到[格子的值]号
                 格子，请问需要多少次能将棋移动到n^2号格子
 * @Author: JunLiangWang
 * @Date: 2024-01-04 21:17:01
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2024-01-04 21:30:03
 */


/**
 * @description: 广度优先  TC:O(n^2)  SC:O(n^2)
 * @author: JunLiangWang
 * @param {*} board 给定矩阵
 * @return {*}
 */
function bfs(board) {

    /**
     * 本题题意：
     * 给定一个n*n的矩阵棋盘，方格按从 1 到 n^2 编号,排列顺序从左下角[n-1,0]开始，蛇形排列。
     * 如下：
     *      7 8 9
     *      6 5 4
     *      1 2 3 
     * 玩家从1号方格出发，每次能够移动1到6格，当遇到的格子的值不为-1，则可以跳转到[格子的值]号
     * 格子，请问需要多少次能将棋移动到n^2号格子
     * 
     * 本题其实就是寻找最短路径，最短路径可用dfs和bfs，由于dfs需要遍历全部路径才能找出，因此
     * 该题使用bfs比较合适
     */
    
    // 总长
    let length = board.length * board.length,
    // 记录已经走过的格子
        recordArray = new Array(board.length).fill(0).map(() => new Array(board.length).fill(false))
    // 队列
    let quene = [1],
    // 已经移动了多少次
        count = 0
    while (quene.length) {
        // 该次队列长度
        let size = quene.length;
        // 移动次数+1
        count++;
        // 将该次队列所有元素出队
        while (size--) {
            // 出队
            let index = quene.shift();
            // 可移动1到6次格子
            for (let i = index + 1; i <= index + 6 && i <= length; i++) {
                // 根据索引计算出在矩阵的几行列
                let r = -Math.floor((i - 1) / board.length),
                    c = (r % 2 == 0 ? (i - 1) % board.length : board.length - 1 - (i - 1) % board.length)
                r += (board.length - 1)
                // 如果已经走过，直接跳过
                if (recordArray[r][c]) continue;
                // 把该格子标记为已经走过
                recordArray[r][c] = true;
                // 如果当前格子值不为-1，则跳到相应的格子
                let next = board[r][c] == -1 ? i : board[r][c]
                // 如果格子等于终点，直接返回次数
                if (next == length) return count;
                // 入队
                quene.push(next)
            }
        }
    }
    // 如果无法到达终点，返回-1
    return -1
}