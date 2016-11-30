/**
 * Created by feng on 2016/11/29.
 * data = {}
 * data.title 标题
 * data.body 内容
 */
//通用tip消息

const tipModal = {
    setModal:function (modal,data) {
        modal.modal('show');
        modal.find('#tipModalLabel').text(data.title);
        modal.find('.modal-body').text(data.body);
    },
    setTip:function (tip, mes) {
        // tip.stop().animate({bottom:85+'%',opacity:1});
        tip.addClass('showTip').removeClass('hideTip');
        tip.find('p').text(mes);
        //超时自动关闭
        setTimeout(function () {
            // tip.stop().animate({bottom:100+'%',opacity:0}).off('click');
            tip.removeClass('showTip').addClass('hideTip');
        },5000);
        //点击关闭按钮
        tip.on('click','.js-close',function () {
            // tip.stop().animate({bottom:100+'%',opacity:0}).off('click');
            tip.removeClass('showTip').addClass('hideTip');
        });
    }
};

module.exports = tipModal;