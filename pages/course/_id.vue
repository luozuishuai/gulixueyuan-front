<template>
  <div id="aCoursesList" class="bg-fa of">
    <!-- /课程详情 开始 -->
    <section class="container">
      <section class="path-wrap txtOf hLh30">
        <a href="/" title class="c-999 fsize14">首页</a>
        \
        <a href="/course" title class="c-999 fsize14">{{course.subjectLevelOne}}</a>
        \
        <span class="c-333 fsize14">{{course.subjectLevelTwo}}</span>
      </section>
      <div>
        <article class="c-v-pic-wrap" style="height: 357px;">
          <section class="p-h-video-box" id="videoPlay">
            <img :src="course.cover" :alt="course.title" class="dis c-v-pic">
          </section>
        </article>
        <aside class="c-attr-wrap">
          <section class="ml20 mr15">
            <h2 class="hLh30 txtOf mt15">
              <span class="c-fff fsize24">{{course.title}}</span>
            </h2>
            <section class="c-attr-jg">
              <span class="c-fff">价格：</span>
              <b class="c-yellow" style="font-size:24px;">{{Number(course.price) == 0 ? '免费' : '￥' + course.price + '元'}}</b>
            </section>
            <section class="c-attr-mt c-attr-undis">
              <span class="c-fff fsize14">主讲： {{course.teacherName}}&nbsp;&nbsp;&nbsp;</span>
            </section>
            <section class="c-attr-mt of">
              <span class="ml10 vam">
                <em class="icon18 scIcon"></em>
                <a class="c-fff vam" title="收藏" href="#" >收藏</a>
              </span>
            </section>
            <section class="c-attr-mt">
              <a href="#" title="立即观看" class="comm-btn c-btn-3">立即观看</a>
            </section>
          </section>
        </aside>
        <aside class="thr-attr-box">
          <ol class="thr-attr-ol clearfix">
            <li>
              <p>&nbsp;</p>
              <aside>
                <span class="c-fff f-fM">购买数</span>
                <br>
                <h6 class="c-fff f-fM mt10">{{course.buyCount}}</h6>
              </aside>
            </li>
            <li>
              <p>&nbsp;</p>
              <aside>
                <span class="c-fff f-fM">课时数</span>
                <br>
                <h6 class="c-fff f-fM mt10">{{course.lessonNum}}</h6>
              </aside>
            </li>
            <li>
              <p>&nbsp;</p>
              <aside>
                <span class="c-fff f-fM">浏览数</span>
                <br>
                <h6 class="c-fff f-fM mt10">{{course.viewCount}}</h6>
              </aside>
            </li>
          </ol>
        </aside>
        <div class="clear"></div>
      </div>
      <!-- /课程封面介绍 -->
      <div class="mt20 c-infor-box">
        <article class="fl col-7">
          <section class="mr30">
            <div class="i-box">
              <div>
                <section id="c-i-tabTitle" class="c-infor-tabTitle c-tab-title">
                  <a name="c-i" class="current" title="课程详情">课程详情</a>
                </section>
              </div>
              <article class="ml10 mr10 pt20">
                <div>
                  <h6 class="c-i-content c-infor-title">
                    <span>课程介绍</span>
                  </h6>
                  <div class="course-txt-body-wrap">
                    <section class="course-txt-body">
                        <p v-html="course.description">
                        </p>
                    </section>
                  </div>
                </div>
                <!-- /课程介绍 -->
                <div class="mt50">
                  <h6 class="c-g-content c-infor-title">
                    <span>课程大纲</span>
                  </h6>
                  <section class="mt20">
                    <div class="lh-menu-wrap">
                      <menu id="lh-menu" class="lh-menu mt10 mr10">
                        <ul>
                          <!-- 文件目录 -->
                          <li class="lh-menu-stair" v-for="item in chapterVideoTree" :key="item.id">
                            <a href="javascript: void(0)" :title="item.title" class="current-1">
                              <em class="lh-menu-i-1 icon18 mr10"></em>{{item.title}}
                            </a>
                            <ol class="lh-menu-ol" style="display: block;">
                              <li class="lh-menu-second ml30" v-for="children in item.children" :key="children.id">
                                <a :href="'/player/' + children.videoSourceId" target="_blank">
                                  <span class="fr">
                                    <i class="free-icon vam mr10">免费试听</i>
                                  </span>
                                  <em class="lh-menu-i-2 icon16 mr5">&nbsp;</em>{{children.title}}
                                </a>
                              </li>
                              
                            </ol>
                          </li>
                        </ul>
                      </menu>
                    </div>
                  </section>
                </div>
                <!-- /课程大纲 -->
              </article>

                <br/>
                <el-form ref="form" :model="queryComment" label-width="80px">
                    <el-form-item label="评论内容">
                        <el-input type="textarea" v-model="queryComment.content"></el-input>
                    </el-form-item>
                    <el-button type="primary" @click="onSubmit">发表评论</el-button>
                </el-form>
                    <br/>
                        <h2>评论列表：</h2>
                    <br/>
                <div v-for="(item,i) in commentList" :key="i">
                    <div>
                        <div style="float:left">
                            <el-avatar class="header-img" :size="60" :src="item.avatar"></el-avatar>
                            <br/>
                            <span class="reply">{{item.nickname}}</span>
                        </div>
                        <div style="float:left">
                            <h3 class="reply" style="margin-left:70px;text-align:center">
                                {{item.content}}
                            </h3>
                        </div>
                        <div style="clear:both;"></div>
                   </div>
                   <el-divider></el-divider>
                </div>
                <el-pagination
                    background
                    @current-change="currentChange"
                    layout="prev, pager, next"
                    :page-size="size"
                    :total="total">
                </el-pagination>
            </div>
          </section>
        </article>
        <aside class="fl col-3">
          <div class="i-box">
            <div>
              <section class="c-infor-tabTitle c-tab-title">
                <a title href="javascript:void(0)">主讲讲师</a>
              </section>
              <section class="stud-act-list">
                <ul style="height: auto;">
                  <li>
                    <div class="u-face">
                      <a href="#">
                        <img :src="course.avatar" width="50" height="50" alt>
                      </a>
                    </div>
                    <section class="hLh30 txtOf">
                      <a class="c-333 fsize16 fl" href="#">{{course.teacherName}}</a>
                    </section>
                    <section class="hLh20 txtOf">
                      <span class="c-999">{{course.intro}}</span>
                    </section>
                  </li>
                </ul>
              </section>
            </div>
          </div>
        </aside>
        <div class="clear"></div>
      </div>
    </section>
    <!-- /课程详情 结束 -->
  </div>
