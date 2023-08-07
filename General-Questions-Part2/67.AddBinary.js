/*
 * @Description: 给你两个二进制字符串 a 和 b ，以二进制字符串的形式返回它们的和。
 * @Author: JunLiangWang
 * @Date: 2023-06-13 08:59:17
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-06-13 09:19:44
 */



/**
 * @description: 双指针   TC:O(n)  SC:O(1)
 * @author: JunLiangWang
 * @param {*} a 给二进制字符串1
 * @param {*} b 给二进制字符串2
 * @return {*}
 */
function doublePoints(a,b){
    /**
     * 该方案利用双指针的方式，定义两个指针分别指向a,b两数组最后一个
     * 元素，定义一个变量记录其是否有进位情况，然后从后向前遍历两数组
     * 元素，将两元素值(如果存在)与进位变量相加，当前位置的结果则等于
     * 相加后的和对2取余，是否存在进位则等于相加后的和除以2然后向下取
     * 整。当两指针都超出了数组索引范围此时结束循环。最后再判断是否存
     * 在进位，有则在结果前加一个'1'。
     */

    // 定义两指针
    let point1=a.length-1,
    point2=b.length-1,
    // 是否存在进位
    carry=0,
    // 结果
    out='';
    // 从后到前遍历两数组元素，当两指针都超出了数组索引结束循环
    while(a[point1]||b[point2]){
        // 将两元素值(如果存在)与进位变量相加
        if(a[point1])carry+=a[point1]*1;
        if(b[point2])carry+=b[point2]*1;
        // 当前位置的结果则等于相加后的和对2取余
        out=carry%2+out;
        // 否存在进位则等于相加后的和除以2然后向下取整
        carry=Math.floor(carry/2);
        point1--;
        point2--;
    }
    // 最后如果还存在进位，则需要在结果前加一个'1'。
    if(carry!=0)out='1'+out;
    // 返回结果
    return out;
}