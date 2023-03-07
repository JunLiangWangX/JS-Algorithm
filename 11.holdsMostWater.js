/*
 * @Description: 给定一个长度为 n 的整数数组 height 。有 n 条垂线，第 i 条线的两个端点是 (i, 0) 和 (i, height[i]) 。
                 找出其中的两条线，使得它们与 x 轴共同构成的容器可以容纳最多的水。返回容器可以储存的最大水量。
 * @Author: JunLiangWang
 * @Date: 2023-03-07 10:10:39
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-03-07 10:20:16
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