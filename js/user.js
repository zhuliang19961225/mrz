$(function(){
    //进入页面发送ajax请求
    var currentPage = 1;  //当前页
    var pageSize = 5;    //每页条数
    var currentId;    //标记当前正在编辑的id
    var isDelete;     //标记用户修改成什么状态

    render();
    function render(){
        $.ajax({
            type:'get',
            url:'/user/queryUser',
            data:{
                page:currentPage,
                pageSize:pageSize
            },
            dataType:'json',
            success:function(res) {
                console.log(res);
                var htmlStr = template("tpl",res);
                $("tbody").html(htmlStr);

                //根据请求回来的数据，完成分页初始化
                $("#paginator").bootstrapPaginator({
                    //版本号
                    bootstrapMajorVersion:3,
                    //当前页
                    currentPage:res.page,
                    //总页
                    totalPages: Math.ceil(res.total/res.size),
                    onPageClicked:function(a,b,c,page){
                        //更新currentPgae
                        currentPage = page;
                        //重新渲染页面
                        render();
                    }
                })
            }
        })
    }

    $("tbody").on("click",".btn",function(){
        //显示模态框
        $("#userModal").modal("show");
        //获取id
        currentId = $(this).parent().data('id');
        //获取启用禁用状态
        //btn-danger 禁用按钮
        isDelete = $(this).hasClass('btn-danger') ? 0 : 1;
    })

    //给模态框的确定按钮，添加点击事件
    $("#confirmBtn").click(function(){
        //发送ajax请求
        $.ajax({
            type:'post',
            url:'/user/updateUser',
            data: {
                id: currentId,
                isDelete: isDelete
            },
            dataType:'json',
            success:function(res) {
                console.log(res);
                if(res.success) {
                    //关闭模态框
                    $("#userModal").modal("hide");
                    //重新渲染
                    render();
                }
            }
        })
    })
})