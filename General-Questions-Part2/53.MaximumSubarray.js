/*
 * @Description: 给你一个整数数组 nums ，请你找出一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。
 * @Author: JunLiangWang
 * @Date: 2023-05-25 16:03:05
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-05-25 23:14:02
 */



/**
 * @description: 动态规划   TC:O(n^2)   SC:O(n^2)
 * @author: JunLiangWang
 * @param {*} nums  给定数组
 * @return {*}
 */
function dp(nums){
    /**
     * 该方案利用动态规划的方式，定义一个n*n(n=nums.length)的矩阵dpArray，
     * 矩阵纵坐标(记作i,0到n-1)代表nums子串的开始元素(即nums[i])，横坐标(
     * 记作j,0到n-1)代表nums子串的结束元素(即nums[j])，而矩阵中的某个元素
     * 如：dpArray[i][j]则代表nums从i到j子串元素的和
     * 
     * 我们首先初始化dpArray[i][i]为num[i](i为0到nums.length-1)的值(开始
     * 元素为i，结束元素为i，则子串和则为nums[i]的值)，由于开始元素的索引必
     * 须大于等于结束元素的索引，因此我们以此对角线为界，遍历矩阵的上半部分即
     * 可，在遍历时dpArray[i][j]的值即nums从i到j子串和等于nums从i到j-1子串
     * 和加上当前元素nums[j]，即dpArray[i][j]=dpArray[i][j-1]+nums[j]的,
     * 最后我们找到dpArray[i][j]的最大值即为最大的子串和
     */

    // 定义一个n*n(n=nums.length)的矩阵
    // 纵坐标(记作i,0到n-1)代表nums子串的开始元素(即nums[i])
    // 横坐标(记作j,0到n-1)代表nums子串的结束元素(即nums[j])
    // 矩阵中的某个元素，如：dpArray[i][j]则代表nums从i到j子串元素的和
    let dpArray=new Array(nums.length).fill(0).map(()=>new Array(nums.length).fill(0))

    // 初始化子串最大和为nums[0]
    let maxValue=nums[0];
    // 遍历给定数组
    for(let i=0;i<nums.length;i++){
        // 初始化dpArray[i][i]为num[i](i为0到nums.length-1)的值(开始元素为i，
        // 结束元素为i，则子串和则为nums[i]的值)
        dpArray[i][i]=nums[i];
        // 记录一个元素作为子串的最大值
        if(nums[i]>maxValue)maxValue=nums[i]
    }
    // 由于开始元素的索引必须大于等于结束元素的索引，因此我们以左上到右下对角线为
    // 界，遍历矩阵的上半部分即可
    for(let i=0;i<nums.length;i++)
    {
        for(let j=i+1;j<nums.length;j++){
            // dpArray[i][j]的值即nums从i到j子串和等于nums从i到j-1子串和加上当
            // 前元素nums[j]，即dpArray[i][j]=dpArray[i][j-1]+nums[j]的
            dpArray[i][j]=dpArray[i][j-1]+nums[j]
            // 记录子串和最大值
            if(dpArray[i][j]>maxValue)maxValue=dpArray[i][j]
        }
    }
    // 返回结果
    return maxValue;
}


/**
 * @description: 动态规划优化  TC:O(n)  SC:O(1)
 * @author: JunLiangWang
 * @param {*} nums  给定数组
 * @return {*}
 */
function dpOptimization(nums){
    // 该方案对动态规划进行优化，只可意会，不可言传！
    let preValue=0,maxValue=nums[0];
    nums.map(val => {
        preValue=Math.max(preValue+val,val);
        maxValue=Math.max(maxValue,preValue);
    });
    return maxValue;
}