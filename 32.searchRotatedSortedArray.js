/*
 * @Description: 给你旋转后的数组nums和一个整数target，如果nums中存在这个目标值target，则返回它的下标，否则返回-1。
 * @Author: JunLiangWang
 * @Date: 2023-04-18 10:37:43
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-04-18 10:57:20
 */



/**
 * @description: 二分查找   TC:O(logn)  SC:O(1)
 * @author: JunLiangWang
 * @param {*} nums    输入数组
 * @param {*} target  目标值
 * @return {*}
 */
function binarySearch(nums,target){
    /**
     * 该方案使用二分查找的方式，其中的关键则为将局部有序的数组一分为二，其中一定有一个是有序的，
     * 另一个可能是有序，也能是部分有序。此时有序部分用二分法查找，如果目标值未在其范围。则将无
     * 序部分再一分为二，其中一个一定有序，另一个可能有序，可能无序。就这样循环，直至遍历完数组。
     */

    // 初始化左指针为0，右指针为数组最后一个元素
    let left=0,right=nums.length-1;
    // 当左指针超过右指针，证明遍历完成，跳出循环
    while(left<=right)
    {
        // 寻找中间值
        let middle=Math.floor((left+right)/2);
        // 如果中间值等于目标值，直接返回索引
        if(nums[middle]==target)return middle;

        // 找到有顺序的一半数组（无论如何分割数组，总有一半是全为升序的）
        // 如果nums[left]<=nums[middle]证明[left,middle]该区间全为升序
        if(nums[left]<=nums[middle])
        {
            // 如果目标值不在该区间值的范围内，则去掉区间[left,middle]从
            // [middle+1,right]区间继续遍历
            if(target<nums[left]||target>nums[middle])left=(middle+1);
            // 否则目标值在区间[left,middle]中，则去掉[middle,right]区间
            // 从[left,middle-1]继续遍历
            else right=(middle-1);
        }
        // 否则[middle,right]区间全为升序
        else
        {
            // 如果目标值不在该区间值的范围内，则去掉区间[middle,right]从
            // [left,middle-1]区间继续遍历
            if(target<nums[middle]||target>nums[right])right=(middle-1);
            // 否则目标值在区间[middle,right]中，则去掉[left,middle]区间
            // 从[middle+1,right]继续遍历
            else left=(middle+1);
        }
    }
    // 遍历完数组元素后仍未找到目标值，直接返回-1
    return -1;
}