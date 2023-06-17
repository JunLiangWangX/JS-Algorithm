/*
 * @Description: 给你一个字符串 path ，表示指向某一文件或目录的 Unix 风格 绝对路径 （以 '/' 开头），
                 请你将其转化为更加简洁的规范路径。
 * @Author: JunLiangWang
 * @Date: 2023-06-17 09:14:33
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-06-17 09:28:17
 */


/**
 * @description: 栈    TC:O(n)  SC:O(n)
 * @author: JunLiangWang
 * @param {*} path  给定路径
 * @return {*}
 */
function stack(path) {
    /**
     * 本方案利用栈的方式，我们以'/'分割路径，然后遍历分割的元素(即为目录)，当
     * 遇到目录名不等于'','.'时我们将该目录入栈(由于当前目录是'.'或''时，我们
     * 需要将其删除，我们不入栈就等同于删除，因此当前目录不等于'.'或''时，入栈)，
     * 当遇到目录名等于'..'时,则需要回退到上级目录，此时弹出栈中栈顶元素即可。最
     * 后我们将栈中元素使用'/'链接返回即可
     */

    // 存放当前目录
    let content = '',
    // 存放之前的目录的栈
    stackArray = [];

    // 遍历路径，以'/'分割路径
    for (let i = 0; i < path.length; i++) {
        // 当前字符如果不是'/'，则证明是目录
        if (path[i] != '/') {
            content += path[i]
        }
        // 如果当前字符是'/'，证明当前以获得当前目录
        // 此时需要判断当前目录的类型
        else {
            // 如果当前目录是'..',则需要回退到上级目录
            // 此时弹出栈中栈顶元素即可
            if (content == '..') stackArray.pop();
            // 由于当前目录是'.'或''时，我们需要将其删除
            // 由于我们不入栈就等同于删除，因此当前目录不
            // 等于'.'或''时，入栈
            else if (content != '.' && content != '') stackArray.push(content);
            // 当前目录清空
            content = '';
        }
    }

    // 防止结尾无'/'，因此遍历完成后仍要判断一次
    if (content == '..') stackArray.pop();
    else if (content != '.' && content != '') stackArray.push(content);
    // 返回结果
    return '/' + stackArray.join('/');
}