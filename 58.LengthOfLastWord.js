/*
 * @Description: 给你一个字符串 s，由若干单词组成，单词前后用一些空格字符隔开。返回字符串中4
                 最后一个 单词的长度。单词 是指仅由字母组成、不包含任何空格字符的最大子字符串。
 * @Author: JunLiangWang
 * @Date: 2023-06-02 10:12:53
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-06-02 10:20:38
 */


/**
 * @description: 反向遍历   TC:O(n)  SC:O(1)
 * @author: JunLiangWang
 * @param {*} s  给定字符串
 * @return {*}
 */
function reverseTraversal(s){
    /**
     * 该方案利用反向遍历的方式，定义一个count遍历记录单词长度，
     * 然后反向遍历给定字符串s，当字符不等于空格时，count增加1，
     * 当字符等于空格时并且count不等于0时(count不等于0是为了防
     * 止多个空格的情况)证明已找到最后一个单词长度，直接返回即可，
     * 最后循环外再返回0(为了解决当给定字符串全为空格时的情况)
     */

    // 定义记录单词长度遍历
    let count=0;
    // 反向遍历给定字符串
    for(let i=s.length-1;i>=0;i--){
        // 当字符不等于空格时，此时为字母，count增加1
        if(s[i]!=' ')count++;
        // 当字符等于空格时并且count不等于0时(count不等于0是为了防
        // 止多个空格的情况)证明已找到最后一个单词长度，直接返回即可
        else if(count!=0)return count;
    }
    // 返回0(为了解决当给定字符串全为空格时的情况)
    return 0;
}