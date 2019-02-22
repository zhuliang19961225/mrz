$(function(){
    $("#form").bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
          },
          fields: {
              username: {
                  //校验规则
                  validators: {
                      //非空
                      notEmpty: {
                          message:'用户名不能为空'
                      },
                      //长度校验
                      stringLength: {
                          min: 2,
                          max: 6,
                          message:'用户名长度必须在2-6位之间'
                      }
                  }
              },
              password: {
                  validators: {
                      notEmpty: {
                          message:'密码不能为空'
                      },
                      stringLength: {
                          min: 6,
                          max: 12,
                          message: "密码长度必须在6-12位之间"
                      }
                  }
              }
          }
    })

    $("#form").on("success.form.bv",function(e){
        //阻止默认提交
        e.preventDefault();
        $.ajax({
            type:'post',
            url:'/employee/employeeLogin',
            //表单序列化
            data:$("#form").serialize(),
            dataType:'json',
            success:function(res){
                if(res.error === 1000){
                    alert("用户名错误")
                }
                if(res.error === 1001) {
                    alert("密码错误")
                }
                if(res.success) {
                    location.href = "index.html";
                }
            }
        })
    })
});