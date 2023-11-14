/*
 * @Description: 给定字符串 s 和 t ，判断 s 是否为 t 的子序列。
 * @Author: JunLiangWang
 * @Date: 2023-11-14 09:30:42
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-11-14 09:35:30
 */


/**
 * @description: 双指针  TC:O(n)  SC:O(1)
 * @author: JunLiangWang
 * @param {*} s 给定字符串s
 * @param {*} t 给定字符串t
 * @return {*}
 */
function doublePoint(s, t){
    /**
     * 我们初始化两个指针i和j，分别指向t和s的首个字符。
     * 如果t[i]==s[j]则匹配成功,i和j同时右移，比较下一
     * 个字符;如果t[i]!=s[j]则匹配失败，i右移，j不变，
     * 继续比较下一个字符。最终如果j移动到s的末尾，就说
     * 明s是t的子序列。
     */
    let i=0,j=0;
    while(i<t.length&&j<s.length)
    {
        if(t[i]==s[j])j++
        i++
    }
    return j==s.length
}