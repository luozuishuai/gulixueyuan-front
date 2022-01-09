<template>
  <div class="main">
    <div class="title">
      <a class="active" href="/login">登录</a>
      <span>·</span>
      <a href="/register">注册</a>
    </div>

    <div class="sign-up-container">
      <el-form ref="userForm" :model="user" :rules="rule">

        <el-form-item class="input-prepend restyle" prop="mobile">
          <div >
            <el-input type="text" placeholder="手机号" v-model="user.mobile"/>
            <i class="iconfont icon-phone" />
          </div>
        </el-form-item>

        <el-form-item class="input-prepend" prop="password">
          <div>
            <el-input type="password" placeholder="密码" v-model="user.password"/>
            <i class="iconfont icon-password"/>
          </div>
        </el-form-item>

        <div class="btn">
          <input type="button" class="sign-in-button" value="登录" @click="submitLogin()">
        </div>
      </el-form>
      <!-- 更多登录方式 -->
      <div class="more-sign">
        <h6>社交帐号登录</h6>
        <ul>
          <li><a id="weixin" class="weixin" target="_blank" href="http://localhost:9001/ucenter/wx/getWxLoginQrCode"><i class="iconfont icon-weixin"/></a></li>
          <li><a id="qq" class="qq" target="_blank" href="#"><i class="iconfont icon-qq"/></a></li>
        </ul>
      </div>
    </div>

  </div>
</template>

<script>
import '~/assets/css/sign.css'
import '~/assets/css/iconfont.css'
import loginApi from '@/api/login'
import cookie from 'js-cookie'

  export default {
    layout: 'sign',
    data () {
      var checkPhone =  (rule, value, callback) => {
        //debugger
        if (!(/^1[34578]\d{9}$/.test(value))) {
          return callback(new Error('手机号码格式不正确'))
        }
        return callback()
      }
      return {
        user:{
          mobile:'',
          password:''
        },
        loginInfo:{},
        rule: {
            mobile: [
                { required: true, message: '请输入手机号码', trigger: 'blur' },{validator: checkPhone, trigger: 'blur'}
            ],
            password: [
                { required: true, message: '请输入密码', trigger: 'blur' },
                { min: 5, max: 18, message: '密码长度为5~18位', trigger: 'blur' }
            ]
        }
      }
    },

    methods: {

        submitLogin(){
            //先验证表单是否正确填写
            this.$refs['userForm'].validate((valid) =>{
                if(valid){
                    //表单验证成功
                    console.log('表单校验成功');
                    loginApi.login(this.user).then(response => {
                        //提示信息
                        this.$message.success('登录成功！')

                        //从response中获取token值 存入cookie (7天有效)
                        cookie.set('token', response.data.token, { expires: 7 })
                        
                        //从服务器获取用户信息
                        loginApi.getLoginUserInfo().then(response => {
                            this.loginInfo = response.data.items
                            //将用户信息存入cookie中
                            cookie.set('loginUserInfo', JSON.stringify(this.loginInfo), { expires: 7 })

                            //跳转到商城首页
                            window.location.href = '/'
                            // this.$router.push({path: '/'})
                        })

                    })
                }
            })
        },
    }
  }
</script>
<style>
   .el-form-item__error{
    z-index: 9999999;
  }
</style>