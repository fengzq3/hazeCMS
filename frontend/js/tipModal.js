/**
 * Created by feng on 2016/11/29.
 * data = {}
 * data.title 标题
 * data.body 内容
 */
//通用tip消息
const mainTip = $('#tipModal');

module.exports = {

    open:function (data) {
        mainTip.modal('show');
        mainTip.find('#tipModalLabel').text(data.title);
        mainTip.find('.modal-body').text(data.body);
    },
    hide:function () {
        mainTip.modal('hide');
    },


};