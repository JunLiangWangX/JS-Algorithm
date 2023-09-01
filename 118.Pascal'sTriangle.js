/*
 * @Description: 给定一个非负整数 numRows，生成「杨辉三角」的前 numRows 行。
 * @Author: JunLiangWang
 * @Date: 2023-09-01 09:37:52
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-09-01 09:42:11
 */


/**
 * @description: 迭代法  TC:O(n^2)  SC:O(n^2)
 * @author: JunLiangWang
 * @param {*} numRows 给定一个非负整数
 * @return {*}
 */
function iteration(numRows){
    /**
     * 该方案使用迭代法，两次遍历生成杨辉三角形
     */
    let outArray=[]
    for(let i=0;i<numRows;i++){
        outArray.push(new Array(i+1).fill(1));
        for(let j=1;j<=i-1;j++){
           outArray[i][j]=outArray[i-1][j-1]+outArray[i-1][j];
        }
    }
    return outArray;
}