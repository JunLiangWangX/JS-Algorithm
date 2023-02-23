/*
 * @Description: 输入字符串找出其中最长的回文子串
 * @Author: JunLiangWang
 * @Date: 2023-02-22 11:00:23
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-02-23 15:04:03
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


/**
 * @description: 中心扩散   TC:O(n^2) SC:O(1)
 * @author: JunLiangWang
 * @param {*} s  输入字符串
 * @return {*}
 */
function centralDiffusion(s){
  let start=0,end=0  //记录最长回文开始/结束位置
  if(s.length==0)return s  //如果s为空字符串，直接返回

  /**
   * @description: 中心扩散函数
   * @author: JunLiangWang
   * @param {*} s  输入字符串
   * @param {*} l  左边扩散起始位置
   * @param {*} r  右边扩散起始位置
   * @return {*}
   */  
  var expandAroundCenter=function(s,l,r){
    let left=l,right=r
    while(left>=0&&right<s.length&&s[left]===s[right])
    {
      left--
      right++
    }
    // 这里返回的是回文数长度，如果初值l==r，则肯定满足s[l]==s[r]
    // 意味着left与right的差值始终为2n(n为循环执行次数)，但由于
    // 其起始位置字符串数为1，因此真实长度应当为2n-1,因此返回
    // right-left-1。如果初值l+1==right,其起始位置字符串数为0
    // 因此真实长度应当为2n-2,由于初值补足1，因此返回right-left-1即可
    return right-left-1
  }

  for(let i=0;i<s.length;i++)
  {
    // 第一个expandAroundCenter为奇数扩散，第二个为偶数扩散，取出最大值即可
    let maxLength=Math.max(expandAroundCenter(s,i,i),expandAroundCenter(s,i,i+1))
    // 如果长度超过了已记录的长度，则记录新的长度位置
    if(maxLength>end-start)
    {
      // 此处减一由于中心偶数时向右偏移了0.5
      start=i-Math.floor((maxLength-1)/2)
      end=i+Math.floor(maxLength/2)
    }
  }
  return s.slice(start,end+1)
}