/*
 * @Description: 给你一个整数数组 nums ，数组中的元素 互不相同 。返回该数组所有可能的子集（幂集）。
                 解集 不能 包含重复的子集。你可以按 任意顺序 返回解集。
 * @Author: JunLiangWang
 * @Date: 2023-06-30 08:50:22
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-06-30 08:57:26
 */


/**
 * @description: 递归回溯   TC:O(2^n)  SC:O(n^2)
 * @author: JunLiangWang
 * @param {*} nums  给定数组
 * @return {*}
 */
function recursionBackTracking(nums){
    /**
     * 该方案使用递归回溯枚举所有组合
     */

    // 输出数组
    let outArray=[];
    /**
     * @description: 递归
     * @author: JunLiangWang
     * @param {*} index     当前索引
     * @param {*} selectNum 当前组合
     * @return {*}
     */    
    function recursion(index,selectNum){
        // 向输出数组添加当前组合
        outArray.push(selectNum);
        // 从当前索引遍历继续递归，直到超出nums长度
        for(let i=index;i<nums.length;i++){
            recursion(i+1,[...selectNum,nums[i]]);
        }
    }
    // 执行递归
    recursion(0,[]);
    // 返回结果
    return outArray;
} 
