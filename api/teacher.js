import request from '@/utils/request'

export default {
    //分页查询讲师列表
    pageTeacher(current,size){
        return request({
            url: `/edu/front/teacher/${current}/${size}`,
            method: 'get'
        })
    },
    //按讲师id查询讲师信息及其对应的课程列表
    getTeacherCourse(id){
        return request({
            url: `/edu/front/teacher/${id}`,
            method: 'get'
        })
    }
}