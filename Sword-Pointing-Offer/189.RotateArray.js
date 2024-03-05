/*
 * @Description: 给定一个整数数组 nums，将数组中的元素向右轮转 k 个位置，
                 其中 k 是非负数。
 * @Author: JunLiangWang
 * @Date: 2023-11-08 09:28:48
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-11-08 09:45:19
 */



/**
 * @description: 使用数组   TC:O(n)  SC:O(n)
 * @author: JunLiangWang
 * @param {*} nums  给定数组
 * @param {*} k     轮转的位数
 * @return {*}
 */
function array(nums, k){
    /**
     * 本方案使用额外的数组，首先对使用数组长度对k
     * 进行取余，获得轮转恢复原样N次后，仍需要移动
     * 多少位。然后定义一个新的数组并将原数组赋值给
     * 它。最后遍历改变数组元素即可
     */
    let index=k%nums.length;
    if(index==0)return ;
    let newNums=[...nums]
    for(let i=0;i<newNums.length;i++){
        nums[index]=newNums[i]
        index++;
        if(index>=nums.length)index=0
    }
}


/**
 * @description: 翻转   TC:O(n)  SC:O(1)
 * @author: JunLiangWang
 * @param {*} nums  给定数组
 * @param {*} k     轮转的位数
 * @return {*}
 */
function reverseArray(nums,k){
    /**
     * 本方案使用翻转数组的方案，与上同理首先
     * 对使用数组长度对k进行取余 ，获得轮转恢
     * 复原样N次后，仍需要移动多少位。然后我们
     * 看如下示例：
     *    nums=[1,2,3,4,5,6,7],k=3
     * 
     * 对数组0到n-1进行翻转：
     *    nums=[7,6,5,4,3,2,1]
     * 对数组0到k-1进行翻转：
     *    nums=[5,6,7,4,3,2,1]
     * 对数组k到n-1进行翻转：
     *    nums=[5,6,7,1,2,3,4]
     * 
     * 此时我们就获得了答案，因此仅需对数组进行
     * 如下翻转操作即可得到答案
     *   reverse(0,n-1)
     *   reverse(0,k-1)
     *   reverse(k,n-1)
     */
    let index=k%nums.length;
    if(index==0)return ;
    function reverse(start,end){
        while(start<end){
            let temp=nums[start]
            nums[start]=nums[end]
            nums[end]=temp
            start++;
            end--;
        }
    }
    reverse(0,nums.length-1)
    reverse(0,index-1)
    reverse(index,nums.length-1)
}