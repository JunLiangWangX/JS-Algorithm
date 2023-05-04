/*
 * @Description: 给定 n 个非负整数表示每个宽度为 1 的柱子的高度图，计算按此排列的柱子，下雨之后能接多少雨水。
 * @Author: JunLiangWang
 * @Date: 2023-05-04 10:31:38
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-05-04 11:19:43
 */


/**
 * @description: 暴力破解   TC:O(n^2)  SC:O(1)
 * @author: JunLiangWang
 * @param {*} height  给定数组
 * @return {*}
 */
function bruteForce(height)
{
    /**
     * 对于第i个元素，其能接的最大雨水量为其左右两边最大高度的元素的最小值减去自身的高度，
     * 即：Min(leftMax,rightMax)-height[i]。 因此我们仅需遍历数组height中的每个元素，
     * 分别向左和向右扫描并记录左边和右边的最大高度，然后计算其位置能接的雨水量，最终所有
     * 元素能接的雨水量的相加即可。
     */
    // 初始化最大能接雨水
    let maxRainWater=0;
    // 遍历数组元素
    for(let i=0;i<height.length;i++)
    {
       // 初始化左边与右边最大元素为当前元素
       let leftMax=height[i],rightMax=height[i];
       // 遍历当前元素左边所有元素，找到最大值
       for(let leftMaxPoint=i-1;leftMaxPoint>=0;leftMaxPoint--)
       {
            if(height[leftMaxPoint]>leftMax)leftMax=height[leftMaxPoint];
       }
       // 遍历当前元素右边所有元素，找到最大值
       for(let rightMaxPoint=i+1;rightMaxPoint<height.length;rightMaxPoint++) 
       {
            if(height[rightMaxPoint]>rightMax)rightMax=height[rightMaxPoint];
       }
       // 计算其位置能接的雨水量，并将其相加
       maxRainWater+=Math.min(leftMax,rightMax)-height[i];
    }
    // 返回结果
    return maxRainWater;
}
