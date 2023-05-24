/*
 * @Description: n 皇后问题 研究的是如何将 n 个皇后放置在 n × n 的棋盘上，并且使皇后彼此之间不能相互攻击。
                 给你一个整数 n ，返回 n 皇后问题 不同的解决方案的数量。
 * @Author: JunLiangWang
 * @Date: 2023-05-24 16:23:31
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-05-24 16:35:10
 */



/**
 * @description: 递归回溯    TC:O(2^n)  SC:O(n)
 * @author: JunLiangWang
 * @param {*} n   给定矩阵大小
 * @return {*}
 */
function recursionBacktracking(n) {
    
    /**
     * 该方案与N皇后1问题一样，利用递归回溯的方式，通过递归逐行遍历矩阵元素，然后在
     * 递归中逐列遍历当前行的元素，找到与已找到的点(points)不同行/不同列/不同对角线
     * 的点，并将该点加入到已找到的点(points)中，从下一行继续递归，直到递归完矩阵所
     * 有行，证明已找到所有符合条件的点。
     * 
     * 判断当前点是否与已找到的点
     * 不同行(由于是逐行递归的，因此当前行的点肯定与已找到的点不同行，此处无需判断)
     * 不同列(即:已找到的点的列不等于当前点的列)
     * 不同对角线(即：已找到的点的列与行之和/差不等于当前点的列与行之和/差)
     */

    // 定义记录解决方案数量变量
    let count = 0;

    /**
     * @description: 递归回溯
     * @author: JunLiangWang
     * @param {*} row      当前行
     * @param {*} points   已选中的点
     * @return {*}
     */    
    function recursion(row, points) {
        
        // 如果当前行超出了矩阵大小，证明已找到所有符合条件的点
        if (row === n) {
            // 解决方案+1
            count++;
            return;
        }

        // 如果当前行(currentRow)未超出矩阵大小，则逐列遍历当前行的元素，找到与
        // 已找到的点(points)不同行/不同列/不同对角线的点，并将该点加入到已找到
        // 的点(points)中，从下一行继续递归
        
        // 逐列遍历当前行(currentRow)的元素
        for (let col = 0; col < n; col++) {

            // 遍历已找到的点，判断当前点是否与已找到的点
            // 不同行(由于是逐行递归的，因此当前行的点肯定与已找到的点不同行，此处无需判断)
            // 不同列(即:已找到的点的列不等于当前点的列)
            // 不同对角线(即：已找到的点的列与行之和/差不等于当前点的列与行之和/差)
            let index = 0;
            while (index < points.length && points[index].col !== col &&
                points[index].col + points[index].row !== col + row &&
                points[index].col - points[index].row !== col - row) index++;
                
            // 如果index不等于points数组长度，证明已找到的点中有与当前点同行/同列/同对
            // 角线的情况，否则，则没有该情况，将该点加入到已找到的点(points)中，从下一
            // 行继续递归
            if (index === points.length) {
                //将该点加入到已找到的点(points)中，从下一行继续递归
                recursion(row + 1, [...points, {
                    row: row,
                    col: col
                }])
            }
        }
    }

    // 调用递归
    recursion(0,[]);
    // 返回结果
    return count;
}