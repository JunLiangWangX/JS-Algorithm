/*
 * @Description: 给定一个整数数组 nums，将数组中的元素向右轮转 k 个位置，
                 其中 k 是非负数。
 * @Author: JunLiangWang
 * @Date: 2023-11-08 09:28:48
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-11-08 09:36:08
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