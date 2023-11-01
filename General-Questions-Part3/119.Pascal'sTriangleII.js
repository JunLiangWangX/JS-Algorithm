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


/**
 * @description: 模拟法优化  TC:O(n^2)  SC:O(n)
 * @author: JunLiangWang
 * @param {*} rowIndex 给定杨辉三角形行索引
 * @return {*}
 */
function simulationOp(rowIndex){
    /**
     * 上述模拟法我们发现，其实我们当前行仅与上一行有关
     * 因此我们可以利用一维滚动数组对空间复杂度进一步优
     * 化
     */
    let outArray=new Array(rowIndex+1).fill(1);
    for(let i=0;i<=rowIndex;i++){
        for(let j=i-1;j>=1;j--)
              outArray[j]=outArray[j]+outArray[j-1]
    }
    return outArray
}



/**
 * @description: 数学方法  TC:O(n)  SC:O(n)
 * @author: JunLiangWang
 * @param {*} rowIndex 给定杨辉三角形行索引
 * @return {*}
 */
function Math(rowIndex){
    /**
     * 对于杨辉三角形i行i列有公式
     * f[i][j]=f[i][j-1]*(rowsCount-j)/j
     */
    let outArray=[1];
    for(let i=1;i<=rowIndex;i++){
        outArray.push(outArray[i - 1]* (rowIndex - i + 1) / i);
    }
    return outArray
}