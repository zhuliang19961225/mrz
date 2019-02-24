$(function(){
    //一开始进入页面发送ajax请求 获取数据  动态渲染
    var currentPage = 1;   //当前页
    var pageSize = 5;   //每页条数
    var currentId;   // 标记当前正在编辑的用户id
    var isDelete;    //标记修改用户成什么状态

    render();

    function render(){
        $.ajax({
            type:'get',
            url:'/user/queryUser',
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            dataType: 'json',
            success:function(res) {
                console.log(res);
                var htmlStr = template('tpl',res);
                $('tbody').html(htmlStr);


                //根据请求回来的数据，完成分页的初始化显示
                $("#paginator").bootstrapPaginator({
                    //版本号
                    bootstrapMajorVersion: 3,
                    //当前页
                    currentPage: res.page,
                    //总页数
                    totalPages: Math.ceil(res.total/res.size),
                    //给页码添加点击事件
                    onPageClicked:function(a,b,c,page) {
                        //更新currentPage
                        currentPage = page;
                        render();
                    }
                })
            }
        })
    }


    //点击表格中的按钮。显示模态框
    //事件委托
    $("tbody").on("click",'.btn',function(){

        //显示模态框
        $("#userModal").modal("show");
        //获取id
        currentId = $(this).parent().data('id');

        //获取启用禁止状态
        //有btn-danger类  禁用按钮
        //禁用按钮 ？ 改成禁用状态 0 ： 改成启用状态1
        isDelete = $(this).hasClass('btn-danger') ? 0 : 1;
    })

    //给模态框的确定按钮，添加点击事件
    $("#confirmBtn").click(function(){
        //发送ajax请求，完成用户状态的编辑
        //传参需要两个id  isDelete
        $.ajax({
            type:'post',
            url:'/user/updateUser',
            data: {
                id: currentId,
                isDelete: isDelete
            },
            dataType:'json',
            success:function(res) {
                if(res.success) {
                    //关闭模态框
                    //重新渲染
                    $("#userModal").modal("hide");
                    render();
                }
            }
        })
    })


})