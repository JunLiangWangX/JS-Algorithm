/*
 * @Description: 给你一个未排序的整数数组 nums ，请你找出其中没有出现的最小的正整数。
                 请你实现时间复杂度为 O(n) 并且只使用常数级别额外空间的解决方案。
 * @Author: JunLiangWang
 * @Date: 2023-04-28 09:27:19
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-04-28 09:45:03
 */


/**
 * @description: hashMap方式   TC:O(n)  SC:O(n)空间复杂度不满足要求
 * @author: JunLiangWang
 * @param {*} nums
 * @return {*}
 */
function hashMap(nums) {
    /**
     *  该方案利用hashMap记录数组中出现过的数字(key为数组中的元素，value为true)
     *  然后从1(最小正整数)开始迭代递增，如果当前数字为key未获取到hashMap中的值
     *  证明该数字并未在数组中出现过，则为数组未出现的最小正整数。
     * 
     *  由于使用了hashMap,因此空间规模不满足题意
     */

    // 利用map记录数组中已经出现过的数字
    let recordNumberInArray = new Map(),
        // 初始化最小正整数为1(此处虽说赋值为0
        // 但后面遍历时是从smallestPositiveInteger+1开始的)
        smallestPositiveInteger = 0;
    // 遍历数组元素，记录出现过的数字
    for (let item of nums) recordNumberInArray.set(item, true);
    // 从1(1为最小正整数)开始迭代递增，当当前数字为key未获取到hashMap中的值则
    // 为数组中未出现过的最小正整数
    while (smallestPositiveInteger++)
        if (!recordNumberInArray.get(smallestPositiveInteger))
            return smallestPositiveInteger;
}


function binarySearch(nums){
    
}