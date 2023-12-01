/*
 * @Description: 给定一个  无重复元素 的 有序 整数数组 nums 。返回 恰
                 好覆盖数组中所有数字 的 最小有序 区间范围列表 
 * @Author: JunLiangWang
 * @Date: 2023-12-01 09:32:35
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-12-01 09:34:18
 */



/**
 * @description: 迭代法  TC:O(n)  SC:O(n)
 * @author: JunLiangWang
 * @param {*} nums 给定数组
 * @return {*}
 */   
function iterator(nums){
    /**
     * 本题比较简单，按照题意使用普通迭代即可
     */
    if(nums.length==0)return []
    let start=0,out=[]
    for(let i=1;i<nums.length;i++)
    {
        if(nums[i-1]!==nums[i]-1&&nums[i-1]!==nums[i]){
            if(start==i-1)out.push(nums[start]+'')
            else out.push(nums[start]+'->'+nums[i-1]);
            start=i
        }
    }
    if(start==nums.length-1)out.push(nums[start]+'')
    else out.push(nums[start]+'->'+nums[nums.length-1]);
    return out
}