/*
 * @Description: 给你两个基因序列 start 和 end ，以及一个基因库 bank ，
                 请你找出并返回能够使 start 变化为 end 所需的最少变化次
                 数。如果无法完成此基因变化，返回 -1 。
 * @Author: JunLiangWang
 * @Date: 2024-01-08 09:24:45
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2024-01-08 09:40:50
 */


/**
 * @description: 广度优先  TC:O(n^2)  SC:O(n^2)
 * @author: JunLiangWang
 * @param {*} startGene  开始基因序列字符串
 * @param {*} endGene    结束基因序列字符串
 * @param {*} bank       基因库数组
 * @return {*}
 */
function bfs(startGene, endGene, bank) {
    /**
     * 本方案使用广度优先
     */

    // 将基因库数组转换成map，方便后续查询
    let bankMap = new Map();
    for (let item of bank) bankMap.set(item, true);
    // 定义队列
    let quene = [startGene],
    // 记录变化次数
        count = 0,
    // 记录已经变化过的基因，防止重复变化（剪枝）
        recordMap = new Map()
    // 遍历队列元素
    while (quene.length) {
        // 获取该层元素数量
        let size = quene.length
        // 遍历该层元素
        while (size--) {
            // 出队
            let gene = quene.shift()
            // 如果当前基因等于结束基因，变化结束，返回次数
            if (gene == endGene) return count;
            // 基因8个字符依次遍历，改变其字符，此处不能单纯根据
            // gene与endGene的字符不一致，然后将gene的字符变为
            // endGene的字符，因为有可能变化后的基因在bank中并不
            // 存在。
            for (let i = 0; i < 8; i++) {
                for (let item of ['A', 'C', 'G', 'T']) {
                    // 如果字符相同，则跳过
                    if (gene[i] == item) continue;
                    // 替换字符
                    let geneArray = gene.split('')
                    geneArray[i] = item
                    newGene = geneArray.join('')
                    // 如果变化后的基因在bank中存在，且为遍历过，则将其放入队列中
                    if (bankMap.get(newGene) && !recordMap.get(newGene)) {
                        quene.push(newGene)
                        recordMap.set(newGene, true);
                    }
                }
            }
        }
        // 每层每个元素都仅会变化一次，因此遍历完成该层级元素，
        // 变化次数+1
        count++;
    }
    // 变化完成未变为end基因，返回-1
    return -1
}