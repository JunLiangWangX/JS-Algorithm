/*
 * @Description: 本题就是合并区间交集
 * @Author: JunLiangWang
 * @Date: 2023-12-02 09:49:56
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-12-02 10:03:13
 */


/**
 * @description: 贪心  TC:O(nlogn) SC:O(1)
 * @author: JunLiangWang
 * @param {*} points 给定数组
 * @return {*}
 */
function sortAndGreedy(points) {
    /**
     * 本方案使用排序+贪心的方案，首先根据数组x开始位置
     * 进行升序排序，如下例子:
     *  原数组： [[2,3],[4,6],[1,5],[3,7]]
     *  排序后： [[1,5],[2,3],[3,7],[4,6]] 
     * 
     * 如何合并其交集呢？其实就是前一个元素的结束位置，是
     * 否超过了后一个元素的开始位置，如果超过则证明两元素
     * 有交集，没有超过证明无交集。其交集范围则为：
     *     [后一个元素的start，Min(两元素的end)]
     * 由于是根据start排序的，后一个元素的star肯定是大于
     * 等于前一个元素的。
     * 
     * 
     */

    // 如果元素个数小于等于1，直接返回元素个数即可
    if (points.length <= 1) return points.length
    // 根据元素的开始位置，对数组进行排序
    points.sort((a, b) => a[0] - b[0])
    // 记录当前交集的end位置
    let end = points[0][1], 
    // 记录当前有多少无交集元素，由于从1开始的，因此初始化为1
    count = 1;
    // 从1遍历数组元素
    for (let i = 1; i < points.length; i++) {
        // 如果当前交集的结束位置，超过了后一个元素的开始位置
        // 证明两者还存在交集，此时更新两者交集的结束位置
        if (end >= points[i][0]) end = Math.min(points[i][1], end)
        // 反之则没有交集
        else {
            // count+1
            count++;
            // 将当前交集结束位置更新为当前元素的结束位置
            end = points[i][1]
        }
    }
    // 返回结果
    return count;
}