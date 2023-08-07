/*
 * @Description: 以数组 intervals 表示若干个区间的集合，其中单个区间为 intervals[i] = [starti, endi] 。
                 请你合并所有重叠的区间，并返回 一个不重叠的区间数组，该数组需恰好覆盖输入中的所有区间 。
 * @Author: JunLiangWang
 * @Date: 2023-05-31 08:58:57
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-05-31 09:38:25
 */



/**
 * @description: 双指针   TC:O(n)  SC:O(1)
 * @author: JunLiangWang
 * @param {*} intervals  给定数组
 * @return {*}
 */
function doublePoints(intervals) {
    /**
     * 该方案采用双指针的方式，先根据元素中的第一个元素对数组进行升序排序，
     * 例如：[[3,6],[0,8],[2,3]]==>[[0,8],[2,3],[3,6]]。然后第一个指针
     * (firstPoint)初始化指向首个元素(记作first)，第二个指针(secondPoint)
     * 初始化指向第二个元素(记作second)，如果first与second产生了交集(即：
     * 当first的第二个元素大于等于了second的第一个元素，first[1]>=second[0]，
     * 此时两元素则有交集)，由于我们数组是按照元素中第一个元素升序排序的，因
     * 此无论如何first[0]则为最小的，所以合并后的元素为[first[0],Max(first[1],second[1])],
     * 然后我们将firstPoint所指的元素更改为合并后的元素。当first与second并无交集，
     * 我们则将firstPoint指向下一个元素，并将该元素赋值为secondPoint所指元素。
     * 最后secondPoint继续指向下一个元素，重复上述操作，直到遍历完成所有元素。
     * 
     */

    // 根据元素中的第一个元素对数组进行升序排序
    // 例如：[[3,6],[0,8],[2,3]]==>[[0,8],[2,3],[3,6]]
    intervals.sort((a, b) => a[0] - b[0])

    // 初始化第一个指针指向首个元素
    let firstPoint = 0;
    // 初始化第二个指针指向第二个元素
    for (let secondPoint = 1; secondPoint < intervals.length; secondPoint++) {
        // 如果两指针所指元素产生了交集
        if (intervals[firstPoint][1] >= intervals[secondPoint][0]) {
            // 则需要将两素合并，并把firstPoint所指的元素更改为合并后的元素由于
            // 我们数组是按照元素中第一个元素升序排序的，因此无论如何intervals[firstPoint][0]
            // 都是最小的，所以合并后的元素为
            // [intervals[firstPoint][0],Max(intervals[firstPoint][1],intervals[secondPoint][1])]
            intervals[firstPoint] = [intervals[firstPoint][0],
                Math.max(intervals[firstPoint][1], intervals[secondPoint][1])
            ]
            // 当两指针所指元素并无交集，我们则将firstPoint指向下一个元素，并将该元素赋值为secondPoint所指元素。
        } else {
            firstPoint++;
            intervals[firstPoint] = intervals[secondPoint];
        }
    }
    // 此时经过合并后数组长度变更为firstPoint+1
    intervals.length = firstPoint + 1;
    // 返回结果
    return intervals;
}