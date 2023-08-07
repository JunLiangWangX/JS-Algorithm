/*
 * @Description: 请你判断一个 9 x 9 的数独是否有效。只需要 根据以下规则 ，验证已经填入的数字是否有效即可。
                 1.数字 1-9 在每一行只能出现一次。
                 2.数字 1-9 在每一列只能出现一次。
                 3.数字 1-9 在每一个以粗实线分隔的 3x3 宫内只能出现一次。
 * @Author: JunLiangWang
 * @Date: 2023-04-21 09:27:01
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-04-21 09:53:42
 */


/**
 * @description: hashMap方法   TC:O(n^2)   SC:O(n^2)
 * @author: JunLiangWang
 * @param {*} board
 * @return {*}
 */
function hashMap(board){
    /**
     * 该方案利用hashMap，将每个值的所在行号、列号以及矩阵号与该值一起分别存入hashMap的key中如下：
     *        记录行Key：('r'+row+board[row][column])
     *        记录列Key：('c'+column+board[row][column])
     *        记录矩阵Key：('r'+Math.floor(row/3)+'y'+Math.floor(column/3)+board[row][column])
     * 当该值所在行/列/矩阵无重复值时，利用key获取到的值为空，此时在hashMap记录该值为true，当该值所
     * 在行/列/矩阵有重复值时，利用key获取到的值不为空，此时证明该数独是无效的
     */

    // 定义记录是否重复的hashMap，key为：
    let recordMap=new Map();

    // 遍历矩阵行
    for(let row=0;row<board.length;row++)
    {
        // 遍历矩阵列
        for(let column=0;column<board[row].length;column++)
        {
            // 当数独该值为空，则跳过本次循环
            if(board[row][column]==='.')continue;
            // 计算当前行key值
            let rowKey='r'+row+board[row][column],
            // 计算当前列key值
            columnKey='c'+column+board[row][column],
            // 计算当前矩阵key值
            matrixKey='r'+Math.floor(row/3)+'c'+Math.floor(column/3)+board[row][column],
            // 该值在所在行是否出现过
            isRedundantInRow=recordMap.get(rowKey),
            // 该值在所在列是否出现过
            isRedundantInColumn=recordMap.get(columnKey),
            // 该值在所在矩阵是否出现过
             isRedundantInMatrix=recordMap.get(matrixKey);

            // 三者任意出现重复，则直接返回false
            if(isRedundantInRow||isRedundantInColumn||isRedundantInMatrix) return false;
            // 否则则在hashMap中记录三个值
            recordMap.set(rowKey,true);
            recordMap.set(columnKey,true);
            recordMap.set(matrixKey,true);
        }
    }
    // 遍历完成所有元素，则返回true
    return true;
}