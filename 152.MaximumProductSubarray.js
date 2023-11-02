/*
 * @Description: 给你一个整数数组 nums ，请你找出数组中乘积最大的非空连续子数组
                （该子数组中至少包含一个数字），并返回该子数组所对应的乘积。
 * @Author: JunLiangWang
 * @Date: 2023-11-02 10:49:52
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-11-02 10:53:40
 */


/**
 * @description: 暴力破解   TC:O(n^2)  SC:O(1)
 * @author: JunLiangWang
 * @param {*} nums  给定数组
 * @return {*}
 */
function bruteForce(nums){
    /**
     * 本方案使用暴力破解的方式，两次遍历数组元素
     * 比较其乘积获取最大乘积
     */
    let maxProduct=nums[0]
    for(let i=0;i<nums.length;i++){
        let product=1
        for(let j=i;j<nums.length;j++){
            product*=nums[j]
            maxProduct=Math.max(maxProduct,product)
        }
    }
    return maxProduct
}


/**
 * @description: 动态规划  TC:O(n)  SC:O(1)
 * @author: JunLiangWang
 * @param {*} nums 给定数组
 * @return {*}
 */
function dp(nums){
    let maxProduct=nums[0],
    negativeProduct=nums[0],
    positiveProduct=nums[0];
    for(let i=1;i<nums.length;i++){
        let temp1 = positiveProduct * nums[i],temp2 = negativeProduct * nums[i];
        positiveProduct=Math.max(temp1,temp2,nums[i]);
        negativeProduct=Math.min(temp1,temp2,nums[i]);
        maxProduct=Math.max(maxProduct,positiveProduct,negativeProduct)
    }
    return maxProduct;
}