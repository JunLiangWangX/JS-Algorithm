/*
 * @Description: 给你一个整数数组 citations ，其中 citations[i] 表示研究者的
                 第 i 篇论文被引用的次数。计算并返回该研究者的 h 指数。
 * @Author: JunLiangWang
 * @Date: 2023-11-09 09:37:27
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-11-09 09:52:20
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


/**
 * @description: 计数排序  TC:O(n)  SC:O(n)
 * @author: JunLiangWang
 * @param {*} citations  给定数组
 * @return {*}
 */
function countSort(citations){
    /**
     * 本方案使用计数排序的方式，对于N篇文章而言
     * 其引用次数可能为[0,1,2,3....,>=n]，我们
     * 可以根据此定义一个数组，其长度为n+1,索引
     * [0至n-1]分别记录引用次数0至(n-1)的文章，
     * 索引n则记录引用次数>=n的文章，根据上述规
     * 则遍历数组记录。
     * 
     * 最后我们从后向前遍历数组，当文章的篇数
     * 大于等于文章的引用时即为h指数
     */
    let len=citations.length,
    recordArray=new Array(len+1).fill(0);

    for(let i=0;i<len;i++){
        if(citations[i]>=len)recordArray[len]++
        else  recordArray[citations[i]]++
    }

    let total=0
    for(let i=len;i>=0;i--){
        total+=recordArray[i]
        if(total>=i)return i
    }

    return 0
}