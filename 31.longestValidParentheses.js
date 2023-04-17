/*
 * @Description: 给你一个只包含 '(' 和 ')' 的字符串，找出最长有效（格式正确且连续）括号子串的长度。
 * @Author: JunLiangWang
 * @Date: 2023-04-17 11:23:49
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-04-17 17:29:24
 */


/**
 * @description: 动态规划   TC:O(n)  SC:O(1)
 * @author: JunLiangWang
 * @param {*} s 输入字符串
 * @return {*}
 */
function dp(s){
    /**
     * 该方案使用动态规划，有效括号总是以')'结尾的，以'('结尾的有效括号数量必定为0，
     * 因此我们初始化dp数组元素全为0，只处理为')'的字符即可。考虑')'前一个字符为'('
     * 则此时表明括号配对成功，此处有效括号数量则为本次的两个括号+两个括号前一个括号
     * 的有效括号数量则为：2+dpArray[i-2]；考虑')'前一个字符为')'，此时我们则需要
     * 比对前一个字符')'所组成的有效括号对的前一个字符，前一个字符')'所构成的有效括
     * 号对则为：dpArray[i-1]，构成的有效括号对的前一个字符：s[i-dpArray[i-1]-1]
     * 如果该字符仍为')'则配对失败，反之，则配对成功。此处的有效括号数量则为：前一个
     * 括号构成的有效括号数量+前一个括号所构成的有效括号的前两个括号（前一个括号已与
     * 当前括号配对所以 此处为前两个括号）所构成的有效括号数量+本次的两个括号，则为：
     * dpArray[i-1]+dpArray[i-dpArray[i-1]-2]+2
     */

    // 如果字符长度为0，则直接返回0
    if(s.length===0)return 0;
    // 定义dp数组，并将其所有元素初始化为0
    let dpArray=new Array(s.length).fill(0)
    // 从位置1开始变量字符串
    for(let i=1;i<s.length;i++)
    {
        // 有效括号对始终时已右括号结尾的，因此我们判断右括号即可
        if(s[i]===')')
        {
            // 如果右括号前一个为左括号，则括号配对成功，此时有效括号对数量
            // 则等于该括号对的前一个括号所得出的有效括号对+2
            if(s[i-1]==='(')dpArray[i]=(i>=2?dpArray[i-2]:0)+2
            // 如果右括号前一个仍为右括号，则我们需要比对前一个括号所构成的
            // 有效括号(前一个括号的有效括号数量为dpArray[i-1])的前一个括号
            // (有效括号的前一个括号为：当前索引-前一个括号构成的有效括号数量-1
            //  则为s[i-dpArray[i-1]-1])，如果该括号仍为右括号，则配对失败
            // 否则，则配对成功，此处的有效括号数量则为：前一个括号构成的有效括号数量+
            // 前一个括号所构成的有效括号的前两个括号（前一个括号已与当前括号配对所以
            // 此处为前两个括号）所构成的有效括号数量+2
            else if(s[i-dpArray[i-1]-1]==='(')dpArray[i]=dpArray[i-1]+(i-dpArray[i-1]>=2?dpArray[i-dpArray[i-1]-2]:0)+2
        }
    }

    // 返回数组最大值即为答案
    return Math.max(...dpArray);
}

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