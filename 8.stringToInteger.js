/*
 * @Description: 将字符串转换成一个 32 位有符号整数，并满足以下要求：
                 1.读入字符串并丢弃无用的前导空格(' ')
                 2.检查下一个字符（假设还未到字符末尾）为正还是负号，读取该字符（如果有）。 
                   确定最终结果是负数还是正数。 如果两者都不存在，则假定结果为正。
                 3.读入下一个字符，直到到达下一个非数字字符或到达输入的结尾。字符串的其余
                   部分将被忽略。
                 4.将前面步骤读入的这些数字转换为整数（即，"123" -> 123， "0032" -> 32）。
                   如果没有读入数字，则整数为 0 。必要时更改符号（从步骤 2 开始）。
                 5.如果整数数超过 32 位有符号整数范围 [−231,  231 − 1] ，需要截断这个整数，
                   使其保持在这个范围内。具体来说，小于 −231 的整数应该被固定为 −231 ，大于
                   231 − 1 的整数应该被固定为 231 − 1 。
                 6.返回整数作为最终结果。
 * @Author: JunLiangWang
 * @Date: 2023-02-28 10:22:40
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-02-28 10:44:20
 */


/**
 * @description: 一般方法  TC:O(n)  SC:O(1)
 * @author: JunLiangWang
 * @param {*} s  输入字符串
 * @return {*}
 */
function myAtoi(s){
   // 需要匹配的标记
   const mark=['0','1','2','3','4','5','6','7','8','9',' ','-','+']
   // 是否开始匹配，默认为未开始匹配
   let isMatched=false
   // count总数，默认为0;plusOrMinus是否为负数，默认为正
   let count=0,plusOrMinus=1

   for(let i=0;i<s.length;i++)
   {
     // 寻找当前字符是否为需要匹配的标记，不是返回-1，是则返回index，
     const markIndex=mark.indexOf(s[i])
     // 当字符不为需要匹配的标记或(在匹配阶段)为' '、'-'、'+'时直接返回结果
     if(markIndex==-1||isMatched&&markIndex>=10)return count*plusOrMinus
     // 如果不满足上述条件，当匹配到' '字符直接跳过
     if(markIndex==10) continue
     // 如果不满足上述条件，则进入匹配阶段
     isMatched=true
     // 当匹配到正负号时，改变正负号变量
     if(markIndex>=11)plusOrMinus=markIndex==11?-1:1
     else
     {
        // 当匹配到数值
        const currentCount=s[i]*1
        const tempCount=count*plusOrMinus
        // 判断是否超出数值范围
        if(tempCount>214748364||(tempCount==214748364&&currentCount>7))
        return 2147483647
        else if(tempCount<-214748364||(tempCount==-214748364&&currentCount>8))
        return -2147483648
        // 未超出则加入数值
        count=count*10+currentCount
     }
   }
   return count*plusOrMinus
}