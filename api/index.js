import request from '@/utils/request'
export default {
    // 查询前2条banner信息
    getIndexData(){
        return request({
            url: `/edu/index`,
            method: 'get',
        })
    }
}