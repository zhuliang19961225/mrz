$(function(){
    //1进入页面发送ajax
    var currentPage = 1;  //当前页
    var pageSize = 5;       //每页条数
    render();

    function render(){
        $.ajax({
            type:'get',
            url:'/category/querySecondCategoryPaging',
            data:{
                page:currentPage,
                pageSize:pageSize
            },
            dataType:'json',
            success:function(res) {
                console.log(res);
                var htmlStr = template("secondTpl",res);
                $("tbody").html(htmlStr);

                //完成分页初始化
                $("#paginator").bootstrapPaginator({
                    //版本号
                    bootstrapMajorVersion:3,
                    //当前页 currentPage
                    currentPage: res.page,
                    //总页数  totalPages
                    totalPages: Math.ceil(res.total/res.size),
                    //给页码添加点击事件
                    onPageClicked:function(a,b,c,page) {
                        //更新当前页
                        currentPage = page;
                        //重新渲染页面
                        render();
                    }
                })
            }
        })
    }


    //2点击添加分类按钮。显示添加模态框
    $("#addBtn").click(function(){
        $("#addModal").modal("show");

        //发送ajax请求。获取一级分类的数据。用于渲染
        $.ajax({
            type:'get',
            url:"/category/queryTopCategoryPaging",
            data:{
                page:1,
                pageSize:100
            },
            dataType:"json",
            success:function(res) {
                console.log(res);
                var htmlStr = template("dropdownTpl",res);
                $(".dropdown-menu").html(htmlStr);
            }
        })
    });


    //3给下拉菜单.添加可选功能
    $(".dropdown-menu").on("click",'a',function(){
        //获取a的文本
        var txt = $(this).text();
        //设置给button按钮
        $("#dropdownText").text(txt);

        //获取id  设置给隐藏域
        var id = $(this).data('id');
        //设置给隐藏域
        $('[name="categoryId"]').val(id);
        //只要赋值给隐藏域了。此时校验状态应该更新成功
        $('#form').data('bootstrapValidator').updateStatus('categoryId','VALID');
    });

     //4文件上传初始化
     $("#fileupload").fileupload({
         dataType:'json',
         done:function(e,data){
             console.log(data);
             var result = data.result;  //后台返回的结果
             var picUrl = result.picAddr;  //获取返回的图片路径
             //设置给img  src
             $("#imgBox img").attr("src",picUrl);
             //把路径值赋值给隐藏域
             $('[name="brandLogo"]').val(picUrl);
             //只要隐藏域有值了。就是更新成功的状态
             $('#form').data('bootstrapValidator').updateStatus('brandLogo', 'VALID');
         }
     })

     //5进行校验
     $("#form").bootstrapValidator({
         //配置excluded排除项  ，对隐藏域完成校验
         excludes:[],
         // 配置图标
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        //配置校验字段 列表
        fields: {
            //选择一级分类
            categoryId: {
                validators: {
                    notEmpty:{
                        message:'请选择一级分类'
                    }
                }
            },
            //输入二级分类名称
            brandName: {
                validators: {
                    notEmpty:{
                        message:'请输入二级分类名称'
                    }
                }
            },
            //二级分类图片
            brandLogo: {
                validators:{
                    notEmpty:{
                        message:'请选择图片'
                    }
                }
            }

        }
     });

     //6 注册表单校验成功事件，阻止默认的提交，通过ajax提交
     $("#form").on("success.form.bv",function(e) {
         e.preventDefault();

         $.ajax({
             type:'post',
             url:'/category/addSecondCategory',
             data:$("#form").serialize(),
             dataType:"json",
             success:function(res) {
                 console.log(res);
                 if(res.success) {
                     //关闭模态框
                     $("#addModal").modal("hide");
                     //重新渲染第一页
                     currentPage = 1;
                     render();

                     //将表单元素重置
                     $("#form").data('bootstrapValidator').resetForm(true);
                     //button 和 img 不是表单元素。手动重置
                     $("#dropdownText").text('请选择一级分类');
                     $("#imgBox img").attr('src','./images/none.png');
                 }
             }
         })
     })

})