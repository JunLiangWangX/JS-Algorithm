/*
 * @Description: 按照国际象棋的规则，皇后可以攻击与之处在同一行或同一列或同一斜线上的棋子。
                 n 皇后问题 研究的是如何将 n 个皇后放置在 n×n 的棋盘上，并且使皇后彼此之
                 间不能相互攻击。给你一个整数 n ，返回所有不同的 n 皇后问题 的解决方案。
 * @Author: JunLiangWang
 * @Date: 2023-05-22 15:37:45
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-05-23 09:53:45
 */



/**
 * @description: 递归回溯    TC:O(2^n)  SC:O(n)
 * @author: JunLiangWang
 * @param {*} n   给定矩阵大小
 * @return {*}
 */
function recursionBacktracking(n){
    /**
     * 该方案利用递归回溯的方式，通过递归逐行遍历矩阵元素，然后在递归中逐列遍历当前行
     * 的元素，找到与已找到的点(points)不同行/不同列/不同对角线的点，并将该点加入到
     * 已找到的点(points)中，从下一行继续递归，直到递归完矩阵所有行，证明已找到所有符
     * 合条件的点。
     * 
     * 判断当前点是否与已找到的点
     * 不同行(由于是逐行递归的，因此当前行的点肯定与已找到的点不同行，此处无需判断)
     * 不同列(即:已找到的点的列不等于当前点的列)
     * 不同对角线(即：已找到的点的列与行之和/差不等于当前点的列与行之和/差)
     */

    // 定义输出数组
    let outArray=[];

    /**
     * @description: 递归回溯
     * @author: JunLiangWang
     * @param {*} currentRow  当前行
     * @param {*} points      已选中的点
     * @return {*}
     */    
    function recursion(currentRow,points){
        // 如果当前行超出了矩阵大小，证明已找到所有符合条件的点
        if(currentRow===n)
        {
            // 将已找到的点(points)，构造为符合答案的输出(例如:"..Q.")
            // 添加到输出数组中(outArray)
            let out=[]
            for(let item of points)
            {
                let temp=new Array(n).fill('.');
                temp[item.col]='Q';
                out.push(temp.join(''));
            }
            outArray.push(out)
            return ;
        }
        // 如果当前行(currentRow)未超出矩阵大小，则逐列遍历当前行的元素，找到与
        // 已找到的点(points)不同行/不同列/不同对角线的点，并将该点加入到已找到
        // 的点(points)中，从下一行继续递归
        
        // 逐列遍历当前行(currentRow)的元素
        for(let col=0;col<n;col++)
        {
            // 遍历已找到的点，判断当前点是否与已找到的点
            // 不同行(由于是逐行递归的，因此当前行的点肯定与已找到的点不同行，此处无需判断)
            // 不同列(即:已找到的点的列不等于当前点的列)
            // 不同对角线(即：已找到的点的列与行之和/差不等于当前点的列与行之和/差)
            let index=0;
            while(index<points.length&&points[index].col!=col
                &&currentRow+col!=points[index].row+points[index].col&&
                currentRow-col!=points[index].row-points[index].col)index++;
            // 如果index不等于points数组长度，证明已找到的点中有与当前点同行/同列/同对
            // 角线的情况，否则，则没有该情况，将该点加入到已找到的点(points)中，从下一
            // 行继续递归
            if(index===points[index].length)
            {
                //将该点加入到已找到的点(points)中，从下一行继续递归
                recursion(currentRow+1,[...points,{
                    row:currentRow,
                    col:col
                }]);
            }
        }
    }
    // 调用递归
    recursion(0,[]);
    // 返回结果
    return outArray;
}