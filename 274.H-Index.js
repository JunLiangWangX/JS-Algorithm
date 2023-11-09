/*
 * @Description: 给你一个整数数组 citations ，其中 citations[i] 表示研究者的
                 第 i 篇论文被引用的次数。计算并返回该研究者的 h 指数。
 * @Author: JunLiangWang
 * @Date: 2023-11-09 09:37:27
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-11-09 09:41:43
 */



/**
 * @description: 排序法  TC:O(nlogn) SC:O(1)
 * @author: JunLiangWang
 * @param {*} citations 给定数组
 * @return {*}
 */                 
function sort(citations){
    /**
     * 本方案使用排序的方式，先对给定数组citations
     * 进行降序排序，然后遍历数组，直到当其索引+1大
     * 于它的被引次数，则该索引即为他的h指数
     */

    // 对数组进行降序排序
    citations.sort((a,b)=>b-a)

    let i=0;
    while(i+1<=citations[i]&&i<=citations.length)i++
    
    return i
}