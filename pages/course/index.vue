<template>
  <div id="aCoursesList" class="bg-fa of">
    <!-- /课程列表 开始 -->
    <section class="container">
      <header class="comm-title">
        <h2 class="fl tac">
          <span class="c-333">全部课程</span>
        </h2>
      </header>
      <section class="c-sort-box">
        <section class="c-s-dl">
          <dl>
            <dt>
              <span class="c-999 fsize14">课程类别</span>
            </dt>
            <dd class="c-s-dl-li">
              <ul class="clearfix">
                <li>
                  <a title="全部" href="javascript:void(0);" @click.prevent="getAllCourse()" :class="{active:oneIndex==-1}">全部</a>
                </li>
                <li v-for="(subject,index) in subjectTree" :key="index">
                  <a :title="subject.title" href="javascript:void(0);" @click.prevent="changeSubjectOne(subject.id,index)" :class="{active :oneIndex==index}">{{subject.title}}</a>
                </li>
                
              </ul>
            </dd>
          </dl>
          <dl>
            <dt>
              <span class="c-999 fsize14"></span>
            </dt>
            <dd class="c-s-dl-li">
              <ul class="clearfix">
                <li v-for="(item,index) in subjectTwoList" :key="index" >
                  <a :title="item.title" href="javascript:void(0);"  @click.prevent="changeSubjectTwo(item.id,index)" :class="{active:twoIndex==index}">{{item.title}}</a>
                </li>
              </ul>
            </dd>
          </dl>
          <div class="clear"></div>
        </section>
        <div class="js-wrap">
          <section class="fr">
            <span class="c-ccc">
              <i class="c-master f-fM">1</i>/
              <i class="c-666 f-fM">1</i>
            </span>
          </section>
          <section class="fl">
            <ol class="js-tap clearfix">
              <li :class="{'current bg-orange':queryCourseVo.viewCountSort == '1'}">
                <a title="关注度" href="javascript:void(0);" @click.prevent="sortByViewCount()">关注度&nbsp;
                  <span :class="{'hide':queryCourseVo.viewCountSort != '1'}">↓</span>
                  </a>
              </li>
              <li  :class="{'current bg-orange':queryCourseVo.gmtCreateSort == '1'}">
                <a title="最新" href="javascript:void(0);" @click.prevent="sortByGtmCreate()">最新&nbsp;
                  <span :class="{'hide':queryCourseVo.gmtCreateSort != '1'}">↓</span>
                  </a>
              </li>
              <li :class="{'current bg-orange':queryCourseVo.priceSort == '1'}">
                <a title="价格" href="javascript:void(0);" @click.prevent="sortByPrice()">价格&nbsp;
                  <span :class="{'hide':queryCourseVo.priceSort != '1'}">↓</span>
                </a>
              </li>
            </ol>
          </section>
        </div>
        <div class="mt40">
          <!-- /无数据提示 开始-->
          <section class="no-data-wrap" v-if="data.total == 0">
            <em class="icon30 no-data-ico">&nbsp;</em>
            <span class="c-666 fsize14 ml10 vam">没有相关数据，小编正在努力整理中...</span>
          </section>
          <!-- /无数据提示 结束-->
          <article class="comm-course-list">
            <ul class="of" id="bna" v-if="data.total != 0">
              <li v-for="course in data.courseList" :key="course.id" >
                <div class="cc-l-wrap">
                  <section class="course-img">
                    <img :src="course.cover" class="img-responsive" :alt="course.title">
                    <div class="cc-mask">
                      <a :href="'/course/'+course.id" title="开始学习" class="comm-btn c-btn-1">开始学习</a>
                    </div>
                  </section>
                  <h3 class="hLh30 txtOf mt10">
                    <a :href="'/course/'+course.id" :title="course.title" class="course-title fsize18 c-333">{{course.title}}</a>
                  </h3>
                  <section class="mt10 hLh20 of">
                    <span class="fr jgTag bg-green">
                      <i class="c-fff fsize12 f-fA">{{course.price == 0 ? '免费':course.price+'元'}}</i>
                    </span>
                    <span class="fl jgAttr c-ccc f-fA">
                      <i class="c-999 f-fA">{{course.viewCount}}人浏览</i>
                      |
                      <i class="c-999 f-fA">{{course.buyCount}}人购买</i>
                    </span>
                  </section>
                </div>
              </li>

            </ul>
            <div class="clear"></div>
          </article>
        </div>
