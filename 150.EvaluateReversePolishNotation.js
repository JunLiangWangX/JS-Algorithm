/*
 * @Description: 给你一个字符串数组 tokens ，表示一个根据 
                 逆波兰表示法 表示的算术表达式。
 * @Author: JunLiangWang
 * @Date: 2023-10-30 09:44:02
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-10-30 09:47:50
 */


/**
 * @description: 栈   TC:O(n)  SC:O(n)
 * @author: JunLiangWang
 * @param {*} tokens
 * @return {*}
 */                 
function stack(tokens){
    /**
     * 本方案采用栈的方式，逆波兰表示法就是专为计算机运算产生的，
     * 因此用栈正好符合该运算的特点，遇到数字入栈，遇到运算符将
     * 栈顶两元素出栈运算，记得注意运算顺序即可。
     */
    let stack=[];
    for(let token of tokens){
        if(token=='+')stack.push(stack.pop()*1+stack.pop()*1)
        else if(token=='-'){
           let num1=stack.pop(),num2=stack.pop();
           stack.push(num2-num1)
        } 
        else if(token=='*') stack.push(stack.pop()*stack.pop())
        else if(token=='/'){
            let num1=stack.pop(),num2=stack.pop();
            stack.push(Math.trunc(num2/num1))
        } 
        else stack.push(token)
    }
    return stack.pop()
}