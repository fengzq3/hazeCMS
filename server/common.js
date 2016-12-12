/**
 * Created by feng on 2016/12/12.
 * 一个公告方法库，提取一些可能会重复用到的方法到独立文件
 */
module.exports = {
    /**
     * 传入2个数组，返回2数组中的不同数据
     * @param ar1
     * @param ar2
     * @returns {Array}
     */
    mergeArray: function (ar1, ar2) {
        let newAr = [];
        for (let i = 0; i < ar1.length; i++) {
            if (ar2.indexOf(ar1[i]) < 0) {
                newAr.push(ar1[i]);
            }
        }
        //第二循环
        for (let i = 0; i < ar2.length; i++) {
            if (ar1.indexOf(ar2[i]) < 0) {
                newAr.push(ar2[i]);
            }
        }

        return newAr;
    }
};