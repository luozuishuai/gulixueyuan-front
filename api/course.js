import request from '@/utils/request'

export default {
    //分页条件查询课程列表
    queryPageCourse(current,size,queryCourseVo){
        return request({
            url: `/edu/front/course/${current}/${size}`,
            method: 'post',
            data: queryCourseVo
        })
    },
    //查询一级二级分类信息树形结构
    getSubjectTree(){
        return request({
            url: `/edu/subject`,
            method: 'get'
        })
    },
    //根据课程id，查询课程章节小节详情分类等全部信息
    getCourseDetail(courseId){
        return request({
            url: `/edu/front/course/${courseId}`,
            method: 'get'
        })
    },
    //根据小节id，获取小节视频id和视频播放凭证
    getPlayAuth(id){
        return request({
            url: `/edu/front/course/playVideo/${id}`,
            method: 'get'
        })
    }
}