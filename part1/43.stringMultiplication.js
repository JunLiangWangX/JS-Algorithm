/*
 * @Description: 给定两个以字符串形式表示的非负整数 num1 和 num2，返回 num1 和 num2 的乘积，它们的乘积也表示为字符串形式。
 * @Author: JunLiangWang
 * @Date: 2023-05-05 10:11:17
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-05-05 10:41:45
 */



/**
 * @description: 单字符相乘   TC:O(n^2)  SC:O(n)
 * @author: JunLiangWang
 * @param {*} num1  给定数字字符1
 * @param {*} num2  给定数字字符2
 * @return {*}
 */
function singleCharMultiplication(num1,num2){

    /**
     * 该方案使用单个字符相乘然后相加的方式，乘法过程如下：
     *        2   3   4   5
     *     X      1   2   3 
     * ---------------------------------
     *        2   3   4   5
     *            4   6   8   10
     *                6   9   12   15   单个字符依次相乘
     * --------------------------------
     *        2   7   16  22  22   15   对位依次相加
     * --------------------------------
     *        2   8   8   4   3    5    进位获得结果   
     * 
     * 我们可以通过迭代模拟单个字符相乘，定义一个数组其长度
     * 为两乘数长度之和减一(由上例子可以看出)，来存储字符相
     * 乘后对位依次相加的结果，然后从后向前遍历数组元素，将
     * 元素对10取整数获取进位，对10取余数获取当前位置结果。
     */    

    // 如果乘数任一为0，直接返回0即可
    if(num1=="0"||num2=="0")return "0";
    // 定义存储字符相乘后对位依次相加的结果数组
    let store=new Array(num1.length+num2.length-1).fill(0);
    // 遍历乘数1的每个字符
    for(let i=0;i<num1.length;i++){
        // 遍历乘数2的每个字符
        for(let j=0;j<num2.length;j++){
            // 此处可以巧妙的实现两字符依次相乘且对位依次相加
            store[i+j]+=num1[i]*num2[j]
        }
    }
    // 定义存储结果变量
    let result="",
    // 定义存储进位变量
    carryNumber=0,
    // 从后向前遍历数组元素
    k=store.length;
    while(k--){
        // 将上一位的进位加到本位中
        carryNumber+=store[k];
        // 对10取余数获取当前位置结果
        result=carryNumber%10+result;
        // 对10取整数获取进位
        carryNumber=carryNumber/10|0;
    }
    // 返回结果
    return carryNumber>0?carryNumber+result:result;
}