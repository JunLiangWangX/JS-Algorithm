/*
 * @Description: 给定一个二叉树的 根节点 root，想象自己站在它的右侧，
                 按照从顶部到底部的顺序，返回从右侧所能看到的节点值。
 * @Author: JunLiangWang
 * @Date: 2023-12-13 09:19:13
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-12-13 09:23:03
 */



/**
 * @description: 广度优先  TC:O(n)  SC:O(n)
 * @author: JunLiangWang
 * @param {*} root
 * @return {*}
 */                 
function bfs(root){
    /**
     * 本方案采用广度优先遍历树的节点，然后记录树的每层
     * 最后一个节点即可
     * 
     * 广度优先算法依靠一个队列，先将根节点入队，然后循环
     * 不断将队列中的节点出队，然后将出队节点不为空的左右
     * 节点再次入队。如此往复直到队列为空
     */
    
    // 如果根为空，直接返回
    if(!root)return [];
    // 队列，将根节点入队
    let queue=[root],
    // 输出数组
    out=[]
    // 当队列不为空则继续遍历
    while(queue.length){
        // 记录当前队列长度，也是本次层级的
        // 所有节点数量，由于出队会动态影响
        // 到队列的长度，因此此处记录，就可
        // 以知道本次层级的节点是否全部出队
        let size=queue.length,
        // 记录最后一个节点
        node=null
        while(size--){
            // 出队
            node=queue.shift()
            // 将出队节点不为空的左右节点再次入队
            if(node.left)queue.push(node.left)
            if(node.right)queue.push(node.right)
        }
        // 记录最后一个节点值
        out.push(node.val)
    }
    // 返回结果
    return out
}