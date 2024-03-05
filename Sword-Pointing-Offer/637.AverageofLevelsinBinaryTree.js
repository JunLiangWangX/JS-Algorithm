/*
 * @Description: 给定一个非空二叉树的根节点 root , 以数组的形式返
                 回每一层节点的平均值。与实际答案相差 10-5 以内的
                 答案可以被接受。
 * @Author: JunLiangWang
 * @Date: 2023-12-14 09:03:36
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-12-14 09:05:01
 */


/**
 * @description: 广度优先  TC:O(n)  SC:O(n)
 * @author: JunLiangWang
 * @param {*} root 给定树的根节点
 * @return {*}
 */
function bfs(root){
    /**
     * 该方案使用广度优先遍历数组节点，然后计算每层节点
     * 的平均值，并记录
     * 
     * 广度优先算法依靠一个队列，先将根节点入队，然后循环
     * 不断将队列中的节点出队，然后将出队节点不为空的左右
     * 节点再次入队。如此往复直到队列为空
     * 
     */

    // 如果根为空，直接返回
    if(!root)return []
    // 队列，将根节点入队
    let quene=[root],
    // 输出数组
    out=[]
    // 当队列不为空则继续遍历
    while(quene.length){
        // 记录当前队列长度，也是本次层级的
        // 所有节点数量，由于出队会动态影响
        // 到队列的长度，因此此处记录，就可
        // 以知道本次层级的节点是否全部出队
        let divisor=count=quene.length,
        // 记录本层节点值总和
        sum=0
        // 遍历当前层级的所有节点
        while(count--){
            // 出队
            let node=quene.shift()
            // 加上当前节点值
            sum+=node.val
            // 将出队节点不为空的左右节点再次入队
            if(node.left)quene.push(node.left)
            if(node.right)quene.push(node.right)
        }
        out.push(sum/divisor)
    }
    // 返回结果
    return out
}