<!-- 公共分页 开始 -->
      <div>
        <div class="paging">
          <!-- undisable这个class是否存在，取决于数据属性hasPrevious -->
          <a
            :class="{undisable: !data.hasPrevious}"
            href="#"
            title="首页"
            @click.prevent="gotoPage(1)">首页</a>

          <a
            v-if="data.hasPrevious"
            :class="{undisable: !data.hasPrevious}"
            href="#"
            title="前一页"
            @click.prevent="gotoPage(data.current-1)">&lt;</a>

          <a
            v-for="page in data.pages"
            :key="page"
            :class="{current: data.current == page, undisable: data.current == page}"
            :title="'第'+page+'页'"
            href="#"
            @click.prevent="gotoPage(page)">{{ page }}</a>

          <a
            v-if="data.hasNext"
            :class="{undisable: !data.hasNext}"
            href="#"
            title="后一页"
            @click.prevent="gotoPage(data.current+1)">&gt;</a>

          <a
            :class="{undisable: !data.hasNext}"
            href="#"
            title="末页"
            @click.prevent="gotoPage(data.pages)">末页</a>

          <div class="clear"/>
        </div>
      </div>
      <!-- 公共分页 结束 -->
      </section>
    </section>
    <!-- /课程列表 结束 -->
  </div>
</template>
<script>
import courseApi from '@/api/course'

export default {
    data(){
        return {
            current: 1,
            size: 8,
            queryCourseVo: {},
            data: {},
            subjectTree: [],
            subjectTwoList:[],
            oneIndex: -1,
            twoIndex: -1,
            viewCountSort: "",
            gmtCreateSort: "",
            priceSort: "",
        }
    },
    created(){
        this.getSubjectTree()
        this.gotoPage()
    },
    methods: {
        //点击一级分类，查询出其对应的二级分类列表
        changeSubjectOne(subjectOneId,index){
            //将一级分类id赋值给查询条件中的subjectOneId
            this.queryCourseVo.subjectOneId = subjectOneId
            //将选中的index值赋值给oneIndex
            this.oneIndex = index
            //清空二级分类列表
            this.subjectTwoList = []
            //清空查询条件中的二级分类id
            this.queryCourseVo.subjectTwoId = ""
            //清空当前二级分类索引值
            this.twoIndex = -1
            //找到一级分类下的二级分类列表，赋值给subjectTwoList
            for(var i=0; i<this.subjectTree.length; i++){
                if(subjectOneId == this.subjectTree[i].id){
                    this.subjectTwoList = this.subjectTree[i].children
                    console.log(this.subjectTwoList);
                }
            }
            //查询一级分类下的所有课程
            this.gotoPage()
        },
        //查询二级分类
        changeSubjectTwo(subjectTwoId,index){
            this.twoIndex = index
            this.queryCourseVo.subjectTwoId = subjectTwoId
            //查询一级二级分类下的所有课程
            this.gotoPage()
        },
        //获取一级二级分类树形菜单
        getSubjectTree(){
            courseApi.getSubjectTree().then(response => {
                this.subjectTree = response.data.rows
            })
        },
        gotoPage(current = 1){
            this.current = current
            //调用api按条件查询课程列表
            courseApi.queryPageCourse(this.current,this.size,this.queryCourseVo)
                .then(response => {
                    this.data = response.data.result
                })
        },
        //按浏览量排序
        sortByViewCount(){
            this.queryCourseVo.viewCountSort = '1'
            this.queryCourseVo.gmtCreateSort = ''
            this.queryCourseVo.priceSort = ''
            this.gotoPage()
        },
        //按创建时间排序
        sortByGtmCreate(){
            this.queryCourseVo.viewCountSort = ''
            this.queryCourseVo.gmtCreateSort = '1'
            this.queryCourseVo.priceSort = ''
            this.gotoPage()
        },
        //按价格排序
        sortByPrice(){
            this.queryCourseVo.viewCountSort = ''
            this.queryCourseVo.gmtCreateSort = ''
            this.queryCourseVo.priceSort = '1'
            this.gotoPage()
        },
        getAllCourse(){
            this.queryCourseVo = {}
            // this.queryCourseVo.subjectOneId = ''
            // this.queryCourseVo.subjectTwoId = ''
            this.subjectTwoList = []
            this.oneIndex = -1
            this.twoIndex = -1
            this.gotoPage()
        },
    }
};
</script>
<style scoped>
  .active {
    background: #68CB9B;
    color: #fff;
  }
  .hide {
    display: none;
  }
  .show {
    display: block;
  }
</style>