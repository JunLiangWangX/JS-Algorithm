/*
 * @Description: 在一条环路上有 n 个加油站，其中第 i 个加油站有汽油 gas[i] 升。
                 你有一辆油箱容量无限的的汽车，从第 i 个加油站开往第 i+1 个加油
                站需要消耗汽油 cost[i] 升。你从其中的一个加油站出发，开始时油箱
                为空。给定两个整数数组 gas 和 cost ，如果你可以按顺序绕环路行驶
                一周，则返回出发时加油站的编号，否则返回 -1 。如果存在解，则 保
                证 它是 唯一 的。
 * @Author: JunLiangWang
 * @Date: 2023-10-10 09:43:12
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-10-10 09:56:11
 */


/**
 * @description: 一次遍历   TC:O(n)  SC:O(1)
 * @author: JunLiangWang
 * @param {*} gas   给定整数数组，表示走到该点能加的油
 * @param {*} cost  给定整数数组，表示走到该点需要耗费的油
 * @return {*}
 */
function onceIteration(gas, cost){
    /**
     * 本方案采用一次遍历的方式，首先我们如何判断能否按顺序绕环路
     * 行驶一周呢？其实当gas的总和大于等于cost的总和我们肯定是能
     * 够按顺序绕环路一周的，即：Sum(gas)>=Sum(cost)
     * 
     * 如果可以按顺序绕环路行驶一周那么我们如何确定起点呢？
     * 其实也很简单，我们假定起点为0，并定义一个变量diff记
     * 录走过的节点gas与cost的差值的和，如果diff小于0，证明
     * 该节点以及之前的节点都无法作为起点，此时将起点更新为下
     * 一个节点，直至遍历结束。
     * 
     */
    // 总加油数
    let allGas=0,
    // 总耗油数
    allCost=0,
    // 走过的节点gas与cost的差值的和
    diff=0,
    // 起点初始为0
    index=0;
    for(let i=0;i<gas.length;i++){
        // 求总加油数
        allGas+=gas[i]
        // 求总耗油数
        allCost+=cost[i]
        // 记录走过的节点gas与cost的差值的和
        diff+=gas[i]-cost[i];
        // 如果diff小于0，证明该节点以及之前的
        // 节点都无法作为起点，此时将起点更新为
        // 下一个节点
        if(diff<0){
            diff=0;
            index=i+1==gas.length?0:i+1
        }
    }
    // 总加油数大于总耗油数，证明肯定是能
    // 够按顺序绕环路一周，此时返回计算的
    // 节点
    if(allGas>=allCost)return index
    // 否则不能返回-1
    else return -1;
}