</template>

<script>
import courseApi from '@/api/course'
import commentApi from '@/api/comment'
import ucenterApi from '@/api/ucenter'

export default {
    layout: 'vido',
    data(){
        return {
            course: {},
            chapterVideoTree: {},
            courseId: '',
            playAuth: '',
            queryComment: {},
            current: 1,
            size: 4,
            total: 0,
            commentList: [],
        }
    },
    created(){
        //获取并设置当前课程id
        this.courseId = this.$route.params.id
        //获取课程信息
        this.getCourseDetail()
        //分页查询评论列表
        this.queryPageComment()
        
        //获取并设置当前用户信息
        this.getUserInfo()
    },
    
    methods: {
        //查询url中courseId的课程信息
        getCourseDetail(){
            courseApi.getCourseDetail(this.courseId).then(response => {
                this.course = response.data.course
                this.chapterVideoTree = response.data.chapterVideoTree
            })
        },
        //获取课程下的评论
        queryPageComment(current = 1){
            this.current = current
            commentApi.queryPageComment(this.courseId,this.current,this.size).then(response => {
                this.commentList = response.data.list
                this.total = response.data.total
            })
        },
        //获取当前登录用户信息
        getUserInfo(){
            ucenterApi.getLoginInfo().then(response => {
                this.queryComment.memberId = response.data.items.id
                this.queryComment.nickname = response.data.items.nickname
                this.queryComment.avatar = response.data.items.avatar
                //设置queryComment 便于添加评论
                this.setQueryComment()
            })
        },
        //设置评论类
        setQueryComment(){
            this.queryComment.courseId = this.courseId
            this.queryComment.teacherId = this.course.teacherId
        },
        //发表评论
        onSubmit(){
            commentApi.addComment(this.queryComment).then(response => {
                console.log('--------评论成功-----');
                console.log(this.queryComment);
                this.$message.success('评论成功！')
                this.queryComment.content = ''
                this.queryPageComment()
            })
        },
        //评论翻页
        currentChange(current){
            this.queryPageComment(current)
        }
    }
};
</script>
