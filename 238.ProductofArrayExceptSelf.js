/*
 * @Description: 给你一个整数数组 nums，返回 数组 answer ，其中 answer[i] 等于 nums 中除 nums[i] 
                 之外其余各元素的乘积 。请 不要使用除法，且在 O(n) 时间复杂度内完成此题。
 * @Author: JunLiangWang
 * @Date: 2023-11-13 14:47:24
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-11-13 14:59:04
 */


/**
 * @description: 双数组  TC:O(n)  SC:O(n)
 * @author: JunLiangWang
 * @param {*} nums 给定数组
 * @return {*}
 */
function twoArray(nums){
    /**
     * 本方案采用双数组的方式，定义左右两数组leftArray,rightArray长度与
     * nums一致。
     * 
     * 对于两数组索引i处元素：
     * 
     * 左数组i处元素leftArray[i]为nums的[0至i-1]的乘积
     * 右数组i处元素rightArray[i]为nums的[i+1,nums.length-1]的乘积
     * 
     * 除 nums[i] 之外其余各元素的乘积则为：leftArray[i]*rightArray[i]
     * 
     * 示例：     nums = [1,2,3,4]
     *       leftArray = [1,1,2,6]
     *       rightArray= [24,12,4,1]
     *             结果= [24,12,8,6]
     */


    //定义左右两数组leftArray,rightArray长度与nums一致。
    let leftArray=new Array(nums.length),
    rightArray=new Array(nums.length),
    outArray=new Array(nums.length);
    // 初始化左数组[0]为1
    leftArray[0]=1;
    // 初始化右数组最后一个元素为1
    rightArray[nums.length-1]=1;

    let index=0;
    // 遍历计算左数组元素值：
    // 左数组i处元素leftArray[i]为nums的[0至i-1]的乘积
    while(index<nums.length-1){
         leftArray[index+1]=leftArray[index]*nums[index]
         index++;
    }
    // 遍历计算右数组元素值：
    // 右数组i处元素rightArray[i]为nums的[i+1,nums.length-1]的乘积
    index=nums.length-1;
    while(index>0){
       rightArray[index-1]=rightArray[index]*nums[index]
       index--;
    } 
    // 遍历计算结果：
    // 除 nums[i] 之外其余各元素的乘积则为：leftArray[i]*rightArray[i]
    index=0;
    while(index<nums.length){
        outArray[index]=leftArray[index]*rightArray[index]
        index++;
    }
    // 返回结果
    return outArray;
}