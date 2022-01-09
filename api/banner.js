import request from '@/utils/request'
export default {
    // 查询前2条banner信息
    getBannerList(){
        return request({
            url: `/cms/banner/front`,
            method: 'get',
        })
    }
}