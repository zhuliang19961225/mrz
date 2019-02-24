$(function() {
  //发送ajax请求 获取数据。完成渲染
  var currentPage = 1; //当前页
  var pageSize = 5; //每页的条数

  render();
  function render() {
    $.ajax({
      type: "get",
      url: "/category/queryTopCategoryPaging",
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      dataType: "json",
      success: function(res) {
        console.log(res);
        var htmlStr = template("firstTpl", res);
        $("tbody").html(htmlStr);


        //完成分页初始化
        $("#paginator").bootstrapPaginator({
            //版本号
            bootstrapMajorVersion:3,
            //当前页
            currentPage: res.page,
            //总页数
            totalPages: Math.ceil(res.total/res.size),
            //给页码添加点击事件
            onPageClicked:function(a,b,c,page) {
                //更新当前页，并且重新渲染
                currentPage = page;
                render();
            }
        })
      }
    });
  }

  //点击添加分类按钮，显示模态框
  $("#addBtn").click(function(){
      $("#addModal").modal("show");
  })


  //完成添加校验
  $("#form").bootstrapValidator({
      // 配置图标
    feedbackIcons: {
        valid: 'glyphicon glyphicon-ok',
        invalid: 'glyphicon glyphicon-remove',
        validating: 'glyphicon glyphicon-refresh'
      },
      //配置需要验证的字段
      fields: {
        categoryName: {
          // 配置校验规则
          validators: {
            // 非空校验
            notEmpty: {
              message: '请输入一级分类名称'
            }
          }
        }
      }
  })


  //注册表单校验成功事件，在事件中阻止默认的提交
  $("#form").on("success.form.bv",function(e){
    //阻止默认对的提交  
    e.preventDefault();

    //发送ajax请求
    $.ajax({
        type:'post',
        url:'/category/addTopCategory',
        data: $("#form").serialize(),
        dataType:'json',
        success:function(res){
            if(res.success) {
                //关闭模态框
                $("#addModal").modal("hide");
                //重新渲染第一页
                currentPage = 1;
                render();

                //将表单的内容和状态都重置
                $("#form").data("bootstrapValidator").resetForm(true);
            }
        }
    })
  })
});
