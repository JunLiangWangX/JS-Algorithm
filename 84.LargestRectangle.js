/*
 * @Description: 给定 n 个非负整数，用来表示柱状图中各个柱子的高度。每个柱子彼此相邻，且宽度为 1 。
                  求在该柱状图中，能够勾勒出来的矩形的最大面积。
 * @Author: JunLiangWang
 * @Date: 2023-07-08 10:08:28
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-07-08 10:24:20
 */


/**
 * @description: 暴力破解   TC:O(n^2)   SC:O(1)
 * @author: JunLiangWang
 * @param {*} heights 给定高度数组
 * @return {*}
 */                  
function bruteForce(heights) {
    /**
     * 本方案采用暴力破解的方式，遍历数组每个元素，并将该元素作为
     * 它组成矩形的最高高度，由此以它为中心向左右扩散(遍历)，当遇
     * 到小于它的元素或到达边界则停止遍历，当遍历完成则计算出面积，
     * 该面积则为以它为最高高度组成的矩形面积，然后与当前记录最大
     * 面积比较，得出最大面积。
     */

    // 记录最大面积
    let maxArea = 0;
    // 遍历数组每个元素，并将该元素作为它组成矩形的最高高度
    for (let i = 0; i < heights.length; i++) {
        // 向左遍历指针
        let left = i - 1,
        // 向右遍历指针
            right = i + 1,
        // 宽度
            count = 1;
        // 向左扩散，当遇到小于当前元素的元素或到达边界则停止遍历
        while (left >= 0 && heights[left] >= heights[i]) {
            left--;
            count++;
        }
        // 向右扩散，当遇到小于当前元素的元素或到达边界则停止遍历
        while (right < heights.length && heights[right] >= heights[i]) {
            right++;
            count++;
        }
        // 计算面积与当前记录最大面积比较，得出最大面积。
        if (maxArea < count * heights[i]) maxArea = count * heights[i];
    }
    // 返回最大面积
    return maxArea;
}