/*
 * @Description: 给你一个只包含 '(' 和 ')' 的字符串，找出最长有效（格式正确且连续）括号子串的长度。
 * @Author: JunLiangWang
 * @Date: 2023-04-17 11:23:49
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-04-17 14:19:33
 */


/**
 * @description: 贪心   TC:O(n)   SC:O(1)
 * @author: JunLiangWang
 * @param {*} s 输入字符串
 * @return {*}
 */
function greedy(s){
    /**
     * 该方案利用贪心算法，首先我们从左到右遍历字符串，对于遇到的每个‘(’，我们将记录左括号数量的计数器增加1，
     * 对于遇到的每个‘)’，我们将记录左括号数量的计数器减少1，并且将记录有效括号数量的计算器增加1，每当记录
     * 左括号数量的计数器等于0时，证明左右括号数量相同，并且有效匹配，此时我们记录目前为止找到的最大的有效
     * 括号数量。如果左括号数量计数为-1，证明右括号数量多出了一个，此时无论如何追加括号，后续都已无法再形成
     * 有效括号对，例如：()),()())，因此此处应该将该字符以及前面字符舍去并重置左括号数以及有效括号数。
     * 
     * 这样的做法贪心地考虑了以当前字符下标结尾的有效括号长度，每次当右括号数量多于左括号数量的时候之前的字
     * 符我们都扔掉不再考虑，重新从下一个字符开始计算，但这样会漏掉一种情况，就是遍历的时候左括号的数量始终
     * 大于右括号的数量，即 (() ，这种时候最长有效括号是求不出来的。解决的方法也很简单，我们只需要从右往左
     * 遍历用类似的方法计算即可，只是这个时候判断条件反了过来。
     */
    
        // 从左到右遍历有效括号计数
    let leftToRightCount=0,
        // 左括号计数
        leftParenthesisCount=0,
        // 从右到左遍历有效括号计数
        rightToLeftCount=0,
        // 右括号计数
        rightParenthesisCount=0,
        // 有效括号数
        parenthesisCount=0;

    for(let i=0;i<s.length;i++)
    {
        // 从左到右遍历字符，如果为左括号则计数+1
        if(s[i]=="(") leftParenthesisCount++;
        // 否则，则为右括号
        else {
            // 为右括号则匹配左括号，此时左括号计数-1
            leftParenthesisCount--;
            // 匹配了一个左右括号，此时有效括号对+1
            leftToRightCount++;
            // 如果左括号计数为-1，证明右括号数量多出了一个，
            // 此时无论如何追加括号，后续都已无法再形成有效括号对
            // 例如：()),()())，因此此处应该将该字符以及前面字符舍去
            // 重置左括号数以及有效括号数
            if(leftParenthesisCount==-1)
            {
                leftParenthesisCount=0;
                leftToRightCount=0;
            }
            // 如果左括号计数为0，证明左右括号匹配完成并且有效，
            // 记录目前为止找到的最大的有效括号数
            else if(leftParenthesisCount==0&&parenthesisCount<leftToRightCount)parenthesisCount=leftToRightCount;
        }
        
        // 从右到左遍历字符，如果为右括号则计数+1
        if(s[s.length-1-i]==")") rightParenthesisCount++;
        // 否则，则为左括号
        else {
            // 为左括号则匹配右括号，此时右括号计数-1
            rightParenthesisCount--;
            // 匹配了一个左右括号，此时有效括号对+1
            rightToLeftCount++;
            // 如果右括号计数为-1，证明左括号数量多出了一个，
            // 此时无论如何追加(前面追加)括号，后续都已无法再形成有效括号对
            // 例如：((),(()()，因此此处应该将该字符以及后面字符舍去
            // 重置右括号数以及有效括号数
            if(rightParenthesisCount==-1)
            {
                rightParenthesisCount=0;
                rightToLeftCount=0;
            }
            // 如果右括号计数为0，证明左右括号匹配完成并且有效，
            // 记录目前为止找到的最大的有效括号数
            else if(rightParenthesisCount==0&&parenthesisCount<rightToLeftCount)parenthesisCount=rightToLeftCount;
        }
    }

    // 返回结果
    return parenthesisCount*2;
}