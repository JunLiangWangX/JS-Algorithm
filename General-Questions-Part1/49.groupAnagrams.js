/*
 * @Description: 给你一个字符串数组，请你将 字母异位词 组合在一起。可以按任意顺序返回结果列表。
                 字母异位词 是由重新排列源单词的字母得到的一个新单词，所有源单词中的字母通常恰好只用一次。
 * @Author: JunLiangWang
 * @Date: 2023-05-13 10:39:14
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-05-13 11:19:41
 */


/**
 * @description: 排序    TC:O(nlogn)  SC:O(n)
 * @author: JunLiangWang
 * @param {*} strs  给定字符串数组
 * @return {*}
 */
function sort(strs){

    /**
     * 本方案使用排序的方式，对数组中的每个字符串进行排序(按ascii码大小)，
     * 当两字符串使用相同单词时，排序过后两字符串则相等，利用这一点，我们将排序
     * 后字符串作为key，其内容存放在输出数组的索引作为value存入map中，当遇
     * 使用相同单词的字符串时，我们就能从map中找到相同的key存放的索引位置
     */

    // 定义map
    let recordMap=new Map(),
    // 定义输出数组
        outArray=[];
    // 遍历字符串数组
    for(let i=0;i<strs.length;i++){
        // 对字符串进行排序(按ascii码大小)
        let key=Array.from(strs[i]).sort().toString();
        // 查询是否已有使用相同单词的字符串
        let index=recordMap.get(key);
        // 没有使用相同单词的字符串
        if(index==undefined){
            // 向输出数组添加该字符串数组
            outArray.push([strs[i]]);
            // 在map中记录该字符串以及其索引位置
            recordMap.set(key,outArray.length-1);
        }
        // 有使用相同的单词的字符串
        else{
            // 在该处索引添加该字符串
            outArray[index].push(strs[i])
        }
    }
    // 返回结果
    return outArray;
}


/**
 * @description: 计数   TC:O(nlogn)  SC:O(n)
 * @author: JunLiangWang
 * @param {*} strs  给定字符串数组
 * @return {*}
 */
function count(strs){
    /**
     * 该方案使用计数的方式，其基本逻辑与上一算法一致，但上一算法中
     * key为排序后的字符串，这里key为字符串中26个单词的出现次数。当
     * 我们遍历字符串数组元素时，我们首先会初始化一个长度为26的数组所
     * 有元素为0，其中元素位置0-25分别表示单词a-z的出现次数，然后遍历
     * 当前字符串字符，统计a-z单词出现的次数，并以此作为key。
     */

    let recordMap=new Map(),
        outArray=[];
    for(let i=0;i<strs.length;i++){
        // 初始化长度为26的数组且所有元素为0
        let wordCountArray=new Array(26).fill(0);
        // 遍历字符串所有字符，统计单词出现次数
        for(let j=0;j<strs[i].length;j++)wordCountArray[(strs[i].charCodeAt(j)-97)]++;
        
        let key=wordCountArray.toString();
        let index=recordMap.get(key);
        if(index===undefined){
            outArray.push([strs[i]]);
            recordMap.set(key,outArray.length-1);
        }else{
            outArray[index].push(strs[i]);
        }
    }
    return outArray;
}