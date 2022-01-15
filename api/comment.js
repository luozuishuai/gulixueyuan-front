import request from '@/utils/request'
export default {
    // 分页查询课程下的评论
    queryPageComment(courseId,current,size){
        return request({
            url: `/edu/front/comment/${courseId}/${current}/${size}`,
            method: 'get',
        })
    },
    // 添加评论
    addComment(comment){
        return request({
            url: `/edu/front/comment`,
            method: 'post',
            data: comment,
        })
    },
    // 添加评论2,(无需携带用户信息)
    addComment2(comment){
        return request({
            url: `/edu/front/comment/addComment2`,
            method: 'post',
            data: comment,
        })
    },
    //删除评论
    deleteComment(id){
        return request({
            url: `/edu/front/comment/${id}`,
            method: 'delete'
        })
    },
    //修改评论
    updateComment(comment){
        return request({
            url: `/edu/front/comment`,
            method: 'put',
            data: comment
        })
    },

}