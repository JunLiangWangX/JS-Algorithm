/*
 * @Description: 给你一个 非空 整数数组 nums ，除了某个元素只出现一次以外，
                 其余每个元素均出现两次。找出那个只出现了一次的元素。
 * @Author: JunLiangWang
 * @Date: 2023-10-11 09:05:20
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-10-11 09:15:23
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
 * @description: 位运算  TC:O(n)  SC:O(1)
 * @author: JunLiangWang
 * @param {*} nums  给定数组
 * @return {*}
 */
function bitOperations(nums){
    /**
     * 本方案使用位运算的方式，异或运算有以下三个性质：
     *    1.任何数和0做异或运算，结果仍然是原来的数，即 a⊕0=a
     *    2.任何数和其自身做异或运算，结果是0，即 a⊕a=0
     *    3.异或运算满足交换律和结合律，即 a⊕b⊕a=b⊕a⊕a=b⊕(a⊕a)=b⊕0=b
     * 
     * 因此该题我们可通过上述异或运算得出：
     *   (a1⊕a1)⊕(a2⊕a2)⊕.....⊕(am⊕am)⊕an=an
     * 
     * 因此我们可通过异或运算解决该题
     */
    let single=0;
    nums.forEach((value)=>{
        single^=value
    })
    return single
}