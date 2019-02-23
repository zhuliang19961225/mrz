// ajax全局事件
// .ajaxComplete(fn);   每个ajax完成时, 都会调用fn回调函数   (完成: 不管成功还是失败)
// .ajaxSuccess(fn);    每个ajax只要成功了, 就会调用fn
// .ajaxError(fn);      每个ajax只要失败了, 就会调用fn
// .ajaxSend(fn);       每个ajax发送前, 都会调用fn

// .ajaxStart(fn);      在第一个ajax开始发送时, 调用fn
// .ajaxStop(fn);       在全部的ajax完成时, 调用fn  (不管成功还是失败)


// 测试进度条功能
// 开始
// NProgress.start();

// setTimeout(function() {
//   // 结束
//   NProgress.done();
// }, 2000);



//在第一个ajax开始发送时。开启进度条
$(document).ajaxStart(function(){
    NProgress.start();
})

//在全部的ajax完成时,关闭进度条
$(document).ajaxStop(function(){
    //模拟网络延迟
    setTimeout(function(){
      //结束进度条
      NProgress.done();
    },500)
})

//公用的功能
//左侧二级菜单的切换
//左侧整体菜单的切换
//公共的退出功能
$(function(){
    //左侧二级菜单的切换
    $(".lt_aside .category").click(function(){
        //找下一个兄弟元素。切换显示
        $(this).next().stop().slideToggle();
    })

    //左侧整体菜单的切换
    $(".lt_topbar .icon_menu").click(function(){
        //让左侧整个菜单切换显示  改左侧菜单的left值
        $('.lt_aside').toggleClass('hidemenu');
        $(".lt_main").toggleClass('hidemenu');
        $(".lt_topbar").toggleClass('hidemenu');
    })


    //退出功能
    $('.lt_topbar .icon_logout').click(function(){
        //m模态框显示
        $("#logoutModal").modal('show');
    })
    
    //点击发送ajax请求，让服务器端销毁用户的登录状态
    $("#logoutBtn").click(function(){
        $.ajax({
            type:'get',
            url:'/employee/employeeLogout',
            dataType:'json',
            success:function(res) {
                if(res.success) {
                    location.href = "login.html";
                }
            }
        })
    })
})
