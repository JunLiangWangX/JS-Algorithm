/*
 * @Description: 电话号码的字母组合，给定一个仅包含数字 2-9 的字符串，返回所有它能表示的字母组合。
 * @Author: JunLiangWang
 * @Date: 2023-03-14 10:38:32
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-03-14 11:04:42
 */


/*
 * @Description: 递归回溯    TC:O(n^3)  SC:(n)
 * @Author: JunLiangWang
 * @Date: 2023-03-14 10:38:32
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-03-14 11:00:14
 */
function recursion(digits) {
    // 如果没有数字直接返回
    if(digits.length==0)return []
    // 电话号码对应的字母表示(mark[number-1]，例子：电话号码2，对应mark[2-1]=['a', 'b', 'c'])
    const mark = [
        [''],
        ['a', 'b', 'c'],
        ['d', 'e', 'f'],
        ['g', 'h', 'i'],
        ['j', 'k', 'l'],
        ['m', 'n', 'o'],
        ['p', 'q', 'r', 's'],
        ['t', 'u', 'v'],
        ['w', 'x', 'y', 'z']
    ]
    // 记录电话号码字母组合数组
    var recordArray=[]
    /**
     * @description: 回溯函数
     * @author: JunLiangWang
     * @param {*} cuString  当前字母组合字符串
     * @param {*} index     当前遍历到的digits索引
     * @return {*}
     */    
    var backtrack=function(cuString,index){
        // 如果遍历完成digits所有字符，则向记录数组添加字母组合的字符串
        if(index==digits.length)recordArray.push(cuString)
        // 如果没有，则找出当前电话号码对应的字母进行遍历(mark[number-1]，
        // 例子：电话号码2，对应mark[2-1]=['a', 'b', 'c'])，并继续调用
        // 回溯函数(参数1：上次已组合的字母+这次对应的字母，参数2：索引+1)
        // 直到遍历完成digits为止
        else mark[digits[index]-1].map((word)=>backtrack(cuString+word,index+1))
    }
    // 调用回溯数组
    backtrack('',0)
    // 返回结果
    return recordArray
}