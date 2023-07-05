/*
 * @Description: 给你 旋转后 的数组 nums 和一个整数 target ，请你编写一个函数来判断给定的
                 目标值是否存在于数组中。如果 nums 中存在这个目标值 target ，则返回 true，
                 否则返回 false 。
 * @Author: JunLiangWang
 * @Date: 2023-07-05 09:25:15
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-07-05 09:44:59
 */


/**
 * @description: 二分法   TC:O(logn)  SC:O(1)
 * @author: JunLiangWang
 * @param {*} nums   给定旋转后数组
 * @param {*} target 给定目标值
 * @return {*}
 */
function binary(nums, target) {
    /**
     * 与搜索旋转数组I一样，它的关键信息是旋转后的数组将其一分为二，有一半数
     * 组始终是有序的，因此本题使用二分法的方式。我们定义两只指针(left,right)。
     * left指向数组首个元素，right指向数组最后一个元素。而中值middle始终等于
     * (left+right)/2，此时会形成两个区间[left,middle],[middle,right]。在
     * 搜索旋转数组I中，由于数组元素不存在重复，因此我们很容易得出两个区间中
     * 哪一个是有序的(nums[left]<nums[middle],则区间[left,middle]有序，反之
     * 则[middle,right]有序)，然后通过target是否在区间从而确定选择区间范围。
     * 但由于该题存在重复的元素，存在nums[left]==nums[middle]==nums[right]
     * 的情况，导致无法判断哪一个区间有序，例如：nums=[3,1,2,3,3,3,3]，
     * target=2，首次二分时无法判断区间 [0,3] 和区间 [4,6] 哪个是有序的。
     * 对于这种情况我们只能将当前二分区间的左边界加一(left+1)，右边界减一
     * (right-1)， 然后在新区间上继续二分查找。
     */

    // 初始化左指针指向数组首个元素
    let left = 0,
        // 初始化右指针指向数组最后一个元素
        right = nums.length - 1;
    // 当左指针超过右指针证明已比较完所有区间
    while (left <= right) {
        // 定义中间指针，将数组分为两个区间[left,middle],[middle,right]
        let middle = Math.floor((right + left) / 2)
        // 中值等于目标值，直接返回true
        if (nums[middle] == target) return true;
        // 由于该题存在重复的元素，存在nums[left]==nums[middle]==nums[right]
        // 的情况，导致无法判断哪一个区间有序
        if (nums[middle] == nums[right] && nums[middle] == nums[left]) {
            // 对于该种情况我们只能将二分区间的左边界
            // 加一(left+1)，右边界减一(right-1)
            left++;
            right--;
        }
        // 当不存在无法判断区间有序的情况，此时如果nums[middle] <= nums[right]
        // 证明区间[middle,right]有序，我们在其中比较
        else if (nums[middle] <= nums[right]) {
            // 判断目标值target是否在区间[middle,right]的范围内
            if (nums[middle] < target && nums[right] >= target)
                // 如果在该范围内，此时我们应该在区间[middle+1,right]中继续二分
                left = middle + 1;
            else
                // 如果不在该范围内容，此时舍弃该区间，在区间[left,middle-1]中继续二分
                right = middle - 1;
        }
        // 否则，则区间[left,middle]有序
        else {
            // 此处同理，不再过多解释
            if (nums[middle] > target && nums[left] <= target)
                right = middle - 1;
            else
                left = middle + 1;
        }
    }
    // 遍历完成仍未找到目标值，直接返回false
    return false;
}