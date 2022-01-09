import request from '@/utils/request'
export default {
    //发送验证码
    sendCode(phone){
        return request({
            url: `/msm/` + phone,
            method: 'get'
        })
    },
    //注册
    register(registerVo){
        return request({
            url: `/ucenter/member/register`,
            method: 'post',
            data: registerVo
        })
    }
}