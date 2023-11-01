/*
 * @Description: 给你一个字符串 s ，请你反转字符串中 单词 的顺序。
 * @Author: JunLiangWang
 * @Date: 2023-11-01 11:26:00
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-11-01 11:33:38
 */


/**
 * @description: 栈  TC:O(n)  SC:O(n)
 * @author: JunLiangWang
 * @param {*} s 给定字符串s
 * @return {*}
 */
function stack(s) {
    /**
     * 本方案使用栈的方式，首先遍历字符串s,利用变量word存放
     * 已遍历的字符，然后遇到空格字符则把word压入栈中，随后
     * 将word置为空字符串，如此反复直到遍历完成字符串s
     * 
     * 遍历完成字符串后，由于字符串s的最后一个字符可能不存在
     * 空格，因此需要检查word是否为空字符串，如果不为空则将其
     * 压入栈中
     * 
     * 最后遍历出栈，然后根据出栈的字符重新使用空格拼接即可
     */
    let word = '', stack = []

    //遍历字符串s,利用变量word存放已遍历的字符，然后遇
    //到空格字符则把word压入栈中，随后将word置为空字符
    //串，如此反复直到遍历完成字符串s
    for (let i = 0; i < s.length; i++) {
        if (s[i] == ' ') {
            if (word != '') stack.push(word)
            word = ''
            continue;
        }
        word += s[i]
    }
    // 字符串s的最后一个字符可能不存在空格，因此需要检查
    // word是否为空字符串，如果不为空则将其压入栈中
    if (word != '') stack.push(word)

    // 如果没有单词直接返回空字符
    if (stack.length == 0) return ''
    // 如果只有一个单词直接返回单词
    else if (stack.length == 1) return stack[0]
    // 如果有两个单词以上，则需要使用空格拼接单词
    word = stack.pop()
    while (stack.length) {
        word += ' ' + stack.pop()
    }
    // 返回拼接的字符串
    return word
}