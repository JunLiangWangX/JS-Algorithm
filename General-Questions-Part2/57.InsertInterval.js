/*
 * @Description: 给你一个 无重叠的 ，按照区间起始端点排序的区间列表。在列表中插入一个新的区间，
                 你需要确保列表中的区间仍然有序且不重叠（如果有必要的话，可以合并区间）。
 * @Author: JunLiangWang
 * @Date: 2023-06-01 08:49:41
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-06-01 09:33:34
 */



/**
 * @description: 双指针   TC:O(n)  SC:O(1)
 * @author: JunLiangWang
 * @param {*} intervals    原数组
 * @param {*} newInterval  需要插入的区间
 * @return {*}
 */
function doublePoints(intervals, newInterval){
    /**
     * 该方案使用双指针的方式，初始化第一/第二个指针为数组长度。
     * 
     * 试想有intervals，newInterval为以下情况：
     * intervals=[[1,2],[5,6],[7,8]],newInterval=[[3,4]]
     * 插入过后为：[[1,2],[3,4],[5,6],[7,8]]
     * 
     * 大家可以发现插入过后newInterval的左边的元素的第二个元素
     * 是小于newInterval[0]的，因此我们可以根据此来判断首个元素
     * 的插入位置(记作firstPoint)，当intervals[i][1]<newInterval[0]
     * 我们可以确定该元素是位于newInterval的左边的，可以排除掉这些元素，
     * 当遇到intervals[i][1]>=newInterval[0]，我们则确定了首个元素
     * 的插入位置。
     * 
     * 相同的，大家也可以发现插入过后的newInterval的右边元素的第一个元素
     * 是大于newInterval[1]的，因此我们可以根据此来判断第二个元素
     * 的插入位置(记作secondPoint)，当intervals[i][0]>newInterval[0],
     * 我们则确定了第二个元素的插入位置。
     * 
     * 确定两指针插入位置后，如果firstPoint==secondPoint，则首个元素与
     * 第二个元素插入位置相同，则证明与intervals其他元素并无交集，此时
     * 直接在该处插入元素即可；否则则需要将newInterval与intervals[firstPoint]
     * 、interVals[secondPoint]合并后，并删除中间的元素，然后再插入。
     * 
     * 
     */
    
    // 初始化第一/第二个指针为数组长度。
    let firstPoint=intervals.length,secondPoint=firstPoint;
    // 遍历原数组
    for(let i=0;i<intervals.length;i++){
        // 当intervals[i][1]<newInterval[0]我们可以确定该元素是位于newInterval
        // 的左边的，可以排除掉这些元素，当遇到intervals[i][1]>=newInterval[0]，
        // 我们则确定了首个元素的插入位置。
        if(firstPoint===intervals.length&&intervals[i][1]>=newInterval[0])firstPoint=i
        // 当intervals[i][0]>newInterval[0],我们则确定了第二个元素的插入位置。
        if(secondPoint===intervals.length&&intervals[i][0]>newInterval[1])secondPoint=i
    }
    // 如果firstPoint==secondPoint，则首个元素与第二个元素插入位置相同，
    // 则证明与intervals其他元素并无交集，此时直接在该处插入元素即可
    if(firstPoint===secondPoint){
        intervals.splice(firstPoint,0,newInterval);
    }
    // 否则则证明有交集，需要将newInterval与intervals[firstPoint]、
    // interVals[secondPoint]合并后，并删除中间的元素，然后再插入。
    else{
        intervals.splice(firstPoint,secondPoint-firstPoint,[
           Math.min(newInterval[0],intervals[firstPoint][0]),
           Math.max(newInterval[1],intervals[secondPoint-1][1])
        ])
    }
    // 返回结果
    return intervals;
}