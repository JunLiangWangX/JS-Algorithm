/*
 * @Description: 给你一个单调递增的数组nums，和一个目标值target。 请你找出给定目标值在
                 数组中的开始位置和结束位置。如果不存在则返回[-1,-1]。
 * @Author: JunLiangWang
 * @Date: 2023-04-19 09:41:28
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-04-19 10:23:46
 */



/**
 * @description: 二分查找   TC:O(logn)  SC:O(1)
 * @author: JunLiangWang
 * @param {*} nums    输入数组
 * @param {*} target  目标值
 * @return {*}
 */
function binarySearch(nums,target)
{
    /**
     * 该方案使用二分查找的方法：
     * 
     * 对于查找元素的第一个位置，我们首先利用二分查找找到元素(设此时索引为middle)
     * 并记录该位置为元素的第一个位置，此时我们不知道middle前是否还存在该元素，因
     * 此继续利用二分查找区间[left,middle-1]中的元素，并重复上述过程，直至比对完
     * 数组元素为止。
     * 
     * 对于查找元素的最后一个位置，我们首先利用二分查找找到元素(设此时索引为middle)
     * 并记录该位置为元素的最后一个位置，此时我们不知道middle后是否还存在该元素，因
     * 此继续利用二分查找区间[middle+1, right]中的元素，并重复上述过程，直至比对完
     * 数组元素为止。
     */

    // 初始化元素第一个位置以及最后一个位置为-1，
    let firstIndex=-1,lastIndex=-1;
    /**
     * @description: 二分查找元素
     * @author: JunLiangWang
     * @param {*} isFindFirst  是否查找元素的第一个位置，
     *                         否则则为查找元素最后一个位置
     * @return {*}
     */    
    function binarySearchMethods(isFindFirst)
    {
        // 初始化左指针为首个元素，右指针为最后一个元素
        let left=0,right=nums.length-1;
        // 当左指针超出右指针证明比对完成数组所有元素，此时跳出循环
        while(left<=right)
        {
            // 计算中间索引
            let middle=Math.floor((left+right)/2);
            // 当中间索引处值等于target
            if(nums[middle]==target)
            {
                // 如果是查找元素的第一个元素，更新第一个位置值(firstIndex)
                // 为中间索引(middle),但我们不知middle前是否还存在相同元素
                // 因此则需要在区间[left,middle-1]继续重复该步骤，直至不满
                // 足循环条件位置
                if(isFindFirst)
                {
                    firstIndex=middle;
                    right=middle-1;
                }
                // 否则则是查找元素的最后一个位置，此时更新最后一个位置值
                // (lastIndex)为中间索引(middle),但我们不知middle后是否
                // 还存在相同元素，因此则需要在区间[middle+1,right]继续
                // 重复该步骤，直至不满足循环条件位置
                else
                {
                    lastIndex=middle;
                    left=middle+1
                }
            }
            // 当middle处值大于target，由于nums是单调递增的，因此可
            // 以得target是不在区间[middle,right]中的，因此我们在区
            // 间[left,middle-1]继续查找即可
            else if(nums[middle]>target)right=middle-1;
            // 反之，我们则在[middle+1,right]继续查找即可
            else left=middle+1;
        }
    }
    // 利用二分查找元素第一个位置
    binarySearchMethods(true);
    // 利用二分查找元素得最后一个位置
    binarySearchMethods(false);
    // 返回结果
    return [firstIndex,lastIndex];
}