/*
 * @Description: 给你一个字符串s和一个字符串p，请你来实现一个支持'.'和'*'的正则表达式匹配。
                    1.'.' 匹配任意单个字符
                    2.'*' 匹配零个或多个前面的那一个元素
                 所谓匹配，是要涵盖 整个 字符串 s的，而不是部分字符串。
 * @Author: JunLiangWang
 * @Date: 2023-03-06 22:04:28
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-03-18 13:48:17
 */

/**
 * @description: 动态规划   TC:O(n^2)  SC:O(n^2)
 * @author: JunLiangWang
 * @param {*} s  需要匹配的字符串
 * @param {*} p  字符串规则
 * @return {*}
 */
function dp(s,p){
    let DPArray=new Array(s.length+1).fill(0).map(()=>new Array(p.length+1).fill(false))
    // 由于当两字符为空时(长度为0)，因也判断为匹配，所以重置[0][0]位置为true，其余为false
    DPArray[0][0]=true
    /**
     * @description: 判断是否匹配，当i2等于0时，证明还未匹配字符串S，此时无论匹配P字符串中的任何字符
     *               应当全为false；当i2大于0时p[j2-1](j2从1开始，因此匹配字符串需要-1)等于'.'或
     *               S[i2-1](同理)时判断两字符为匹配
     **/
    let isMatch=function(i2,j2){
        return i2!=0&&(p[j2-1]=='.'||p[j2-1]==s[i2-1])
    }
    // 遍历字符串S，由于P字符串中'*'号的存在，因此当字符串为空时仍存在匹配成功的例子，
    // 因此需要从0开始匹配（即从空字符串开始匹配）
    for(let i=0;i<=s.length;i++)
    {
        // 遍历字符串P
        for(let j=1;j<=p.length;j++)
        {
            // 当p[j-1]处为*时
            if(p[j-1]=='*')
            {
                // 赋值为*号匹配0个的情况，如(ca*)a*匹配零个的情况，则此处值应为c处的值
                DPArray[i][j]=DPArray[i][j-2]
                // 当*号字符前一个字符能够匹配当前S中的字符，则取（*号匹配0个的情况）||（前一个字符的匹配情况）
                if(isMatch(i,j-1))DPArray[i][j]=DPArray[i][j]||DPArray[i-1][j]
            }
            // 当p[j-1]处不为*时
            else
            {
                // 此时判断两字符是否匹配，如果匹配则赋值为上一字符是否匹配
                if(isMatch(i,j))DPArray[i][j]=DPArray[i-1][j-1]
            }
        }
    }
    return DPArray[s.length][p.length]
}