/*
 * @Description: 给你两个按 非递减顺序 排列的整数数组 nums1 和 nums2，另有两个整数 m 和 n ，分别表示 nums1 和 nums2 中的元素数目。
                 请你 合并 nums2 到 nums1 中，使合并后的数组同样按 非递减顺序 排列。
 * @Author: JunLiangWang
 * @Date: 2023-07-19 09:06:51
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-07-19 09:24:09
 */

/**
 * @description: 双指针   TC:O(n)  SC:O(1)
 * @author: JunLiangWang
 * @param {*} nums1  给定非递减顺序排列的整数数组nums1
 * @param {*} m   nums1数组长度
 * @param {*} nums2 给定非递减顺序排列的整数数组nums2
 * @param {*} n nums2数组长度
 * @return {*}
 */
function doublePoint(nums1, m, nums2, n) {
    /**
     * 该方案使用双指针的方式，nums1.length是等于m+n的，因此
     * 我们可以利用nums1[m+1:nums1.length-1]这段空闲的空间，来
     * 放排好序的元素，由于是从尾部开始的，因此我们不能再从前
     * 向后升序比较元素，而是从后向前降序比较元素。
     * 
     * 我们定义两个指针firstPoint指向nums1的最后一个元素即：
     * m-1,secondPoint指向nums2的最后一个元素即：n-1。然后
     * 我们将两指针所指的较大的元素放入最后nums1最后的位置
     * (即nums1[firstPoint+seoncdPoint+1])然后将相应的数
     * 组元素前移一位，直到firstPoint或secondPoint任一超
     * 出数组范围，然后再将未超出数组范围的指针元素逐个放入
     * nums1中即可
     */

    // 定义指针指向nums1的最后一个元素
    let firstPoint = m - 1,
    // 定义指针指向nums2的最后一个元素
        secondPoint = n - 1;
    // firstPoint或secondPoint任一超
    // 出数组范围则结束遍历
    while (firstPoint >= 0 && secondPoint >= 0) {
        // 将两指针所指的较大的元素放入最后nums1最后的位置
        // (即nums1[firstPoint+seoncdPoint+1])然后将相应的数
        // 组元素前移一位
        if (nums1[firstPoint] > nums2[secondPoint]) {
            nums1[firstPoint + secondPoint + 1] = nums1[firstPoint];
            firstPoint--;
        }
        else {
            nums1[firstPoint + secondPoint + 1] = nums2[secondPoint];
            secondPoint--;
        }
    }
    // 如果secondPoint未超出数组范围，
    // 则将剩余元素逐个放入nums1中
    if (secondPoint >= 0) {
        for (let i = 0; i <= secondPoint; i++)nums1[i] = nums2[i];
    }

    // 如果firstPoint未超过数组范围，
    // 由于firstPoint所指元素本身就在
    // nums1中且是升序的，因此无需操作
}