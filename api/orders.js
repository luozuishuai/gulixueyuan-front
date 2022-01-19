import request from '@/utils/request'

export default {
    //根据课程id创建订单
    createOrder(courseId){
        return request({
            url: `/order/order/${courseId}`,
            method: 'get',
        })
    },
    //根据订单号查询订单
    getOrdersInfo(orderNo){
        return request({
            url: `/order/order/info/${orderNo}`,
            method: 'get',
        })
    },
    //生成微信支付二维码
    createWxPayQrCode(orderNo){
        return request({
            url: `/order/wxPay/native/${orderNo}`,
            method: 'get',
        })
    },
    //查询支付状态（如果已支付，则更新订单状态，并添加支付记录）
    queryWxPayStatus(orderNo){
        return request({
            url: `/order/wxPay/queryPayStatus/${orderNo}`,
            method: 'get',
        })
    }
}