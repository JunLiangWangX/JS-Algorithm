/*
 * @Description: 
 * @Author: JunLiangWang
 * @Date: 2023-03-11 15:32:41
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-03-11 15:41:10
 */


/**
 * @description: 暴力破解   TC:O(n^3)  SC:O(n)
 * @author: JunLiangWang
 * @param {*} nums
 * @return {*}
 */
function bruteForce(nums){
    // 将数组进行排序
    let inArray=nums.sort((a,b)=>a-b)
    let outArray=[]
    for(let i=0;i<nums.length;i++)
    {
        // 当i不等于0且当前数字等于上一个数字时，该数字在上轮循环中已得出结果，为避免重复则跳过
        if(i!=0&&nums[i]==nums[i-1])continue
        for(let j=i+1;j<nums.length;j++)
        {
            // 同上
            if(j!=i+1&&nums[j]==nums[j-1])continue
            for(let k=j+1;k<nums.length;k++)
            {
               //同上
               if(k!=j+1&&nums[k]==nums[k-1])continue
               //当三数字结果相加等于0，添加到输出数组
               if(nums[i]+nums[j]+nums[k]==0)
               outArray.push([nums[i],nums[j],nums[k]])
            }
        }
    }
    return inArray
}