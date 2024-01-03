/*
 * @Description: 现在你总共有 numCourses 门课需要选，记为 0 到 numCourses - 1。
                 给你一个数组 prerequisites ，其中 prerequisites[i] = [ai, bi]，
                 表示在选修课程 ai 前 必须 先选修 bi 。
                 例如，想要学习课程 0 ，你需要先完成课程 1 ，我们用一个匹配来表示：[0,1] 。
                 返回你为了学完所有课程所安排的学习顺序。可能会有多个正确的顺序，你只要返回
                 任意一种 就可以了。如果不可能完成所有课程，返回 一个空数组 。
 * @Author: JunLiangWang
 * @Date: 2024-01-03 09:20:08
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2024-01-03 09:26:30
 */


/**
 * @description: 广度优先   TC:O(n+m)  SC:O(n+m)
 * @author: JunLiangWang
 * @param {*} numCourses    给定课程数量
 * @param {*} prerequisites 给定课程关系数组 
 * @return {*}
 */
function bfs(numCourses, prerequisites){
    /**
     * 本题与207课程表一致，其解决方案也是一致的，不过就是加入了
     * 一个记录其顺序的数组而已
     *  
     * 本题其实就是判断该有向图是否为有向无环图，也就是使用 
     * 拓扑排序将有向无环图转成线性的排序
     * 
     */

     // 邻接表，记录各课程关系
    let coursesRelationMap=new Map(),
     // 定义入度数组
    inDegree=new Array(numCourses).fill(0);           
    // 遍历课程关系数组       
    prerequisites.forEach((el)=>{
        // 求课程的入度值
        inDegree[el[0]]++;
        // 记录两课程关系，当item[1]出度时，所影响的课程
        let courses=coursesRelationMap.get(el[1])||[];
        courses.push(el[0]);
        coursesRelationMap.set(el[1],courses);
    })
    // 定义队列
    let quene=[],
    // 记录学习课程顺序的数组
    result=[],
    // 记录已学课程
    count=0;
     // 将入度为0的课程放入队列中
    for(let i=0;i<numCourses;i++)if(inDegree[i]==0)quene.push(i)

    while(quene.length){
         // 把入度为0的课程出队
        let course=quene.shift();
        // 记录学习课程顺序
        result.push(course);
        // 已学课程+1
        count++;
        // 获取这门课对应的后续课
        let courseList=coursesRelationMap.get(course);
        //如果为空或为0直接跳过
        if(!courseList||courseList.length==0)continue;
        courseList.forEach((el)=>{
            // 依赖它的后续课的入度-1
            inDegree[el]--;
            // 如果因此减为0，入列
            if(inDegree[el]==0)quene.push(el)
        })
    }
    // 如果选了的课等于总课数，则返回学习顺序，否则返回空数组
    return count==numCourses?result:[]
}