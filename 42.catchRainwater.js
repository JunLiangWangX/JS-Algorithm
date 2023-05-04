/*
 * @Description: 给定 n 个非负整数表示每个宽度为 1 的柱子的高度图，计算按此排列的柱子，下雨之后能接多少雨水。
 * @Author: JunLiangWang
 * @Date: 2023-05-04 10:31:38
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-05-04 16:17:51
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


/**
 * @description: 动态规划  TC:O(n)  SC:O(n)
 * @author: JunLiangWang
 * @param {*} height  给定数组
 * @return {*}
 */
function dp(height){

    /**
     * 上述暴力破解法，我们发现对于每个元素，我们都需要向左/右遍历寻找最大元素，也因此导致了
     * O(n^2)的时间复杂度，如果已经知道每个位置两边的最大高度，则可以在O(n)的时间内得到能接
     * 的雨水总量。利用动态规划的方法，我们可在O(n)的时间内预处理得到每个位置两边的最大高度。
     * 
     * 我们可以利用动态规划的方式，创建两个长度等于n(n=height.length)的数组leftMax和rightMax
     * 我们可以直观得出：leftMax[0]=height[0](第一个元素左边最大元素为本身)
     *                 rightMax[n]=height[n](n=height.length-1，最后一个元素右边最大元素为本身)
     * 
     * 而其余元素的左/右最大元素，则为前/后一个左/右最大元素与自身较大的一个元素
     * 即为：leftMax[i]=Max(leftMax[i-1],height[i])
     *      rightMax[i]=Max(rightMax[i+1],height[i])
     */                 
    
    // 记录每个元素左边最大元素值
    let leftMax=new Array(height.length),
    // 记录每个元素右边最大元素值
        rightMax=new Array(height.length);
    // 首个元素左边最大元素为其本身 
    leftMax[0]=height[0];
    // 最后一个元素右边最大元素为其本身
    rightMax[height.length-1]=height[height.length-1],
    maxRainWater=0;
    
    // 从下标1开始遍历height数组，获取每个元素当前位置左边最大元素
    for(let i=1;i<height.length;i++)
    {
        // 当前元素的左边最大元素，则为前一个左边最大元素与自身较大的一个元素
        leftMax[i]=leftMax[i-1]>height[i]?leftMax[i-1]:height[i];
    }
    // 从n-2开始遍历height元素，获取每个元素当前位置右边最大元素
    for(let i=height.length-2;i>=0;i--)
    {
        // 当前元素的右边最大元素，则为后一个右边最大元素与自身较大的一个元素
        rightMax[i]=rightMax[i+1]>height[i]?rightMax[i+1]:height[i];
    }
    //  计算其位置能接的雨水量，并将其相加
    for(let i=0;i<height.length;i++)
    {
        maxRainWater+=Math.min(leftMax[i],rightMax[i])-height[i];
    }
    // 返回结果
    return maxRainWater;
}


/**
 * @description: 双指针   TC:O(n)  SC:O(1)
 * @author: JunLiangWang
 * @param {*} height  给定数组
 * @return {*}
 */
function doublePoint(height){
    /**
     * 我们可以利用双指针，优化上述DP算法，使得空间复杂度降为O(1)，
     * 上述DP算法我们可以看出：
     *    对于i处左边最大值leftMax有:leftMax[i]<=leftMax[i+1]
     *    对于i处右边最大值rightMax有:rightMax[i]<=rightMax[i-1]
     *    该位置存水量为：min(leftMax[i],rightMax[i])-heihgt[i]
     * 
     * 我们可以利用双指针：
     *    初始化左边最大元素为0，leftMax=0;
     *    初始化左指针为第一个元素，leftPoint=1；
     *    初始化右边最大元素为0，rightMax=0;
     *    初始化右指针为最后一个元素，rightPoint=height.length-1；
     *    计算左指针当前元素的左边最大元素，即：leftMax=Max(leftMax,height[leftPoint])
     *    计算右指针当前元素的右边最大元素，即：rightMax=Max(rightMax,height[rightMax])
     *    当leftMax<rightMax时，由于rightMax[i]<=rightMax[i-1]，因此左指针当前元素的
     *    右边最大值肯定是大于左边最大值的，即：leftMax<rightMax[leftPoint]此时
     *     min(leftMax,rightMax[leftPoint])=leftMax，该位置存水量即为leftMax-height[leftPoint]
     *    反之rightMax<leftMax，由于leftMax[i]<=leftMax[i+1],因此右指针当前元素的右边最大值
     *    肯定小于左边最大值，即：rightMax<leftMax[rightPoint]， 此时
     *    min(rightMax,leftMax[rightPoint])=rightMax，该位置存水量即为rightMax-height[rightPoint]
     * 
     */  
    let leftPoint=0,
        leftMax=0,
        rightPoint=height.length-1,
        rightMax=0,
        maxRainWater=0;
    
    while(leftPoint<rightPoint)
    {
        leftMax=Math.max(leftMax,height[leftPoint]);
        rightMax=Math.max(rightMax,height[rightPoint]);
        if(leftMax<rightMax)
        {
            maxRainWater+=leftMax-height[leftPoint];
            leftPoint++;
        }
        else
        {
            maxRainWater+=rightMax-height[rightPoint];
            rightPoint--;
        }
    }
    return maxRainWater;
        
}