import request from '@/utils/request'

export default {
    //根据视频id，获取视频播放凭证
    getPlayAuth(videoId){
        return request({
            url: `/vod/video/${videoId}`,
            method: 'get'
        })
    },
    
}