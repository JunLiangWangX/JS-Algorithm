/*
 * @Description: 给你二叉树的根节点 root ，返回其节点值的 层序遍历 。 （即逐层地，从左到右访问所有节点）。
 * @Author: JunLiangWang
 * @Date: 2023-08-09 09:46:38
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-08-09 10:02:33
 */


/**
 * @description: 深度优先  TC:O(n)  SC:O(n)
 * @author: JunLiangWang
 * @param {*} root  给定树的根节点
 * @return {*}
 */
function dfs(root){
    /**
     * 该方案使用深度优先的方式，在递归的参数中加入当前节点的层级
     * 每次递归则将层级+1，后续将当前节点值加入层级即可
     */

    // 定义输出数组
    let outArray=[];

    /**
     * @description: 递归实现深度优先遍历
     * @author: JunLiangWang
     * @param {*} root  当前根节点
     * @param {*} index 当前层数
     * @return {*}
     */    
    function recursion(root,index){
        // 如果根节点为空，直接返回
        if(!root)return 
        // 如果当前层级未定义数组，则定义
        if(!outArray[index])outArray[index]=[]
        // 给当前层级添加根节点的值
        outArray[index].push(root.val)
        // 继续递归左子树
        recursion(root.left,index+1)
        // 继续递归右子树
        recursion(root.right,index+1)
    }
    // 执行递归
    recursion(root,0)
    // 返回结果
    return outArray
}


/**
 * @description: 广度优先  TC:O(n)  SC:O(n)
 * @author: JunLiangWang
 * @param {*} root  给定树的根节点
 * @return {*}
 */
function bfs(root){
    /**
     * 该方案使用广度优先算法，该算法特征与题中描述一致，
     * 从上到下从左到右逐层遍历。
     * 
     * 广度优先算法依靠一个队列，先将根节点入队，然后循环
     * 不断将队列中的节点出队，然后将出队节点不为空的左右
     * 节点再次入队。如此往复直到队列为空
     * 
     */

    // 如何根为空，直接返回
    if (!root) {
        return [];
    }
    // 队列
    const queue=[],
    // 输出数组
    out=[]
    // 将根节点入队
    queue.push(root)
    // 当队列不为空则继续遍历
    while(queue.length > 0){
        // 记录当前队列长度，也是本次层级的
        // 所有节点数量，由于出队会动态影响
        // 到队列的长度，因此此处记录，就可
        // 以知道本次层级的节点是否全部出队
        let size=queue.length;
        // 添加本次层级的数组
        out.push([])
        // 遍历当前层级的所有节点
        while(size-->0)
        {
          // 出队
          const  node=queue.shift();
          // 记录当前节点值
          out[out.length-1].push(node.val)
          // 将出队节点不为空的左右节点再次入队
          if(node.left) queue.push(node.left)
          if(node.right) queue.push(node.right)
        }
    }
    // 返回结果
    return out
}