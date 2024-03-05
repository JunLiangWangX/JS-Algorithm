/*
 * @Description: 你这个学期必须选修 numCourses 门课程，记为 0 到 numCourses - 1 。在选修某些课程之前需要一些先修课程。
                 先修课程按数组 prerequisites 给出，其中 prerequisites[i] = [ai, bi] ，表示如果要学习课程 ai 则 必须
                  先学习课程  bi 。例如，先修课程对 [0, 1] 表示：想要学习课程 0 ，你需要先完成课程 1 。请你判断是否可能
                  完成所有课程的学习？如果可以，返回 true ；否则，返回 false 。
 * @Author: JunLiangWang
 * @Date: 2024-01-02 09:45:27
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2024-01-02 10:11:33
 */


/**
 * @description: 深度优先   TC:O(n+m)  SC:O(n+m)
 * @author: JunLiangWang
 * @param {*} numCourses    给定课程数量
 * @param {*} prerequisites 给定课程关系数组 
 * @return {*}
 */
function dfs(numCourses, prerequisites){
    /**
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
     * 课程继续递归，如果全为true，则证明该课程无环，返回false并将
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
    let recordPath=new Array(numCourses).fill(0)
    /**
     * @description: 使用递归实现深度优先
     * @author: JunLiangWang
     * @param {*} course 当前选择的课程
     * @return {*}
     */    
    function recursion(course){
        // 当前课程为1则证明之前选过该课程且该课程不存在环，
        // 当前未选该课程，直接return true；
        if(recordPath[course]==1)return true
        // 当前课程为-1则证明当前已选该课程存在环，直接return false
        if(recordPath[course]==-1)return false
        // 剩下则为0，当前课程为0则证明还未选过该课程，需要继续判断其
        // 先修课程是否存在环

        // 获取其先修课程列表
        let courseList=courseMap.get(course)
        // 没有或为空，证明该课程不存在环，直接return true
        if(!courseList)return true
        // 否则，将其置为-1，表明该课程已被选择
        recordPath[course]=-1
        // 继续递归其先修课程
        for(let item of courseList)if(!recursion(item))return false
        // 如果全为true，证明其先修课程都不存在环，也就是说
        // 当前课程也不存在环，将其置为1
        recordPath[course]=1
        // 返回true
        return true
    }
    // 遍历所有课程直接递归
    for(let i=0;i<numCourses;i++){
        if(!recursion(i))return false
    }
    // 如果所有课程的不存在环，则证明该有向图是无环有向图，返回true
    return true
}


/**
 * @description: 广度优先   TC:O(n+m)  SC:O(n+m)
 * @author: JunLiangWang
 * @param {*} numCourses    给定课程数量
 * @param {*} prerequisites 给定课程关系数组 
 * @return {*}
 */
function bfs(numCourses, prerequisites){
    
    //本题其实就是判断该有向图是否为有向无环图，也就是使用
    //拓扑排序将有向无环图转成线性的排序

     // 定义入度数组
     let inDegreee=new Array(numCourses).fill(0),
     // 邻接表，记录各课程关系
     relationMap=new Map()                 
     // 遍历课程关系数组       
     for(let item of prerequisites){
         // 求课程的入度值
         inDegreee[item[0]]++    
         // 记录两课程关系，当item[1]出度时，所影响的课程
         let courseList = relationMap.get(item[1]) || []
         courseList.push(item[0])
         relationMap.set(item[1], courseList)
     }
     // 定义队列
     let quene=[];
     // 将入度为0的课程放入队列中
     inDegreee.forEach((val,index)=>{
         if(val==0)quene.push(index)
     })
     // 入度为0的课程
     let count=0
     while(quene.length){
         let course=quene.shift(),     // 把入度为0的课程出队
         courseList=relationMap.get(course); // 获取这门课对应的后续课
         count++;  // 选课数+1
         if(!courseList||courseList.length==0)continue; //如果为空或为0直接跳过
         courseList.forEach((val)=>{
             inDegreee[val]--;  // 依赖它的后续课的入度-1
             if(inDegreee[val]==0)quene.push(val) // 如果因此减为0，入列
         })
     }
     // 选了的课等于总课数，true，否则false
     return count==numCourses
}