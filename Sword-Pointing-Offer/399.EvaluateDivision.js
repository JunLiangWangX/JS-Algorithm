/*
 * @Description: 如题，遍历图
 * @Author: JunLiangWang
 * @Date: 2023-12-26 08:48:43
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-12-26 08:55:17
 */


/**
 * @description: 广度优先   TC:O(n^2)  SC:O(n^2)
 * @author: JunLiangWang
 * @param {*} equations  给定被除数/除数数组
 * @param {*} values     给定结果数组
 * @param {*} queries    给定问题数组
 * @return {*}
 */
function bfs(equations, values, queries) {
    /**
     * 本方案采用广度优先搜索遍历图，首先根据equations与values
     * 构造出路径图，后续queries找到图中以被除数为起点，除数为
     * 终点的所有节点的乘积，即为答案
     */

    // 记录路径的图
    let pathMap = new Map(),
    // 记录结果的数组
        resultArray = new Array(queries.length).fill(-1);
    /// 构造出路径图，key为被除数，value为除数以及结果
    for (let i = 0; i < equations.length; i++) {
        let pathList1 = pathMap.get(equations[i][0]) || [],
            pathList2 = pathMap.get(equations[i][1]) || [];
        pathList1.push({
            to: equations[i][1],
            result: values[i]
        })
        pathList2.push({
            to: equations[i][0],
            result: 1 / values[i]
        })
        pathMap.set(equations[i][0], pathList1)
        pathMap.set(equations[i][1], pathList2)
    }
    // 遍历问题
    for (let i = 0; i < queries.length; i++) {
        // 获取以除数为起点的所有路径
        let queue = pathMap.get(queries[i][0])
        // 如果没有，则直接continue
        if (!queue) continue;
        // 结构，防止修改原数组
        queue = [...queue]
        // 记录已经走过的节点，防止回环
        let passedPathMap = new Map()
        // 当前起点已是走过的节点，记录
        passedPathMap.set(queries[i][0], true)
        while (queue.length) {
            let path = queue.shift()
            // 如果已找到除数为终点，则记录
            // 结果，然后跳出循环
            if (path.to == queries[i][1]) {
                resultArray[i] = path.result
                break;
            }
            // 如果当前节点的to是已走过的节点，直接跳过
            // 本次循环
            if (passedPathMap.get(path.to)) continue;
            // 拿到中间节点的路径
            let toPathList = pathMap.get(path.to)
            // 给队列添加路径
            for (let toPath of toPathList) {
                queue.push({
                    to: toPath.to,
                    result: toPath.result * path.result
                })
            }
            // 记录已走过的节点，防止回环
            passedPathMap.set(path.to, true)
        }
    }
    // 返回结果
    return resultArray
}