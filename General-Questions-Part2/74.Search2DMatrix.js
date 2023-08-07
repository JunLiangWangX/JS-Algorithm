/*
 * @Description: 编写一个高效的算法来判断 m x n 升序矩阵中，是否存在一个目标值。
 * @Author: JunLiangWang
 * @Date: 2023-06-21 09:02:22
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-06-21 09:17:42
 */



/**
 * @description: 二分法   TC:O(logn)  SC:O(1)
 * @author: JunLiangWang
 * @param {*} matrix  给定矩阵
 * @param {*} target  给定目标值
 * @return {*}
 */
function binary(matrix, target) {
    /**
     * 本方案使用二分法，二维矩阵(m行，n列)可看作一个一维矩
     * 阵 ，其长度为 m*n，当我们选择一维矩阵的某个元素的下
     * 标时(例如index)，其在二维矩阵的行索引为index/n，列
     * 索引为index%n，并且二维矩阵是升序的，因此本题即可看
     * 作为在升序的一维数组中寻找目标值，即可使用二分法。
     */

    let m = matrix.length,
        n = matrix[0].length,
        // 初始化左指针为首个元素
        left = 0,
        // 初始化右指针为最后一个元素
        right = m * n - 1;
    // 当左指针超过了右指针，证明遍历完成
    while (left <= right) {
        // 取得中间值
        let middle = Math.floor((left + right) / 2);
        // 将一维数组的索引转为二维数组索引
        let row=Math.floor(middle/n),col=middle%n;
        // 如果矩阵元素等于目标值，直接返回
        if(matrix[row][col]===target)return true;
        // 如果当前元素大于目标值，由于数组为升序，
        // 证明后续区间[middle,right]的元素都是
        // 大于目标值的，因此直接舍弃，在[left,middle-1]
        // 区间继续寻找
        else if(matrix[row][col]>target)right=middle-1;
        // 如果当前元素小于目标值，由于数组为升序，
        // 证明前面区间[left,middle]的元素都是
        // 小于目标值的，因此直接舍弃，在[middle+1,right]
        // 区间继续寻找
        else left=middle+1;
    }
    // 遍历完成依旧没找到目标值，直接返回false
    return false;
}