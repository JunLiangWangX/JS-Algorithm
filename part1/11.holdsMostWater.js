/*
 * @Description: 给定一个长度为 n 的整数数组 height 。有 n 条垂线，第 i 条线的两个端点是 (i, 0) 和 (i, height[i]) 。
                 找出其中的两条线，使得它们与 x 轴共同构成的容器可以容纳最多的水。返回容器可以储存的最大水量。
 * @Author: JunLiangWang
 * @Date: 2023-03-07 10:10:39
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-03-08 08:53:59
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

/**
 * @description: 双指针  TC:O(n)  SC:O(1)
 * @author: JunLiangWang
 * @param {*} height 输入的高度数组
 * @return {*}
 */
function doublePoint(height){
    // 左边界指针
    let left=0
    // 右边界指针
    let right=height.length-1
    // 最大面积
    let maxArea=0
    // 中止循环条件：当左右边界指针重合或左边界超出右边界
    while(right>left)
    {
       // 计算当前面积：(right-left)为x轴长，min(height[right],height[left])为y轴高
       let tempArea=(right-left)*Math.min(height[right],height[left])
       // 当前面积大于记录的最大值，则更改最大值
       if(tempArea>maxArea)maxArea=tempArea
       // 当右边界值更高，则使其左边界向中心移动
       // 当左边界值更高，则使其右边界向中心移动
       // 直至不满足循环
       if(height[right]>height[left])left++
       else right--
    }
    return maxArea
    /**
     * 为什么双指针的做法是正确的？
     * 双指针代表的是可以作为容器边界的所有位置的范围。在一开始，双指针指向数组的左右边界，
     * 表示数组中所有的位置都可以作为容器的边界，因为我们还没有进行过任何尝试。在这之后，
     * 我们每次将对应的数字较小的那个指针往另一个指的方向移动一个位置，就表示我们认为这
     * 个指针不可能再作为容器的边界了。
     * 
     * 当某一边界确定时，则它为短期内的极大值，即使后续遇见更大值，其前一极大值与当前边界值
     * 已组成了最高的高
     */
}