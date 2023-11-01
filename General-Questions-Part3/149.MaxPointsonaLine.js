/*
 * @Description: 给你一个数组 points ，其中 points[i] = [xi, yi] 
                 表示 X-Y 平面上的一个点。求最多有多少个点在同一条
                 直线上。
 * @Author: JunLiangWang
 * @Date: 2023-10-28 10:26:45
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-10-28 10:43:08
 */


/**
 * @description: 暴力破解  TC:O(n^3)  SC:O(1)
 * @author: JunLiangWang
 * @param {*} points 给定数组
 * @return {*}
 */
function bruteForce(points){
    /**
     * 本方案采用暴力破解得方式，一开始我的想法是遍历数组元素
     * 两两组成一条直线，然后根据直线求出斜率与截距，得出直线
     * 方程，最终再次遍历数组元素，将(x,y)带入直线方程中，如果
     * 满足则证明该点存在直线中。
     * 
     * 但我在其中遇到了如下问题：
     *   0.斜率公式为:(y2-y1)/(x2-x1),(x2-x1)可能等于0
     *   1.先求出斜率可能存在精度不够得问题，例如斜率为1/3,此时
     *     存储的数据则为:0.33333333333，此时点为(3,1),代入时
     *     结果为0.999999999，不等于1了
     * 
     * 解决思路：
     *   我们先不求解两点直线的斜率/截距，而是在再次遍历数组
     *   找存在于直线的元素时，将3个点分别构成两条直线，如果
     *   两直线斜率相等，则两直线在一条直线上，否则不在一条直
     *   线上，此时公式则为
     *   
     *   求直线1斜率：(y2-y1)/(x2-x1)
     *   求直线2斜率：(y3-y2)/(x3-x2)
     * 
     *   两者斜率相等才存在于一条直线上：
     *            (y2-y1)/(x2-x1)==(y3-y2)/(x3-x2)
     *   变换一下：(y2-y1)*(x3-x2)==(y3-y2)*(x2-x1)
     *   
     *   这里巧妙的把除法变成了乘法，规避了精度问题以及
     *   x2-x1==0或x3-x2==0的问题。
     * 
     * 
     */
    if(points.length<3)return points.length
    let maxCount=2
    for(let i=0;i<points.length;i++){
        for(let j=i+1;j<points.length;j++){
            let count=2;
            for(let k=j+1;k<points.length;k++){

                let y=[points[i][1],points[k][1],points[j][1]],
                    x=[points[i][0],points[k][0],points[j][0]],
                     // 两者斜率相等才存在于一条直线上：
                    //            (y2-y1)/(x2-x1)==(y3-y2)/(x3-x2)
                    //   变换一下：(y2-y1)*(x3-x2)==(y3-y2)*(x2-x1)
                    slope1= (y[1]-y[0])*(x[2]-x[1]),
                    slope2= (y[2]-y[1])*(x[1]-x[0])
                if(slope1==slope2)count++

            }
            maxCount=Math.max(count,maxCount)
        }
    }
    return maxCount
}