/*
 * @Description: 生命游戏
 * @Author: JunLiangWang
 * @Date: 2023-11-17 09:51:50
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-11-17 09:59:14
 */


/**
 * @description: 额外的状态  TC:O(n^2)  SC:O(1)
 * @author: JunLiangWang
 * @param {*} board  给定二维数组
 * @return {*}
 */
function additionalStates(board){
    /**
     * 本题较为简单，直接再定义一个矩阵，然后
     * 遍历根据规则生成即可，但想要使用原地算
     * 法则需要定义两个额外的状态，让后续数组
     * 知道该值的原始值，我们将0转变为1的值更
     * 改为2，将1转变为0的值更改为3，后面我们
     * 遍历时则把2看作0，把3看作1即可，最后再
     * 遍历数组，把2改为1，把3改为0即可。
     */
    for(let i=0;i<board.length;i++){
        for(let j=0;j<board[i].length;j++){
            let sum=0;
            // 计算环绕的元素的存活细胞总数
            for(let k=i-1;k<=i+1;k++){
                for(let l=j-1;l<=j+1;l++){
                    if((k==i&&l==j)||k<0||k>=board.length||l<0||l>=board[i].length||
                    board[k][l]==2||board[k][l]==0)continue;
                    sum+=1
                }
            }
            if(board[i][j]==0&&sum==3)board[i][j]=2;
             if(board[i][j]==1&&(sum<2||sum>3))board[i][j]=3;
        }
    }
    for(let i=0;i<board.length;i++){
        for(let j=0;j<board[i].length;j++){
            if(board[i][j]==2)board[i][j]=1;
            else  if(board[i][j]==3)board[i][j]=0;
        }
    }
    return board;
}

