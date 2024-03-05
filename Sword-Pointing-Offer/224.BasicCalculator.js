/*
 * @Description: 给你一个字符串表达式 s ，请你实现一个基本计算器来计算并返回它的值。
 * @Author: JunLiangWang
 * @Date: 2023-12-07 11:06:20
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-12-07 11:10:07
 */



/**
 * @description: 栈+递归  TC:O(n)  SC:O(n)
 * @author: JunLiangWang
 * @param {*} s 给定字符串
 * @return {*}
 */
function stackAndRecursion(s) {
    /**
     * 本方案使用栈+递归的方式
     */

    /**
     * @description: 遇到(递归计算括号内结果
     * @author: JunLiangWang
     * @param {*} index 字符串位置
     * @return {*}
     */    
    function recusion(index) {
        // 栈
        let stack = [], 
        // 前面的符号
        sign = '+', 
        // 数值 
        number = 0, 
        // 遍历到字符串的位置
        i = index;
        while (i < s.length) {
            let char = s[i];
            // 当前字符如果是数字，那么使用number记录
            if (!isNaN(char) && char != ' ') number = number * 10 + char * 1
            // 当前字符如果不是数字，但是左括号，此时递归获取括号的数字
            else if (char == '(') {
                let temp = recusion(i + 1)
                number = temp[0]
                i = temp[1]
            }
            // 当前字符如果不是数字且不为空格，或者当前字符为最后一个字符
            // 此时需要将数字push到栈中，并重置number与sign
            if ((isNaN(char) && char != ' ') || s.length - 1 <= i) {
                switch (sign) {
                    case '+':
                        stack.push(number)
                        break;
                    case '-':
                        stack.push(-number)
                        break;
                    case '*':
                        stack.push(stack.pop() * number)
                        break;
                    case '/':
                        stack.push(stack.pop() / number)
                        break;
                }
                number = 0
                sign = char
            }
            // 如果当前字符为右括号，那么需要结束递归
            if (char == ')') break;
            i++
        }
        number = 0
        // 将栈中元素求和
        stack.forEach((val) => number += val)
        return [number, i];
    }

    // 执行递归，返回结果
    return recusion(0)[0]
}