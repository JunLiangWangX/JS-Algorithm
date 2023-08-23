/*
 * @Description: 给定一个二叉树，找出其最小深度。最小深度是从根节点到最近叶子节点的最短路径上的节点数量。
 * @Author: JunLiangWang
 * @Date: 2023-08-23 09:06:16
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-08-23 09:12:46
 */



/**
 * @description: 广度优先   TC:O(n)  SC:O(n)
 * @author: JunLiangWang
 * @param {*} root 给定根节点
 * @return {*}
 */
function bfs(root){
    /**
     * 叶子节点是指没有子节点的节点。因此我们仅需要使用广度优先遍历
     * 树，并记录层级，找到第一个无子节点的节点，然后返回层级即可。
     */

    // 如果根节点为空，直接返回0
    if(!root)return 0;

    // 定义广度优先需要的队列
    let quene=[root],
    // 记录层级
    level=1;
    // 如果队列为空，证明已遍历完成树中所有节点
    while(quene.length>0){
        // 记录当前队列长度，也是本次层级的
        // 所有节点数量，由于出队会动态影响
        // 到队列的长度，因此此处记录，就可
        // 以知道本次层级的节点是否全部出队
        let size=quene.length;
        // 遍历当前层级的所有节点
        while(size-->0){
            // 出队
            let node=quene.shift();
            // 如果遇到叶子节点则直接返回记录的层级
            if(!node.left&&!node.right)return level;
            // 否则将出队节点不为空的左右节点再次入队
            if(node.left) quene.push(node.left);
            if(node.right)quene.push(node.right);
        }
        // 更新层级
        level++;
    }
    // 返回层级
    return level;
}