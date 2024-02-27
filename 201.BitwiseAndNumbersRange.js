/*
 * @Description: 给你两个整数 left 和 right ，表示区间 [left, right] ，
                 返回此区间内所有数字 按位与 的结果（包含 left 、right 端点）。
 * @Author: JunLiangWang
 * @Date: 2024-02-27 10:22:17
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2024-02-27 10:25:49
 */


/**
 * @description: BrianKernighan算法  TC:O(logn)  SC:O(1)
 * @param {*} left
 * @param {*} right
 * @return {*}
 */
function BrianKernighan(left, right){
    /**
     * 本方案使用Brian Kernighan 算法，它用于清除二进制串中最右边的 1。
     * BrianKernighan算法的关键在于我们每次对 number 和 number−1 之间
     * 进行按位与运算后，number 中最右边的 1 会被抹去变成 0。
     * 基于上述技巧，我们可以用它来计算两个二进制字符串的公共前缀。
     * 其思想是，对于给定的范围 [m,n]（m<n），我们可以对数字 n 迭代地应
     * 用上述技巧，清除最右边的 1，直到它小于或等于 m，此时非公共前缀部
     * 分的 1 均被消去。因此最后我们返回 n 即可。
     */
    while (left < right)right = right & (right - 1);
    return right;
}