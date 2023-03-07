/*
 * @Description: 
 * @Author: JunLiangWang
 * @Date: 2023-03-07 10:10:39
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-03-07 10:18:20
 */

/**
 * @description: 暴力破解方法  TC:O(n^2)  SC:O(1)
 * @author: JunLiangWang
 * @param {*} height 输入的高度数组
 * @return {*}
 */
function bruteForce(height)
{
    let maxAreaValue=0
    // 从0开始遍历数组，i为左边界
    for(let i=0;i<height.length;i++)
    {
        // 从i+1开始遍历数组，j为右边界
        for(let j=i+1;j<height.length;j++)
        {
            //(j-i)为矩形的长x，height[i]与height[j]中更短的边为矩形的宽y
            let tempArea=(j-i)*Math.min(height[i],height[j])
            //如果此时面积大于记录的最大面积，则更新最大值
            if(tempArea>maxAreaValue)maxAreaValue=tempArea
        }
    }
    return maxAreaValue
}