/*
 * @Description: 给你一个无重复元素的整数数组candidates和一个目标整数target，
                  找出candidates中可以使数字和为目标数target的所有不同组合。
 * @Author: JunLiangWang
 * @Date: 2023-04-26 08:51:18
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-04-26 09:30:10
 */


/**
 * @description: 深度遍历+剪枝   TC:O(2^n)  SC:O(n)
 * @author: JunLiangWang
 * @param {*} candidates
 * @param {*} target
 * @return {*}
 */
function dfs(candidates, target){

    /**
     * 此题使用深度优先+剪枝的方案，仔细体会递归过程便可理解该题
     */

    // 定义输出数组
    let outArray=[];
    // 排序
    candidates.sort((a,b)=>a-b);
    /**
     * @description: 递归遍历，表示当前在candidates数组的第
     *               index位，还剩targetValue要组合
     * @author: JunLiangWang
     * @param {*} targetValue  当前目标值
     * @param {*} combined     已组合的值
     * @param {*} index        当前candidates索引
     * @return {*}
     */    
    function recursion(targetValue,combined,index){
        // 如果当前索引超出给定数组范围，直接return
        if(index>=candidates.length)return ;
        // 如果targetValue等于零，证明当前组合的和
        // 为target，将当前组合(combined)加入输出数组
        if(targetValue==0){
            outArray.push(combined);
            return ;
        }
        // 如果当前目标值减去差值小于0，由于candidates为升序
        // 因此后续元素与当前差值依旧会小于0，因此舍去(剪枝)
        let diff=targetValue-candidates[index];
        if(diff>=0)
        {
            // 跳到下一个值
            recursion(targetValue,combined,index+1);
            // 减去当前值，继续递归本次元素
            recursion(diff,[...combined,candidates[index]],index);
        }
    }

    // 执行递归
    recursion(target,[],0)
    // 返回结果
    return outArray;
}