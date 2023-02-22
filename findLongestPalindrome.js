/*
 * @Description: 输入字符串找出其中最长的回文子串
 * @Author: JunLiangWang
 * @Date: 2023-02-22 11:00:23
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-02-22 11:11:52
 */

/**
 * @description: 暴力破解  TC:O(n^3) SC:O(1)
 * @author: JunLiangWang
 * @param {*} s  输入字符串
 * @return {*}
 */
function bruteForce(s){
   let maxString=''
   for(let i=0;i<s.length;i++)
   {
     let tempString=''
     for(let j=i;j<s.length;j++)
     {
        tempString+=s[j]
        let tempLongest=tempString
        if(tempString.length>1)
        {
            const tempMiddle=tempString.length/2
            const middle=Math.floor(tempMiddle)
            const isEven=tempMiddle==middle
            let left=middle-1
            let right=isEven?middle:middle+1
            while(true)
            {
              if(tempString[left]==tempString[right])
              {
                 
                  right++
                  left--
                  if(left<0)break
              }
              else
              {
                  tempLongest=''
                  break
              }
            }
        }
        if(tempLongest.length>maxString.length)maxString=tempLongest
     }
   }
   return maxString
}
