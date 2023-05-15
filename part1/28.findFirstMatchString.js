/*
 * @Description: 找出原字符串中第一个与匹配字符串相同的子串的下标
 * @Author: JunLiangWang
 * @Date: 2023-04-05 22:14:32
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-04-11 09:11:18
 */



/**
 * @description: 暴力破解    TC:O(MN)  SC:O(1)
 * @author: JunLiangWang
 * @param {*} haystack  原串
 * @param {*} needle    匹配字符串
 * @return {*}
 */
function bruteForce(haystack, needle) {
    /**
     * 该方案使用暴力破解的方法，逐个遍历原串字符，当原串字符与匹配字符串首个字符
     * 相等时，则比较匹配字符串后续字符与原串后续字符是否一一相等。如果相等，证明
     * 已匹配原串，则返回原串字符位置；反之，则未匹配原串，继续遍历后续原串字符。
     */

    // 如果原串或待匹配字符串长度为0，则无法匹配，直接返回-1
    if(haystack.length==0||needle.length==0)return -1;
    // 逐个字符遍历原串，当原串剩余字符数量小于匹配字符串长度时，
    // 证明匹配字符串已无法匹配原串，直接跳出循环
    for (let sourcePoint = 0; sourcePoint <= haystack.length-needle.length; sourcePoint++) {
        // 原串每遍历一个字符，匹配字符串则需从首个字符重新遍历
        let matchPoint = 0;
        // 当原串字符与匹配字符串字符相同时，则继续比较后续字符，
        // 若匹配字符串最后一个字符仍相同，则证明匹配达成，返回
        // 原串当前位置即可；
        while (haystack[sourcePoint + matchPoint] == needle[matchPoint])
        {
            matchPoint++;
            if(matchPoint==needle.length)return sourcePoint;
        }
    }
    return -1
}

/**
 * @description: KMP    TC:O(M+N)  SC:O(n)
 * @author: JunLiangWang
 * @param {*} haystack  原串
 * @param {*} needle    匹配字符串
 * @return {*}
 */
function KMP(haystack,needle)
{
    /**
     * 该方案利用KMP算法，该算法构造了一个与匹配字符串同等长度的数组， 然后遍历
     * 匹配字符串找到字符串中相同的部分，然后在数组中记录相同部分的索引，在遍历匹
     * 配时，如果遇到不匹配的情况，则从数组中取出该位置后一位元素的值作为字符串的
     * 起始位置，这样避免了匹配字符串相同部分(例：abcabca)重复匹配的情况
     * 
     */

    // 如果原串或待匹配字符串长度为0，则无法匹配，直接返回-1
    if(haystack.length==0||needle.length==0)return -1;

    // 定义位置数组，该数组记录了匹配字符串每个字符与原串字符不同时，匹配字符串的起始点
    let nextArray=new Array(needle.length);
    // 初始化0处字符不同时，起始位置为0
    nextArray[0]=0;

    // 遍历匹配字符串，构造起始位置记录数组
    for(let i=0,j=1;j<needle.length;j++)
    {
        // 找到相同字符，若无相同字符，则i=0跳出循环
        while(i>0&&needle[i]!=needle[j])i=nextArray[i-1];
        // 如找到相同字符，i+1
        if(needle[i]==needle[j])i++;
        // 将记录该位置字符相同字符位置，若没用则为0
        nextArray[j]=i;
    }
    // 遍历原串，匹配字符
    for(let i=0,j=0;i<haystack.length;i++)
    {
        // 如原串字符与匹配字符串字符一样，则根据跳转数组决定起始位置，
        // 直到0位置仍未找到相同字符，则跳出循环
        while(j>0&&haystack[i]!=needle[j])j=nextArray[j-1];
        // 若有相同字符，则比较下一个字符
        if(haystack[i]==needle[j])j++
        // 若j等于匹配字符串长度，证明比较完成，返回起始位置即可
        if(j==needle.length)return i+1-j;
    }
    return -1;
}