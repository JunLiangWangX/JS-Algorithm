/*
 * @Description: 给你两个字符串：ransomNote 和 magazine ，
                 判断 ransomNote 能不能由 magazine 里面的
                 字符构成。如果可以，返回 true ；否则返回false 。
 * @Author: JunLiangWang
 * @Date: 2023-11-18 09:18:02
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-11-18 09:21:34
 */


/**
 * @description: 哈希表   TC:O(n)  SC:O(n)
 * @author: JunLiangWang
 * @param {*} ransomNote 给定字符串
 * @param {*} magazine  给定字符串
 * @return {*}
 */
function hashMap(ransomNote, magazine){
    /**
     * 本方案使用hashmap的方式，首先遍历父字符串
     * 利用Map记录字符串中出现的字符的数量。
     * 然后遍历子字符串，如果存在map中不存在的字符
     * 或者字符数量多于map中该字符的数量，则返回false
     * 否则返回true
     */
    let map=new Map();
    for(let i=0;i<magazine.length;i++){
        let count=map.get(magazine[i])
        map.set(magazine[i],count==undefined?1:count+1);
    }
    for(let i=0;i<ransomNote.length;i++){
        let count=map.get(ransomNote[i])
        if(!count)return false
        map.set(ransomNote[i],count-1)
    }
    return true
}