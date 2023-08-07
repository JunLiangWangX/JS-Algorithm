/*
 * @Description: 给你两个单词 word1 和 word2， 请返回将 word1 转换成 word2 所使用的最少操作数，  
                 你可以对一个单词进行如下三种操作：插入一个字符、删除一个字符、替换一个字符。
 * @Author: JunLiangWang
 * @Date: 2023-06-19 09:00:14
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-06-19 09:44:08
 */



/**
 * @description: 动态规划   TC:O(n^2)  SC:O(n^2)
 * @author: JunLiangWang
 * @param {*} word1 给定单词1
 * @param {*} word2 给定单词2
 * @return {*}
 */
function dp(word1,word2){
    /**
     * 本方案使用动态规划的方式，定义一个m*n(m表示word1的长度，n表示word2的长度)的矩阵，
     * 矩阵的行索引(row)表示字符串word1从0到row的子串，矩阵的列索引(column)表示字符串
     * word2从0到column的子串，矩阵的某一元素表示(DPArray[row][column])word1的0到row
     * 位置的子串变为word2的0到column子串需要的最小操作数。
     * 
     * 其实我们不难发现，当word1[row]===word2[column]时，他们最小操作数等于word1[row-1]
     * 与word2[column-1]的最小操作数，例如：word1='abcd',word2='efgd'的最小操作数其实等于
     * 'abc'与'efg'的最小操作数的,即：
     *  当word1[row]===word2[column]时，DPArray[row][column]=DPArray[row-1][column-1]
     * 
     * 当word1[row]!==word2[column]时，他们的最小操作数等于Min([word1[row-1],word2[column]
     * 的最小操作数],[word1[row],word2[column-1]的最小操作数],[word1[row-1],word2[column-1]
     * 的最小操作数])+1，例如：word1='abcd',word2='efgh'的最小操作数则为：
     *            'abc'与'efgh'的最小操作数、
     *            'abcd'与'efg'的最小操作数、
     *            'abc'与'efg'的最小操作数中的最小值+1.
     * 为什么是这样的？因为f(x)=f(x-1)+1，f表示字符串，x表示字符串0到x的子串，f(x)表示
     * 变为0到x的子串需要的最小操作数，变为0到x的子串需要的最小操作数则等于变为0到x-1的
     * 子串的最小操作数+1，因此：
     * 当word1[row]!==word2[column]时，
     * DPArray[row][column]=Min(DPArray[row-1][column],
     *                          DPArray[row][column-1],
     *                          DPArray[row-1][column-1])+1
     * 
     * 后面的代码中我之所以是定义(m+1)*(n+1)的矩阵(DPArray)，是因为考虑到
     * 能够方便获取到DPArray[i-1][j]与DPArray[i][j-1]的值。
     * 
     */

    //  定义一个(m+1)*(n+1)的矩阵，矩阵的某一元素(DPArray[row][column])表示word1的0到row-1
    //  位置的子串变为word2的0到column-1子串需要的最小操作数。
    let DPArray=new Array(word1.length+1).fill(0).map(()=>new Array(word2.length).fill(0));
    // 给第0行/第0列赋予初值，其初值则为word1=''或word2=''时变更为word2/word1时的操作数
    for(let i=0;i<=word1.length;i++)DPArray[i][0]=i;
    for(let i=0;i<=word2.length;i++)DPArray[0][i]=i;
    DPArray[0][0]=0;

    // 遍历word1字符
    for(let i=1;i<=word1.length;i++){
        // 遍历word2字符
        for(let j=1;j<=word2.length;j++){
            // 当word1[row]===word2[column]时，
            // 他们最小操作数等于word1[row-1]与word2[column-1]的最小操作数
            if(word1[i-1]===word2[j-1]) DPArray[i][j]=DPArray[i-1][j-1];
            // 当word1[row]!==word2[column]时，他们的最小操作数等于
            // Min([word1[row-1],word2[column]的最小操作数],
            //     [word1[row],word2[column-1]的最小操作数],
            //     [word1[row-1],word2[column-1]的最小操作数])+1
            else
                DPArray[i][j]=Math.min(DPArray[i-1][j],DPArray[i][j-1],DPArray[i-1][j-1])+1;
        }
    }

    // 返回结果
    return DPArray[word1.length][word2.length]
}