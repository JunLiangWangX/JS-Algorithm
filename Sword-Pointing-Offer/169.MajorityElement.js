/*
 * @Description: 给定一个大小为 n 的数组 nums ，返回其中的多数元素。
                 多数元素是指在数组中出现次数 大于 ⌊ n/2 ⌋ 的元素。
 * @Author: JunLiangWang
 * @Date: 2023-11-07 09:48:34
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-11-07 09:56:27
 */


/**
 * @description: 排序法   TC:O(nlogn)  SC:O(1)
 * @author: JunLiangWang
 * @param {*} nums 给定数组
 * @return {*}
 */
function sort(nums){
    /**
     * 本方案使用排序法，先对数组进行排序，
     * 然后计算每个元素的数量，最终大于2/n
     * 即为最多的元素
     */

    // 数组长度小于等于2，直接返回任一元素
    if(nums.length<=2)return nums[0]
    // 对数组进行排序
    nums.sort()
    // 计数
    let count=1;
    // 从第二个元素开始遍历
    for(let i=1;i<nums.length;i++){
        // 如果与前一个元素相同，证明前面的
        // 都是相同的元素
        if(nums[i]==nums[i-1]){
            // 计数+1
            count++;
            // 如果超过长度的1/2，直接返回该元素
            if(count>=nums.length/2)return nums[i]
        }
        // 如果与前一个元素不同，则是新的元素，重新计数
        else count=1;
    }
    return null
}


/**
 * @description: 摩尔投票法  TC:O(n)  SC:O(1)
 * @author: JunLiangWang
 * @param {*} nums 给定数组
 * @return {*}
 */
function BoyerMoore(nums){
    /**
     * 该方案使用摩尔投票法，本题描述的多数元素
     * 是指在数组中出现次数 大于 ⌊ n/2 ⌋ 的元素。
     * 也就是说，当我删除数组中任意两个不同的元素
     * 这个数组的多数元素还是不会变得，因此利用这
     * 个特性，我们可以很巧妙的写出算法
     */
    
    let candidate=0,count=0;
    for(let num of nums){
        if(count==0)candidate=num
        if(candidate==num)count++
        else count--;
    }
    return candidate
}