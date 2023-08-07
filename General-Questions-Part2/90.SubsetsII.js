/*
 * @Description: 给你一个整数数组 nums ，其中可能包含重复元素，请你返回该数组所有可能的子集（幂集）。
                 解集 不能 包含重复的子集。返回的解集中，子集可以按 任意顺序 排列。
 * @Author: JunLiangWang
 * @Date: 2023-07-21 10:43:29
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-07-21 10:46:41
 */


/**
 * @description: 递归回溯   TC:O(2^n)  SC:O(n^2)
 * @author: JunLiangWang
 * @param {*} nums  给定数组
 * @return {*}
 */
function recursionBackTracking(nums){
    /**
     * 该题与 78.子集类似，可以使用递归回溯枚举所有组合
     * 但由于该题存在重复元素，因此我们需要对数组先进行
     * 排序，然后递归过程去重。
     */

    // 对数组进行排序
    nums.sort();
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
            // 去重操作，如果当前元素为当前层第一个元素，
            // 或当前元素不等于当前层该元素的上一个元素，
            // 则继续递归
            if(i==index||nums[i]!=nums[i-1])
            recursion(i+1,[...selectNum,nums[i]]);
        }
    }
    // 执行递归
    recursion(0,[]);
    // 返回结果
    return outArray;
} 
