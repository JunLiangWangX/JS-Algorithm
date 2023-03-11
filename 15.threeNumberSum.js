/*
 * @Description: 给你一个整数数组nums,判断是否存在三元组[nums[i], nums[j], nums[k]]满足
                 i != j、i != k 且 j != k ，同时还满足 nums[i] + nums[j] + nums[k] == 0，
                 请你返回所有和为 0 且不重复的三元组。
 * @Author: JunLiangWang
 * @Date: 2023-03-11 15:32:41
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-03-11 16:03:54
 */


/**
 * @description: 暴力破解   TC:O(n^3)  SC:O(n)
 * @author: JunLiangWang
 * @param {*} nums
 * @return {*}
 */
function bruteForce(nums){
    // 将数组进行排序
    nums.sort((a,b)=>a-b)
    let outArray=[]
    for(let i=0;i<inArray.length;i++)
    {
        // 当i不等于0且当前数字等于上一个数字时，该数字在上轮循环中已得出结果，为避免重复则跳过
        if(i!=0&&inArray[i]==inArray[i-1])continue
        for(let j=i+1;j<inArray.length;j++)
        {
            // 同上
            if(j!=i+1&&inArray[j]==inArray[j-1])continue
            for(let k=j+1;k<inArray.length;k++)
            {
               //同上
               if(k!=j+1&&inArray[k]==inArray[k-1])continue
               //当三数字结果相加等于0，添加到输出数组
               if(inArray[i]+inArray[j]+inArray[k]==0)
               outArray.push([inArray[i],inArray[j],inArray[k]])
            }
        }
    }
    return outArray
}