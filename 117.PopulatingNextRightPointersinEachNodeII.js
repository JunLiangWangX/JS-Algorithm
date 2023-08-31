/*
 * @Description: 给定一个二叉树 ,填充它的每个 next 指针，让这个指针指向其下一个右侧节点。
                 如果找不到下一个右侧节点，则将 next 指针设置为 NULL。
 * @Author: JunLiangWang
 * @Date: 2023-08-30 10:33:29
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-08-31 09:15:13
 */


/**
 * @description: 广度优先   TC:O(n)  SC:O(n)
 * @author: JunLiangWang
 * @param {*} root 给定树的根节点
 * @return {*}
 */                 
function bfs(root){
    /**
     * 本题与上一题一样， 只不过一个是完美二叉树，一个是二叉树
     * 该方案使用广度优先算法， 该题本质上还是树的层级遍历
     * 我们只需要在广度优先算法的基础上，将出队的节点的next
     * 指向当前队列中的首节点(因为出队节点的下一个节点即是它
     * 右边的节点)，如果队列中无节点，则不做任何处理
     * 
     * 广度优先算法依靠一个队列，先将根节点入队，然后循环
     * 不断将队列中的节点出队，然后将出队节点不为空的左右
     * 节点再次入队。如此往复直到队列为空
     */
    
    // 如果根为空，直接返回
    if(!root)return root;
    
    // 定义队列，将根节点入队
    let quene=[root]

    // 当队列不为空则继续遍历
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
            // 如果当前队列不为空证明有右节点
            // 则将其next指向右节点
            if(size>0)node.next=quene[0];
            // 将出队节点不为空的左右节点再次入队
            if(node.left)quene.push(node.left);
            if(node.right)quene.push(node.right);
        }
    }
    // 返回结果
    return root
}