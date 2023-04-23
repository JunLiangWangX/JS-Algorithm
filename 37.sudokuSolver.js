/*
 * @Description: 编写一个程序，通过填充空格来解决数独问题。
 * @Author: JunLiangWang
 * @Date: 2023-04-23 14:13:39
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-04-23 15:20:23
 */

/**
 * @description: 递归回溯方法  TC:O(9^(9×9))  SC:O(n^2)
 * @author: JunLiangWang
 * @param {*} board
 * @return {*}
 */
function recursion(board){

    /**
     * 该方案使用递归回溯的方式，首先遍历数独所有元素，并记录每行/列/3*3矩阵出现过的数。
     * 而后利用递归遍历数独中的元素，如果遇到需要空白元素，则依次填入行/列/矩阵中未出现
     * 过的数字(如果没有当前行/列/矩阵没有未出现过的数，则直接返回false)并记录该数已被
     * 使用，而后递归下一个数独元素（直到递归完所有元素返回true）如果下一个递归结果为
     * true证明该次填入数字正确，也返回true，反之返回false。
     */

    // 记录行出现过的数字 9行9个数字，所有数组大小为[9*9]
    let rowUseNumber=new Array(9).fill(0).map(()=>new Array(9).fill(false));
    // 记录列出现过的数字 9列9个数字，所有数组大小为[9*9]
    let columnUseNumber=new Array(9).fill(0).map(()=>new Array(9).fill(false));
    // 记录3*3矩阵出现过的数字 9个3*3矩阵9个数字，所有数组大小为[9*9]
    let metrixUseNumber=new Array(9).fill(0).map(()=>new Array(9).fill(false));

    // 遍历数独，根据行/列/矩阵记录出现过的数字
    for(let i=0;i<9;i++)
    {
        for(let j=0;j<9;j++)
        {
            // 取出数独数字
            let number=board[i][j];
            // 如果不为空，则记录数字
            if(number!=='.')
            {
                // 记录i行的number数字为true，由于下标是0开始的，所以-1
                rowUseNumber[i][number-1]=true;
                // 记录j列的number数字为true，由于下标是0开始的，所以-1
                columnUseNumber[j][number-1]=true;
                // 第几个矩阵是由行和列决定的，其顺序为从上到下，从左到右
                // 划分的9个矩阵，因此下标为Math.floor(i/3)*3+Math.floor(j/3)
                metrixUseNumber[Math.floor(i/3)*3+Math.floor(j/3)][number-1]=true;
            }
        }
    }

    /**
     * @description: 递归回溯，以每一行为基础，从上到下，从左到右递归数独中的元素
     *               如果当前元素已填写数字，则返回递归下一个元素；如果当前元素未
     *               填写数字，则遍历记录当前行/列/矩阵出现过的数字数组，找到未在
     *               其中出现过的数，填入数独，并在记录该数已出现，以此继续递归数
     *               独下一个元素，如果下一个元素返回true，证明该数填写正确，也返
     *               回true，遍历完当前行/列/矩阵未出现过的数仍未找到填写正确的数
     *               则返回false，直至递归完成数独所有元素结束
     * @author: JunLiangWang
     * @param {*} row
     * @param {*} column
     * @return {*}
     */    
    function recursionBacktrack(row,column){
        // column如果超出了列的索引范围
        if(column===9)
        {
            // 重置column为0
            column=0;
            // 并且换到下一行遍历
            row++;
            // 如果row超出了行的索引范围，则证明
            // 所以数字填写完成，返回true即可
            if(row===9)return true;
        }
        // 如果数独当前元素为空白，则需要填入元素
        if(board[row][column]==='.')
        {
            // 遍历行/列/矩阵的九个数字
            for(let i=0;i<9;i++)
            {
                // 如果行/列/矩阵当前数字都未被使用
                if(!rowUseNumber[row][i]&&!columnUseNumber[column][i]&&!metrixUseNumber[
                    Math.floor(row/3)*3+Math.floor(column/3)][i])
                    {
                        // 将行/列/矩阵当前数字赋值为被使用
                        rowUseNumber[row][i]=true;
                        columnUseNumber[column][i]=true;
                        metrixUseNumber[Math.floor(row/3)*3+Math.floor(column/3)][i]=true;
                        // 将当前数字填入矩阵
                        board[row][column]=(i+1).toString();
                        // 继续递归下一个数独中下一数，如果后续全为true，证明当前数字填写
                        // 正确，返回true
                        if(recursionBacktrack(row,column+1))return true;
                        // 否则，重置刚刚赋值的元素继续遍历
                        rowUseNumber[row][i]=false;
                        columnUseNumber[column][i]=false;
                        metrixUseNumber[Math.floor(row/3)*3+Math.floor(column/3)][i]=false;
                        // 将当前数字填入矩阵
                        board[row][column]='.';
                    }
            }
            // 如果遍历完所有数都不满足，则返回false
            return false;
        }
        // 否则递归遍历数独下一个数
        else  return recursionBacktrack(row,column+1); 
    }

    // 执行递归
    recursionBacktrack(0,0);
    // 返回结果
    return board;
}