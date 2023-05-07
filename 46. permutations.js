/*
 * @Description: 给定一个不含重复数字的数组 nums ，返回其 所有可能的全排列 。你可以 按任意顺序 返回答案。
 * @Author: JunLiangWang
 * @Date: 2023-05-07 13:59:46
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-05-07 14:28:39
 */


/**
 * @description: 递归回溯   TC:O(2^n)   SC:O(n)
 * @author: JunLiangWang
 * @param {*} nums  给定数组
 * @return {*}
 */
function recursionBacktracking(nums){
    /**
     * 该方案使用递归回溯的方式，递归参数为：unusedNums以及usedNums，unusedNums
     * 表示当前未被使用到的数(即未加入到排列的数，已加入到排列的数unusedNums[i]
     * 将会赋值为null)，usedNums表示已加入到排列的数。我们在递归函数中遍历unusedNums
     * 当其元素不等于null时，证明该数未加入到排列，此时我们将其加入到排列并标识其为已被
     * 使用(unusedNums[i]=null)，然后将二者作为新的参数继续递归，直到已加入到排列的数的
     * 数量等于给定数组元素的数量则证明所有数排列完成，此时添加结果，停止递归。
     */

    // 定义输出数组
    let outArray=[];
    /**
     * @description: 利用递归遍历未被使用的数，并将当前未被使用的数标识为已使用
     *               并将该数加入当前排列继续递归，直到排列元素数量等于给定数组
     *               元素数量，证明排列完成停止递归
     * @author: JunLiangWang
     * @param {*} unusedNums  未被使用的数
     * @param {*} usedNums    已被使用的数(当前排列)
     * @return {*}
     */    
    function recursion(unusedNums,usedNums){
        // 如已使用的数的数量等于给定数组的元素的数量
        // 证明排列完成
        if(usedNums.length==nums.length)
        {
            // 向输出数组添加该排列
            outArray.push(usedNums);
            // 返回
            return ;
        }
        // 否则，遍历未使用的数
        for(let i=0;i<unusedNums.length;i++)
        {
            // 如果该数不等于null，证明未被使用
            if(unusedNums[i]!=null)
            {
                // 深拷贝，以免更改原数组值
                let temp=[...unusedNums];
                // 将该数标识为已被使用
                temp[i]=null;
                // 继续递归
                recursion(temp,[...usedNums,unusedNums[i]])
            }
        }
    }
    // 递归获取结果
    recursion(nums,[]);
    // 返回结果
    return outArray;
}