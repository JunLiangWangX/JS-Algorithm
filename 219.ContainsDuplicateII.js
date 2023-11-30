/*
 * @Description: 给你一个整数数组 nums 和一个整数 k ，判断数组中是否存在两个 不同的索引 i 和 j ，
                 满足 nums[i] == nums[j] 且 abs(i - j) <= k 。如果存在，返回 true ；否则，返回 
                 false 。
 * @Author: JunLiangWang
 * @Date: 2023-11-30 09:28:07
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-11-30 09:31:56
 */



/**
 * @description: 哈希表  TC:O(n)  SC:O(n)
 * @author: JunLiangWang
 * @param {*} nums 给定数组
 * @param {*} k    给定元素k
 * @return {*}
 */
function hashMap(nums,k){
    /**
     * 本方案使用哈希表的方式，遍历数组每个元素，
     * 判断当前元素在哈希表中是否存在，如果存在，
     * 则表明有重复元素，计算两元素索引是否<=k,
     * 是则满足条件返回true，不是则将其装入哈希
     * 表中，继续遍历
     */
    const map = new Map();
    for (let i = 0; i < nums.length; i++) {
        if (map.has( nums[i]) && i - map.get( nums[i]) <= k) return true;
        map.set(num, i);
    }
    return false;
}