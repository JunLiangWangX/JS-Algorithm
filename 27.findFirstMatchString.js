/*
 * @Description: 找出原字符串中第一个与匹配字符串相同的子串的下标
 * @Author: JunLiangWang
 * @Date: 2023-04-05 22:14:32
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-04-05 22:50:35
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
    if(haystack.length==0||needle.length==0)return -1
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