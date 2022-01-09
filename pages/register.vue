<template>
  <div class="main">
    <div class="title">
      <a href="/login">登录</a>
      <span>·</span>
      <a class="active" href="/register">注册</a>
    </div>

    <div class="sign-up-container">
      <el-form ref="userForm" :rules="rules" :model="params">

        <el-form-item class="input-prepend restyle" prop="nickname">
          <div>
            <el-input type="text" placeholder="你的昵称" v-model="params.nickname"/>
            <i class="iconfont icon-user"/>
          </div>
        </el-form-item>

        <el-form-item class="input-prepend restyle no-radius" prop="mobile">
          <div>
            <el-input type="text" placeholder="手机号" v-model="params.mobile"/>
            <i class="iconfont icon-phone"/>
          </div>
        </el-form-item>

        <el-form-item class="input-prepend restyle no-radius" prop="code">
          <div style="width: 100%;display: block;float: left;position: relative">
            <el-input type="text" placeholder="验证码" v-model="params.code"/>
            <i class="iconfont icon-phone"/>
          </div>
          <div class="btn" style="position:absolute;right: 0;top: 6px;width: 40%;">
            <!-- <a href="javascript:" type="button" @click="getCodeFun()" :value="codeText" style="border: none;background-color: none">{{codeText}}</a> -->
            <el-button type="primary" plain @click="getCodeFun()" size="small" :disabled="sendCodeBtn">{{codeText}}</el-button>
          </div>
        </el-form-item>

        <el-form-item class="input-prepend" prop="password">
          <div>
            <el-input type="password" placeholder="设置密码" v-model="params.password"/>
            <i class="iconfont icon-password"/>
          </div>
        </el-form-item>

        <div class="btn">
          <input type="button" class="sign-up-button" value="注册" @click="submitRegister()">
        </div>
        <p class="sign-up-msg">
          点击 “注册” 即表示您同意并愿意遵守简书
          <br>
          <a target="_blank" href="http://www.jianshu.com/p/c44d171298ce">用户协议</a>
          和
          <a target="_blank" href="http://www.jianshu.com/p/2ov8x3">隐私政策</a> 。
        </p>
      </el-form>
      <!-- 更多注册方式 -->
      <div class="more-sign">
        <h6>社交帐号直接注册</h6>
        <ul>
          <li><a id="weixin" class="weixin" target="_blank" href="http://huaan.free.idcfengye.com/api/ucenter/wx/login"><i
            class="iconfont icon-weixin"/></a></li>
          <li><a id="qq" class="qq" target="_blank" href="#"><i class="iconfont icon-qq"/></a></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import '~/assets/css/sign.css'
  import '~/assets/css/iconfont.css'

  import registerApi from '@/api/register'

  export default {
    layout: 'sign',
    data(){
        var checkPhone = (rule,value,callback) => {
            if(!(/^1[34578]\d{9}$/.test(value))){
                return callback(new Error('手机号码格式不正确'))
            }
            return callback()
        }
        let validPassword = (rule,value,callback)=>{
            let reg= /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{5,11}$/
            if(!reg.test(value)){
                callback(new Error('密码必须是字母、数字组合'))
            }else{
                callback()
            }
        }
        return {
            //用户注册信息
            params:{
                nickname: '',
                mobile: '',
                password: '',
                code: ''
            },
            //发送验证码按钮是否禁用
            sendCodeBtn: false,
            //倒计时初始值
            sencond: 60,
            //发送验证码按钮名称
            codeText: '获取验证码',
            //表单填写规则
            rules: {
                mobile:[
                    { required: true, message: '请输入手机号码', trigger: 'blur' },
                    { validator: checkPhone, trigger: 'blur' },
                ],
                code: [
                    { required: true, message: '请输入验证码', trigger: 'blur' },
                    { min:4,max:4,message: '请正确输入4位数验证码',trigger: "blur" },
                    { pattern: /^-?\d+\.?\d*$/, message: '请输入数字验证码', trigger: 'blur' },
                ],
                nickname: [
                    { required: true, message: '请输入你的昵称', trigger: 'blur' },
                    { min:5,max:12,message: '长度在5~12个字符',trigger: "blur" },
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min:5,max:18,message: '长度在5~18个字符',trigger: "blur" },
                    { validator: validPassword, trigger: 'blur' },
                ]
            }
        }
    },
    methods: {

        //点击获取验证码按钮
        getCodeFun(){
            //先判断手机号是否为空
            this.$refs['userForm'].validateField('mobile',(valid) => {
                if(!valid){
                    //手机号不为空，则调用接口发送验证码
                    registerApi.sendCode(this.params.mobile)
                    .then(response => {
                        //验证码获取成功，将按钮禁用，将按钮名称改为'重新获取'，并开始倒计时
                        this.timeDown()
                    })
                }
            })
        },

        //重新发送验证码倒计时,每秒执行一次
        timeDown(){
            let result = setInterval(() => {
                //让时间-1
                --this.sencond
                //判断时间是否<1
                if(this.sencond < 1){
                    //时间小于1，则当前清除Interval
                    clearInterval(result)
                    //开启按钮
                    this.sendCodeBtn = false
                    //让时间回归60
                    this.sencond = 60
                    this.codeText = '获取验证码'
                }else{
                    //禁用按钮
                    this.sendCodeBtn = true
                    this.codeText = '重新获取' + this.sencond + 's'
                }
            },1000)
        },

        //点击注册按钮
        submitRegister(){
            //先判断表单是否按规则填写
            this.$refs['userForm'].validate((valid) => {
                if(valid){
                    //表单ok，调用接口注册
                    registerApi.register(this.params)
                    .then(response => {
                        //提示注册成功
                        this.$message.success('账号注册成功！')
                        //跳转到登录页面
                        this.$router.push({path:'/login'})
                    }).catch(error => {
                        console.log('出错了');
                        console.log(error);
                    })

                }
            })
        }

    },
  }
</script>
