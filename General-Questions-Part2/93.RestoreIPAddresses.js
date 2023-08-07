/*
 * @Description: 给定一个只包含数字的字符串 s ，用以表示一个 IP 地址，返回所有可能的有效 IP 地址，
                 这些地址可以通过在 s 中插入 '.' 来形成。
 * @Author: JunLiangWang
 * @Date: 2023-07-27 09:15:56
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-07-27 09:32:53
 */

/**
 * @description: 递归回溯   TC:O(2^n)  SC:O(n)
 * @author: JunLiangWang
 * @param {*} s 给定字符串S
 * @return {*}
 */
function recursionBackTracking(s)
{
    /**
     * 该方案使用递归回溯，对字符串进行1到3个字符分隔，并进行搜索，
     * 最后筛选出满足要求的作为答案。
     */

    // 输出数组
    let outArray=[]
    /**
     * @description: 递归
     * @author: JunLiangWang
     * @param {*} index     当前字符串位置
     * @param {*} selectStr 已经选择的子串数组
     * @return {*}
     */    
    function recursion(index,selectStr){
        // 如果已经选择了4个子串
        if(selectStr.length==4){
            // 如果刚好将字符串分割为4个子串，证明能复原IP地址，添加结果
            if(index==s.length)outArray.push(selectStr.join('.'));
            // 如果分割后还存在字符，证明无法复原，舍去
            else return;
        }
        // 如果当前索引已经超出数组范围，则直接return
        if(index>=s.length)return 

        // 三种切割长度截取字符串
        for(let i=1;i<=3;i++){
          // 获得三种切割长度的字符串
          let preString=s.slice(index,index+i)
          // 判断是否满足IP单个片段的要求
          if((i>1&&preString[0]!='0'&&preString*1<256)||i==1){
              // 满足则继续递归
              recursion(index+i,[...selectStr,preString])
          }
        }
    }
    // 执行递归
    recursion(0,[],0)
    // 返回结果
    return outArray
}