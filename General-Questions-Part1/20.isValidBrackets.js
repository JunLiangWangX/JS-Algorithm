/**
 * @description: 给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串 s ，判断字符串是否有效。
 * @author: JunLiangWang
 * @return {*}
 */


/**
 * @description: 栈    TC:O(n) SC:O(n)
 * @author: JunLiangWang
 * @param {*} s  输入字符串
 * @return {*}
 */
function stack(s)
{
    // 该方案利用栈先进后出特点，遍历字符串，当遇到左括号，则入栈一个对应的右括
    // 号；当遇到右括号，则比对栈顶右括号是否相同，如若不同说明括号对应顺序不同
    // ，则可直接返回false，如果相同则将该右括号出栈。遍历完成如果栈为空则证明
    // 括号一一匹配，返回ture；反之返回false。

    // 判断s长度是否为单数，如果为单数直接返回false
    if(Math.floor(s.length/2)!=s.length/2)return false
    // 构造一个左括号对应的右括号的Map
    let leftCorrespondingRight=new Map();
    leftCorrespondingRight.set('[',']')
    leftCorrespondingRight.set('(',')')
    leftCorrespondingRight.set('{','}')
    // 使用数组模拟栈
    let stackArray=[]
    // 遍历字符串
    for(let i=0;i<s.length;i++)
    {
        // 获取当前字符对应的右括号
        rightBracket=leftCorrespondingRight.get(s[i])
        // 如果当前字符存在对应的右括号，证明当前字符为左括号
        if(rightBracket!=undefined)
        {
            // 将左括号对应的右括号入栈(向数组添加该括号)
            stackArray.push(rightBracket)
        }
        // 如果当前字符不存在对应的右括号，则证明当前字符不为左括号，为右括号
        else
        {
            // 判断栈顶元素(数组最后一个元素)是否等于当前右括号，如果等于则将该右括号出栈(删除数组最后一个元素)
            if(stackArray[stackArray.length-1]==s[i])stackArray.splice(stackArray.length-1,1)
            // 不等于则证明括号不匹配，直接返回false
            else return false
        }
    }
    // 返回结果，当栈为空返回true，反之返回false
    return stackArray.length==0
}