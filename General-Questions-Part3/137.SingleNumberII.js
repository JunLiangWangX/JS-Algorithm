/*
 * @Description: 给你一个 非空 整数数组 nums ，除了某个元素只出现一次以外，
                 其余每个元素均出现三次。找出那个只出现了一次的元素。
 * @Author: JunLiangWang
 * @Date: 2023-10-11 09:05:20
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-10-12 15:17:00
 */


/**
 * @description: 哈希表   TC:O(n)  SC:O(n)
 * @author: JunLiangWang
 * @param {*} nums 给定数组
 * @return {*}
 */
function hashMap(nums) {
    /**
     * 该方案采用hashMap的方式，首先遍历一次数组
     * 并利用hashMap记录数组元素出现的次数(key为
     * 数组元素，value为出现的次数)，然后再遍历一
     * 次数组，找出hashMap中value为1的元素，则为
     * 只出现了一次的元素
     */
    // 记录数组元素出现的次数(key为数组元素，value为出现的次数)
    let hashMap = new Map();
    // 遍历数组元素
    nums.forEach((value) => {
        // 获得该元素已出现的次数
        let count = hashMap.get(value)
        // 更新hashMap中该元素出现的次数为count+1
        hashMap.set(value, count == undefined ? 1 : ++count)
    })
    // 遍历数组元素
    for (let value of nums) {
        // 找出找出hashMap中value为1的元素，则为
        // 只出现了一次的元素
        if (hashMap.get(value) == 1) return value
    }
}


/**
 * @description: 真值表  TC:O(n)  SC:O(1)
 * @author: JunLiangWang
 * @param {*} nums  给定数组
 * @return {*}
 */
function truthTable(nums){
    /**
     * 该方案利用计算真值表的方式实现，
     * 需要一定的电子信息的基础，通过
     * 给定输入/输出设计真值表，从而得
     * 出逻辑表达式，满足该真值表，下述
     * 公式则从真值表得出。
     */
    let a = 0, b = 0;
    for (const num of nums) {
        b = ~a & (b ^ num);
        a = ~b & (a ^ num);
    }
    return b;
}