import request from '@/utils/request'

export default {
    login(user){
        return request({
            url: `/ucenter/member/login`,
            method: 'post',
            data: user
        })
    },
    getLoginUserInfo(){
        return request({
            url: `/ucenter/member/getLoginInfo`,
            method: 'get'
        })
    },

}