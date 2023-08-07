/*
 * @Description: 给定一个字符串，判断字符串是否一个有效的数字
 * @Author: JunLiangWang
 * @Date: 2023-06-10 08:39:50
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-06-10 09:34:39
 */




/**
 * @description: 模拟    TC:O(n)   SC:O(1)
 * @author: JunLiangWang
 * @param {*} s  给定字符串
 * @return {*}
 */
function simulation(s){
    /**
     * 该方案通过模拟的方式解决，通过'e'或者'E'字符截取字符串，
     * 字符串前半部分记作pre，后半部分记作last。如果字符串中
     * 没有'e'或者'E'则pre为整个字符。然后我们判断pre是否一个
     * 小数或整数，如果有last的情况下，我们判断last是否一个整
     * 数，如果两者都为真，则返回true，反之返回false。
     */

    /**
     * @description: 判断字符串是否一个整数
     * @author: JunLiangWang
     * @param {*} str  给定字符串
     * @return {*}
     */    
    function isInteger(str){
        // 如果字符串为空/null/undefined，直接返回false
        if(str==undefined||str==null||str=='')return false;
        if(!(
            // 当字符串的第一个元素为数字，字符串有效
            (str.charCodeAt(0)>=48&&str.charCodeAt(0)<=57)||
            // 或当字符串的第一个元素为+-号且字符串长度大于1，字符串有效
            ((str[0]=='+'||str[0]=='-')&&str.length>1)
        ))
        // 反之，字符串无法构成一个有效整数，直接返回false
        return false;
        // 从1遍历字符串
        for(let i=1;i<str.length;i++){
            // 后续字符中如有不为数字的元素，则证明该字符串不是一个有效整数，返回false
            if(str.charCodeAt(i)<48||str.charCodeAt(i)>57)return false;
        }
        // 字符串构成了一个有效整数，直接返回true
        return true;
    }
    /**
     * @description: 判断字符串是否一个小数
     * @author: JunLiangWang
     * @param {*} str  给定字符串
     * @return {*}
     */    
    function isDecimal(str){
        // 如果字符串为空/null/undefined，直接返回false
        if(str==undefined||str==null||str=='')return false;
        if(!(
            // 当字符串的第一个元素为数字，字符串有效
            (str.charCodeAt(0)>=48&&str.charCodeAt(0)<=57)||
            // 或当字符串的第一个元素为'+'、'-'、'.'号且字符串长度大于1
            // ，字符串有效
            ((str[0]=='+'||str[0]=='-'||str[0]=='.')&&str.length>1)
        ))
        // 反之，字符串无法构成一个有效小数，直接返回false
        return false;
        //当字符串仅有'+'或'-'号与'.'，该字符串无法构成一个有效小数
         if((str[0]=='+'||str[0]=='-')&&str[1]=='.'&&str.length<=2)return false;
        // 是否已经存在小数点
        let isExistPoint=str[0]=='.';
        // 从1开始遍历字符串
        for(let i=1;i<str.length;i++){
            // 当字符不为数字时
            if(str.charCodeAt(i)<48||str.charCodeAt(i)>57)
            {
               // 如果该字符为小数点
               if(str[i]=='.'){
                  // 如果小数点已经存在，证明有两个小数点，
                  // 字符串无法构成一个有效小数返回false
                  if(isExistPoint)return false;
                  // 否则将是否已经存在小数点置为true
                  isExistPoint=true;
               }
               // 不为小数点，则字符串无法构成一个有效小数
               // 直接返回false
               else return false;
            }
        }
        return true;
    }
    // 从0遍历给定字符串，寻找是否存在'e'或'E'字符
    for(let i=0;i<s.length;i++){
        // 如果存在
        if(s[i]=='e'||s[i]=='E'){
            // 该字符前半部分记作pre
            let pre=s.substr(0,i);
            // 该字符后半部分记作last
            let last=s.substr(i+1,s.length-1-i);
            // 如果pre是一个小数或整数，last是一个整数，
            // 则构成了一个有效数字，返回true，反之false
            return (isInteger(pre)||isDecimal(pre))&&isInteger(last)
        }
    }
    // 如果不存在'e'或'E'字符，则判断给定字符串是否一个整数或小数
    return  isInteger(s)||isDecimal(s)
}