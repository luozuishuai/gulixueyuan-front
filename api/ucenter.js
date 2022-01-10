import request from '@/utils/request'

export default {
    //查询登录用户信息
    getLoginInfo(){
        return request({
            url: `/ucenter/member/getLoginInfo`,
            method: 'get',
        })
    },
    
}