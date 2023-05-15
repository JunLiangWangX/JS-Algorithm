/*
 * @Description: 给你一个整数数组和一个目标值。请你从数组中选出三个整数，使它们的和与目标值最接近。
 * @Author: JunLiangWang
 * @Date: 2023-03-13 09:21:34
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-03-13 09:44:07
 */


/**
 * @description: 双指针    TC:O(n^2)  SC:O(1)
 * @author: JunLiangWang
 * @param {*} nums   输入的数组
 * @param {*} target 输入的目标值
 * @return {*}
 */
function doublePoint(nums,target)
{
    // 先对数组排序
    nums.sort((a,b)=>a-b)
    // 初始化最接近target为前三个元素和
    let threeNumberSum=nums[0]+nums[1]+nums[2]
    // 遍历nums所有元素，确定第一个数
    for(let firstIndex=0;firstIndex<nums.length;firstIndex++)
    {
        // 元素重复则跳过
        if(firstIndex!=0&&nums[firstIndex]==nums[firstIndex-1])continue
        // 左指针从第一个数的下一个数向后遍历逐步增大，确定第二个数，直到超过/重合右指针结束
        let left=firstIndex+1
        // 右指针从最后一个数向前遍历逐步减小，确定第三个数，直到被左指针超过/重合结束
        let right=nums.length-1
        // 当左指针超过/重合右指针，证明遍历完了所有元素
        while(left<right)
        {
            // 当前三数和
            let tempSum=nums[firstIndex]+nums[left]+nums[right]
            // 当前到target的距离
            let tempDistance=target-tempSum
            // 如果当前距离等于0，则证明此为最接近target的数，直接返回即可
            if(tempDistance==0)return tempSum
            // 如果当前距离大于0，则需要减少距离向0靠拢，减少距离则需要增加三数和，也就是左指针向后即可
            if(tempDistance>0)left++
            // 反之右指针向前即可
            else right--
            // 当发现更小的距离，则赋值
            if(Math.abs(tempDistance)<Math.abs(target-threeNumberSum))threeNumberSum=tempSum
        }
    }
    return threeNumberSum
}