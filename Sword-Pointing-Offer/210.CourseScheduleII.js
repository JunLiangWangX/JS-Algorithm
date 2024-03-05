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
 * @LastEditTime: 2024-01-03 09:37:57
 */



/**
 * @description: 深度优先   TC:O(n+m)  SC:O(n+m)
 * @author: JunLiangWang
 * @param {*} numCourses    给定课程数量
 * @param {*} prerequisites 给定课程关系数组 
 * @return {*}
 */                 
function dfs(numCourses,prerequisites){
    
    /**
     * 
     * 本题与207课程表一致，其解决方案也是一致的，不过就是加入了
     * 一个记录其顺序的数组而已
     * 
     * 本题其实就是判断有向图是否无环，本方案使用深度优先的方式。
     * 
     * 首先遍历课程关系数组，使用map记录课程的先决课程，key为课
     * 程名称,value为需要先修的课程数组。
     * 
     * 定义一个数组recordPath，其长度为课程数量，其数组元素存在
     * 3个状态：0(从未选过该课程)
     *          1(之前选过该课程且该课程不存在环，当前未选该课程)
     *         -1(当前已选该课程)
     * 
     * 然后从0到numCourses-1遍历所有课程，执行递归。当当前课程为
     * 1则证明不存在环，直接return true；当当前课程为-1则证明当前
     * 已选了该课程存在环，则直接return false；当当前课程为0则证明还未
     * 选过该课程，此时根据map获取选择该课程的先修课程列表，如果
     * 课程列表为空/为0，证明该课程也无环，直接return true；否则
     * 将当前课程的recordPath置为-1，证明已选择该课程，然后其先修
     * 课程继续递归，如果全为true，则证明该课程无环，返回true并将
     * 其置为1
     */

    let courseMap = new Map()
    // 构建课程关系图
    for (let i = 0; i < prerequisites.length; i++) {
        // key为课程名称,value为需要先修的课程数组。
        let courseList = courseMap.get(prerequisites[i][0]) || []
        courseList.push(prerequisites[i][1])
        courseMap.set(prerequisites[i][0], courseList)
    }
    /* 定义一个数组recordPath，其长度为课程数量，其数组元素存在
    * 3个状态：0(从未选过该课程)
    *          1(之前选过该课程且该课程不存在环，当前未选该课程)
    *         -1(当前已选该课程)
    */
    let recordPath = new Array(numCourses).fill(0),
    // 记录学习课程顺序
    result = []
    /**
     * @description: 使用递归实现深度优先
     * @author: JunLiangWang
     * @param {*} course 当前选择的课程
     * @return {*}
     */
    function recursion(course) {
        // 当前课程为1则证明之前选过该课程且该课程不存在环，
        // 当前未选该课程，直接return true；
        if (recordPath[course] == 1) return true
        // 当前课程为-1则证明当前已选该课程存在环，直接return false
        if (recordPath[course] == -1) return false
        // 剩下则为0，当前课程为0则证明还未选过该课程，需要继续判断其
        // 先修课程是否存在环

        // 获取其先修课程列表
        let courseList = courseMap.get(course)
        // 没有或为空，证明该课程不存在环，直接return true
        if (!courseList) {
            // 当前课程也不存在环，将其置为1
            recordPath[course] = 1
            // 加入课程
            result.push(course)
            return true
        }
        // 否则，将其置为-1，表明该课程已被选择
        recordPath[course] = -1
        // 继续递归其先修课程
        for (let item of courseList) if (!recursion(item)) return false
        // 如果全为true，证明其先修课程都不存在环，也就是说
        // 当前课程也不存在环，将其置为1
        recordPath[course] = 1
        // 加入课程
        result.push(course)
        // 返回true
        return true
    }
    // 遍历所有课程直接递归
    for (let i = 0; i < numCourses; i++) {
        if (!recursion(i)) return []
    }
    // 如果所有课程的不存在环，则证明该有向图是无环有向图，返回result学习课程顺序
    return result
}


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