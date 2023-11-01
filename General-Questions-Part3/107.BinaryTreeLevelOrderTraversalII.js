/*
 * @Description: 给你二叉树的根节点 root ，返回其节点值 自底向上的层序遍历 。 
                 即按从叶子节点所在层到根节点所在的层，逐层从左向右遍历。
 * @Author: JunLiangWang
 * @Date: 2023-08-17 08:59:45
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-08-17 09:06:23
 */


/**
 * @description: 深度优先   TC:O(n)  SC:O(n)
 * @author: JunLiangWang
 * @param {*} root 给定树的根节点
 * @return {*}
 */
function dfs(root) {

    /**
     * 本题与102.二叉树的层级遍历一样，只不过102题是从上往下层级
     * 遍历，该题是从下往上，因此我们使用102题同样的方式，然后把
     * 输出数组翻转即可
     * 
     * 该方案使用深度优先的方式，在递归的参数中加入当前节点的层级
     * 每次递归则将层级+1，后续将当前节点值加入层级即可，最后把输
     * 出数组翻转即可获得答案
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
    // 返回翻转后的结果
    return outArray.reverse()
}



/**
 * @description: 广度优先  TC:O(n)  SC:O(n)
 * @author: JunLiangWang
 * @param {*} root  给定树的根节点
 * @return {*}
 */
function bfs(root){
    /**
     * 本题与102.二叉树的层级遍历一样，只不过102题是从上往下层级
     * 遍历，该题是从下往上，因此我们使用102题同样的方式，然后把
     * 输出数组翻转即可
     * 
     * 该方案使用广度优先算法，该算法特征与题中描述一致，
     * 从上到下从左到右逐层遍历。
     * 
     * 广度优先算法依靠一个队列，先将根节点入队，然后循环
     * 不断将队列中的节点出队，然后将出队节点不为空的左右
     * 节点再次入队。如此往复直到队列为空
     * 
     */

    // 如果根为空，直接返回
    if (!root) {
        return [];
    }
    // 队列，并将根节点入队
    const queue=[root],
    // 输出数组
    out=[]
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
    // 返回翻转后的结果
    return out.reverse()
}