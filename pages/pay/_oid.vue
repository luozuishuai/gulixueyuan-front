<template>
  <div class="cart py-container">
    <!--主内容-->
    <div class="checkout py-container  pay">
      <div class="checkout-tit">
        <h4 class="fl tit-txt"><span class="success-icon"></span><span class="success-info">订单提交成功，请您及时付款！订单号：{{payObj.out_trade_no}}</span>
        </h4>
        <span class="fr"><em class="sui-lead">应付金额：{{payObj.total_fee}}</em><em class="orange money">￥</em></span>
        <div class="clearfix"></div>
      </div>
      <div class="checkout-steps">
        <div class="fl weixin">微信支付</div>
        <div class="fl sao">
          <p class="red">请使用微信扫一扫。</p>
          <div class="fl code">
            <!-- <img id="qrious" src="~/assets/img/erweima.png" alt=""> -->
            <!-- <qriously value="weixin://wxpay/bizpayurl?pr=R7tnDpZ" :size="338"/> -->
            <qriously :value="payObj.code_url" :size="338"/>
            <div class="saosao">
              <p>请使用微信扫一扫</p>
              <p>扫描二维码支付</p>
            </div>

          </div>

        </div>
        <div class="clearfix"></div>
        <!-- <p><a href="pay.html" target="_blank">> 其他支付方式</a></p> -->
        
      </div>
    </div>
  </div>
</template>
<script>
import ordersApi from '@/api/orders'
import qriously from 'vue-qriously'
export default {
    asyncData({ params, error}){
        return ordersApi.createWxPayQrCode(params.oid).then(response => {
                return {
                    payObj : response.data.resultMap
                }
        })
    },
    data(){
        return {
            timer: ''
        }
    },
    created(){

    },
    //在页面渲染之后执行
    mounted(){
        //每3秒执行一次
        this.timer = setInterval(()=>{
            this.queryWxPayStatus()
        },3000)
    },
    methods:{
        //查询订单付款状态
        queryWxPayStatus(){
            ordersApi.queryWxPayStatus(this.payObj.out_trade_no).then(response => {
                var payStatus = response.code
                if(20000 == payStatus){
                    //关掉定时器
                    clearInterval(this.timer)
                    //提示
                    this.$message.success('支付成功！')
                    //跳转
                    this.$router.push({ path: `/course/${this.payObj.course_id}` })
                }
            })
        }
    }

}
</script>
