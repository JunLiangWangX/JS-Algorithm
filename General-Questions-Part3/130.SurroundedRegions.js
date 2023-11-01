/*
 * @Description: 给你一个 m x n 的矩阵 board ，由若干字符 'X' 和 'O' ，
                 找到所有被 'X' 围绕的区域，并将这些区域里所有的 'O' 用
                  'X' 填充。
 * @Author: JunLiangWang
 * @Date: 2023-09-26 09:12:50
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-09-26 09:27:27
 */


/**
 * @description: 深度优先  TC:O(n)  SC:O(n)
 * @author: JunLiangWang
 * @param {*} board
 * @return {*}
 */
function dfs(board){
    /**
     * 该方案使用深度优先的方式，不被包围的元素则肯定
     * 是4条最外的边中的'O'的延伸，因此我们仅需要遍历
     * 最外层的边，然后找到为'O'的元素，利用递归向上/
     * 下/左/右不断延申找到所有为'O'的元素即可，然后
     * 他们标记为'A'表示未被包围的'O',最终遍历数组，
     * 将'A'元素改为'O',将'O'元素改为'X'即可
     */

    /**
     * @description: 递归实现深度优先遍历
     * @author: JunLiangWang
     * @param {*} x 横坐标索引
     * @param {*} y 纵坐标索引
     * @return {*}
     */    
    function recursion(x,y){
        // 当超出矩阵索引/当前元素不为'O'结束递归
        if(x<0||x>=board[0].length||y<0||y>=board.length||board[y][x]!='O')return 
        // 将为'O'的元素置为'A'
        board[y][x]='A'
        // 继续向上/下/左/右递归
        recursion(x+1,y)
        recursion(x-1,y)
        recursion(x,y+1)
        recursion(x,y-1)
    }
    // 遍历上下两条边，找到为'O'的元素
    for(let i=0;i<board[0].length;i++){
        recursion(i,0)
        recursion(i,board.length-1)
    }
    // 遍历左右两条边，找到为'O'的元素
    for(let i=0;i<board.length;i++){
        recursion(0,i)
        recursion(board[0].length-1,i)
    }
    // 遍历矩阵将'A'元素改为'O',将'O'元素改为'X'即可
    for(let i=0;i<board.length;i++){
        for(let j=0;j<board[0].length;j++)
        {
            if(board[i][j]=='A')board[i][j]='O'
            else if(board[i][j]=='O')board[i][j]='X'
        }
    }
    // 返回结果
    return board
}