/*
 * @Description: 给定一个字符串s和一个字符串数组words，返回所有串联字串（串联子串指一个包含words
                 中所有字符串以任意顺序排列连接起来的子串）在s中的开始索引。
 * @Author: JunLiangWang
 * @Date: 2023-04-14 15:52:17
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-04-14 16:35:40
 */


/**
 * @description: hashMap方法   TC:O(n^2)  SC:O(n^2)
 * @author: JunLiangWang
 * @param {*} s
 * @param {*} words
 * @return {*}
 */
function hashMap(s,words){
    /**
     * 该方案利用hashMap，将words中的所有单词转换为hashMap(key为单词，value
     * 单词出现的次数)。然后逐个遍历s中的字符，并以该字符开头组成单词(单词长度
     * 为words中的单词长度)，当该单词在hashMap中存在，则再定义一个hashMap记录
     * 该单词在s中出现的次数，并继续比对后续单词，当比对单词数量等于words中单词
     * 数量，且所有单词都在words中存在并没有超出重复次数，则该子串比对完成，添加
     * 记录开始索引，否则则比对失败，继续比对s后续字符。
     */

    // 将words数组转换为hashMap，key为数组元素，value为元素重复次数
    let wordsMap=new Map();
    for(let word of words)
    {
        let count=wordsMap.get(word);
        wordsMap.set(word,count==undefined?1:++count);
    }

    // 单词长度,由于全部单词长度一致，因此获取第一个即可
    let wordlength=words[0].length;
    // 所有单词拼接为字符串长度
    let concateWordLength=wordlength*words.length;
    // 定义输出数组
    let outArray=[];
    // 逐个遍历s中的字符，直到剩余字符数量小于所有单词拼接为字符串长度为止
    for(let index=0;index+concateWordLength<=s.length;index++)
    {
        // 当前开始比对的字符的索引
        let point=index;
        // 记录字符串s中已比对成功的单词出现的数量
        let countMap=new Map();
        while(1)
        {
            // 截取s中的单词
            let word=s.substr(point,wordlength);
            // 获取words的map中是否存在该单词，且重复数量是多少
            let isExist=wordsMap.get(word);
            // 如果words中没有该单词，证明无法匹配，直接跳出循环
            if(isExist==undefined)break;
            // 获取s中该单词已出现的次数，如果为undefined则未出现过
            let count=countMap.get(word);
            // 如果该单词出现次数已等于words中该单词的重复次数，证明
            // 无法匹配，直接跳出循环
            if(isExist==count)break;
            // 若该单词未出现过，则向countMap记录出现次数1；若该单词
            // 出现过，且重复次数小于words该单词的重复次数，则将次数+1
            // 记录
            countMap.set(word,count==undefined?1:++count);
            // 继续比对下一个单词
            point+=wordlength;
            // 当单词数量等于words中单词数量，证明比对完成且匹配，向
            // 输出数组添加索引，并跳出循环
            if(point-index==concateWordLength)
            {
                outArray.push(index);
                break;
            }
        }
    }
    // 返回结果
    return outArray;
}