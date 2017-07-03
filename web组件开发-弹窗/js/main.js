/**
 * Created by Lim on 2017/6/5.
 */
require.config({
    paths: {
        jquery: 'jquery-1.11.3.min',
        jqueryUI: 'jquery-ui-1.10.2.min'
    }
});
require(['jquery', 'window'], function ($, w) {

    $('#a').click(function () {
        var win = new w.Window();
        win.alert({
            content: 'welcome!',
            width: 300,
            height: 150
            //skinClassName:'window_skin_a'
            //title:'提示'
            //hasCloseBtn:true
            //handler4CloseBtn: function () {
            //    alert('click close btn 1 times');
            //},
            //handler4ConfirmBtn: function () {
            //    alert('click confirm btn 1 times');
            //}
            //text4ConfirmBtn:'OK'
            //hasMask:false
            //isDraggable:false
        });
        /* 观察者模式(自定义事件)
        * 给应用层多个选择,可以在执行方法的时候传入handler
        * 也可以直接绑定事件,等执行到该代码时,响应该事件
        * */
        win.on('alert',function () {
            alert('click confirm btn 1 times');
        });
        
        win.on('close',function () {
            alert('click close btn 1 times');
        });

    });
});