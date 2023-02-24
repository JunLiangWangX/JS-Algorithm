/*
 * @Description: 输入字符串找出其中最长的回文子串
 * @Author: JunLiangWang
 * @Date: 2023-02-22 11:00:23
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-02-24 11:16:01
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


/**
 * @description: 动态规划  TC:O(n^2) SC:O(n^2)
 * @author: JunLiangWang
 * @param {*} s  输入字符串
 * @return {*}
 */
function dp(s){
   //回文子串的特点即为反转然后仍一样(bab,翻转：bab)，因此该问题可转换为s与翻转后的s寻找
   //最长子串问题，但需要排除一个特例(abc435cba,翻转：abc534cba)，虽说abc，cba满足了翻转
   //后一致，但并不是回文子串。

   //DP数组，加一为了处理i-1,j-1的情况
   let DPArray=new Array(s.length+1).fill(0).map(()=>new Array(s.length+1).fill(0))
   let start=0,end=0
   //由于DP数组长与宽都加了1，因此此处i,j都从1开始遍历
   for(let i=1;i<=s.length;i++)
   {
     for(let j=1;j<=s.length;j++)
     {
       //比较s与翻转后的s的字符是否一致，一致则满足了回文串的特点
       if(s[i-1]===s[s.length-j])
       {
          //当前子串长度=上一个子串长度+1
          DPArray[i][j]=DPArray[i-1][j-1]+1
          // 此处需要排除特列，即翻转后相同，但不是回文子串的情况。
          // s.length-j即为未翻转时的起始位置，DPArray[i][j]为当前
          // 子串长度，i为结束位置，当为回文子串时应满足(s.length-j)+DPArray[i][j]==i
          if((s.length-j)+DPArray[i][j]==i&&DPArray[i][j]>end-start)
          {
             start=i-DPArray[i][j]
             end=i
          }
       }
     }
   }
   return s.substring(start,end)
}