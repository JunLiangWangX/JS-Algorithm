/*
 * @Description: 给定一个非负索引 rowIndex，返回「杨辉三角」的第 rowIndex 行。
 * @Author: JunLiangWang
 * @Date: 2023-09-05 11:08:27
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-09-05 11:19:33
 */


/**
 * @description: 模拟法  TC:O(n^2)  SC:O(n^2)
 * @author: JunLiangWang
 * @param {*} rowIndex 给定杨辉三角形行索引
 * @return {*}
 */
function simulation(rowIndex){
    /**
     * 本方案利用迭代模拟杨辉三角形生成过程
     * 然后取出最后一行即可
     */
    let outArray=[];
    for(let i=0;i<=rowIndex;i++){
        let tempArray=new Array(i+1).fill(1);
        for(let j=1;j<i;j++){
            tempArray[j]=outArray[i-1][j-1]+outArray[i-1][j]
        }
        outArray.push(tempArray)
    }
    return outArray[outArray.length-1]
}
