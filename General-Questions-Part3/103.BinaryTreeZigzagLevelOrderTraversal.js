/*
 * @Description: 给你二叉树的根节点 root ，返回其节点值的 锯齿形层序遍历 。（即先从左往右，再从右往左进行下一层遍历，以此类推，层与层之间交替进行）。
 * @Author: JunLiangWang
 * @Date: 2023-08-10 09:07:12
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-08-10 09:12:59
 */



/**
 * @description: 广度优先  TC:O(n) SC:O(n)
 * @author: JunLiangWang
 * @param {*} root  给定树的头节点
 * @return {*}
 */
function bfs(root){
    
    /**
     * 该方案使用广度优先算法， 该题本质上还是树的层级遍历
     * 只不过需要定义一个变量，判断本层的节点是尾插法(从数组
     * 最后插入)插入数组还是头插法(从数组前面插入)插入数组
     * 
     * 广度优先算法依靠一个队列，先将根节点入队，然后循环
     * 不断将队列中的节点出队，然后将出队节点不为空的左右
     * 节点再次入队。如此往复直到队列为空
     * 
     */

    // 如果根为空，直接返回
    if(!root) return []
    
    // 队列
    const quene=[],
    // 输出数组
    out=[];
    // 方向 true:从左向右，即为尾插  false：从右向左即为头插
    let dir=true;
    // 将根节点入队
    quene.push(root)
    // 当队列不为空则继续遍历
    while(quene.length>0)
    {
        // 记录当前队列长度，也是本次层级的
        // 所有节点数量，由于出队会动态影响
        // 到队列的长度，因此此处记录，就可
        // 以知道本次层级的节点是否全部出队
        let size=quene.length
        // 添加本次层级的数组
        out.push([])
        // 遍历当前层级的所有节点
        while(size-->0){
            // 出队
            let node=quene.shift();

            // 判断方向，true:从左向右，即为尾插  
            //  false：从右向左即为头插
            if(dir)
            out[out.length-1].push(node.val);
            else
            out[out.length-1].unshift(node.val)
            // 将出队节点不为空的左右节点再次入队
            if(node.left)quene.push(node.left)
            if(node.right)quene.push(node.right)
        }
        // 翻转方向
        dir=!dir
    }
    // 返回结果
    return out
}