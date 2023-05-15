/*
 * @Description: 查找字符串数组中的最长公共前缀，如果不存在公共前缀，返回空字符串。
 * @Author: JunLiangWang
 * @Date: 2023-03-10 09:46:28
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-03-10 10:03:51
 */


/**
 * @description: 纵向比较法  TC:O(n^2) SC:O(1)
 * @author: JunLiangWang
 * @param {*} strs 输入的字符串数组
 * @return {*}
 */
function longitudinalComparison(strs)
{
    // 当前需要对比的字符索引
    let index=0
    // 已比对的相同的前缀字符串
    let commonPrefix=''
    // strs[0]当前需要对比的字符不为undefined则继续循环，否则则证明当前字符不构成共有前缀字符串，跳出循环直接返回结果
    while(strs[0][index])
    {
        // 当前需要比对的前缀字符
        let currentCharacter=strs[0][index]
        // 遍历字符串开始比对
        for(let i=1;i<strs.length;i++)
        {
            // 当strs[i]的当前字符为undefined或不等于当前需要比对的前缀字符，则证明当前字符不构成共有的前缀字符串
            if(strs[i][index]==undefined||strs[i][index]!=currentCharacter)return commonPrefix
        }
        // 追加已比对的相同的前缀字符
        commonPrefix+=currentCharacter
        // 索引+1
        index++
    }
    return commonPrefix
}