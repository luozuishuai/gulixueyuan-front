(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{371:function(t,e,c){"use strict";var r=c(89);e.a={createOrder:function(t){return Object(r.a)({url:"/order/order/".concat(t),method:"get"})},getOrdersInfo:function(t){return Object(r.a)({url:"/order/order/info/".concat(t),method:"get"})},createWxPayQrCode:function(t){return Object(r.a)({url:"/order/wxPay/native/".concat(t),method:"get"})},queryWxPayStatus:function(t){return Object(r.a)({url:"/order/wxPay/queryPayStatus/".concat(t),method:"get"})}}},372:function(t,e,c){"use strict";var r=c(89);e.a={queryPageCourse:function(t,e,c){return Object(r.a)({url:"/edu/front/course/".concat(t,"/").concat(e),method:"post",data:c})},getSubjectTree:function(){return Object(r.a)({url:"/edu/subject",method:"get"})},getCourseDetail:function(t){return Object(r.a)({url:"/edu/front/course/".concat(t),method:"get"})},getPlayAuth:function(t){return Object(r.a)({url:"/edu/front/course/playVideo/".concat(t),method:"get"})}}},389:function(t,e,c){"use strict";c.r(e);var r=c(372),n=c(89),o=function(t,e,c){return Object(n.a)({url:"/edu/front/comment/".concat(t,"/").concat(e,"/").concat(c),method:"get"})},l=function(t){return Object(n.a)({url:"/edu/front/comment/addComment2",method:"post",data:t})},v=c(371),m={layout:"vido",data:function(){return{course:{},chapterVideoTree:{},courseId:"",playAuth:"",queryComment:{content:""},current:1,size:6,total:0,commentList:[],rules:{content:[{required:!0,message:"评论内容不能为空",trigger:"blur"}]}}},created:function(){this.courseId=this.$route.params.id,this.queryComment.courseId=this.courseId,this.getCourseDetail(),this.queryPageComment()},methods:{getCourseDetail:function(){var t=this;r.a.getCourseDetail(this.courseId).then((function(e){t.course=e.data.course,t.chapterVideoTree=e.data.chapterVideoTree,t.queryComment.teacherId=t.course.teacherId}))},queryPageComment:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1;this.current=e,o(this.courseId,this.current,this.size).then((function(e){t.commentList=e.data.list,t.total=e.data.total}))},onSubmit:function(){var t=this;this.$refs.form.validateField("content",(function(e){e||l(t.queryComment).then((function(e){console.log("--------评论成功-----"),console.log(t.queryComment),t.$message.success("评论成功！"),t.queryComment.content="",t.queryPageComment()}))}))},currentChange:function(t){this.queryPageComment(t)},replyComment:function(t,e){this.queryComment.parentId=t,this.queryComment.content="回复@".concat(e,"：")},replyReply:function(t,e){this.queryComment.content="回复@".concat(e,"：");for(var i=0;i<this.commentList.length;i++){var c=this.commentList[i];if(null!=c.children&&c.children.length>0)for(var r=0;r<c.children.length;r++){c.children[r].id==t&&(this.queryComment.parentId=this.commentList[i].id)}}},createOrder:function(){var t=this;v.a.createOrder(this.courseId).then((function(e){t.$router.push({path:"/orders/"+e.data.orderNo})}))}}},f=c(15),component=Object(f.a)(m,(function(){var t=this,e=t.$createElement,c=t._self._c||e;return c("div",{staticClass:"bg-fa of",attrs:{id:"aCoursesList"}},[c("section",{staticClass:"container"},[c("section",{staticClass:"path-wrap txtOf hLh30"},[c("a",{staticClass:"c-999 fsize14",attrs:{href:"/",title:""}},[t._v("首页")]),t._v("\n      \\\n      "),c("a",{staticClass:"c-999 fsize14",attrs:{href:"/course",title:""}},[t._v(t._s(t.course.subjectLevelOne))]),t._v("\n      \\\n      "),c("span",{staticClass:"c-333 fsize14"},[t._v(t._s(t.course.subjectLevelTwo))])]),t._v(" "),c("div",[c("article",{staticClass:"c-v-pic-wrap",staticStyle:{height:"357px"}},[c("section",{staticClass:"p-h-video-box",attrs:{id:"videoPlay"}},[c("img",{staticClass:"dis c-v-pic",attrs:{src:t.course.cover,height:"357px",alt:t.course.title}})])]),t._v(" "),c("aside",{staticClass:"c-attr-wrap"},[c("section",{staticClass:"ml20 mr15"},[c("h2",{staticClass:"hLh30 txtOf mt15"},[c("span",{staticClass:"c-fff fsize24"},[t._v(t._s(t.course.title))])]),t._v(" "),c("section",{staticClass:"c-attr-jg"},[c("span",{staticClass:"c-fff"},[t._v("价格：")]),t._v(" "),c("b",{staticClass:"c-yellow",staticStyle:{"font-size":"24px"}},[t._v(t._s(0==Number(t.course.price)?"免费":"￥"+t.course.price+"元"))])]),t._v(" "),c("section",{staticClass:"c-attr-mt c-attr-undis"},[c("span",{staticClass:"c-fff fsize14"},[t._v("主讲： "+t._s(t.course.teacherName)+"   ")])]),t._v(" "),t._m(0),t._v(" "),c("section",{staticClass:"c-attr-mt"},[c("a",{staticClass:"comm-btn c-btn-3",attrs:{href:"#",title:"立即观看"},on:{click:t.createOrder}},[t._v(t._s(0==Number(t.course.price)?"免费观看":"立即购买"))])])])]),t._v(" "),c("aside",{staticClass:"thr-attr-box"},[c("ol",{staticClass:"thr-attr-ol clearfix"},[c("li",[c("p",[t._v(" ")]),t._v(" "),c("aside",[c("span",{staticClass:"c-fff f-fM"},[t._v("购买数")]),t._v(" "),c("br"),t._v(" "),c("h6",{staticClass:"c-fff f-fM mt10"},[t._v(t._s(t.course.buyCount))])])]),t._v(" "),c("li",[c("p",[t._v(" ")]),t._v(" "),c("aside",[c("span",{staticClass:"c-fff f-fM"},[t._v("课时数")]),t._v(" "),c("br"),t._v(" "),c("h6",{staticClass:"c-fff f-fM mt10"},[t._v(t._s(t.course.lessonNum))])])]),t._v(" "),c("li",[c("p",[t._v(" ")]),t._v(" "),c("aside",[c("span",{staticClass:"c-fff f-fM"},[t._v("浏览数")]),t._v(" "),c("br"),t._v(" "),c("h6",{staticClass:"c-fff f-fM mt10"},[t._v(t._s(t.course.viewCount))])])])])]),t._v(" "),c("div",{staticClass:"clear"})]),t._v(" "),c("div",{staticClass:"mt20 c-infor-box"},[c("article",{staticClass:"fl col-7"},[c("section",{staticClass:"mr30"},[c("div",{staticClass:"i-box"},[t._m(1),t._v(" "),c("article",{staticClass:"ml10 mr10 pt20"},[c("div",[t._m(2),t._v(" "),c("div",{staticClass:"course-txt-body-wrap"},[c("section",{staticClass:"course-txt-body"},[c("p",{domProps:{innerHTML:t._s(t.course.description)}})])])]),t._v(" "),c("div",{staticClass:"mt50"},[t._m(3),t._v(" "),c("section",{staticClass:"mt20"},[c("div",{staticClass:"lh-menu-wrap"},[c("menu",{staticClass:"lh-menu mt10 mr10",attrs:{id:"lh-menu"}},[c("ul",t._l(t.chapterVideoTree,(function(e){return c("li",{key:e.id,staticClass:"lh-menu-stair"},[c("a",{staticClass:"current-1",attrs:{href:"javascript: void(0)",title:e.title}},[c("em",{staticClass:"lh-menu-i-1 icon18 mr10"}),t._v(t._s(e.title)+"\n                          ")]),t._v(" "),c("ol",{staticClass:"lh-menu-ol",staticStyle:{display:"block"}},t._l(e.children,(function(e){return c("li",{key:e.id,staticClass:"lh-menu-second ml30"},[c("a",{attrs:{href:"/player/"+e.videoSourceId,target:"_blank"}},[t._m(4,!0),t._v(" "),c("em",{staticClass:"lh-menu-i-2 icon16 mr5"},[t._v(" ")]),t._v(t._s(e.title)+"\n                              ")])])})),0)])})),0)])])])])]),t._v(" "),c("br"),t._v(" "),c("el-form",{ref:"form",attrs:{model:t.queryComment,rules:t.rules,"label-width":"80px"}},[c("el-form-item",{attrs:{label:"评论内容",prop:"content"}},[c("el-input",{attrs:{type:"textarea"},model:{value:t.queryComment.content,callback:function(e){t.$set(t.queryComment,"content",e)},expression:"queryComment.content"}})],1),t._v(" "),c("el-button",{attrs:{type:"primary"},on:{click:t.onSubmit}},[t._v("发表评论")])],1),t._v(" "),c("br"),t._v(" "),c("h2",[t._v("评论列表：")]),t._v(" "),c("br"),t._v(" "),t._l(t.commentList,(function(e,i){return c("div",{key:i},[c("div",[c("div",{staticStyle:{float:"left"}},[c("el-avatar",{staticClass:"header-img",attrs:{size:60,src:e.avatar}}),t._v(" "),c("br"),t._v(" "),c("span",{staticClass:"reply"},[t._v(t._s(e.nickname))])],1),t._v(" "),c("div",{staticStyle:{float:"left"}},[c("h3",{staticClass:"reply",staticStyle:{"margin-left":"70px","text-align":"center"}},[t._v("\n                              "+t._s(e.content)+"\n                          ")])]),t._v(" "),c("div",{staticStyle:{clear:"both"}}),t._v(" "),c("el-button",{staticStyle:{float:"right"},on:{click:function(c){return t.replyComment(e.id,e.nickname)}}},[t._v("\n                                  回复\n                              ")]),t._v(" "),c("div",{staticStyle:{clear:"both"}}),t._v(" "),t._l(e.children,(function(e,r){return c("div",{key:r},[c("div",{staticStyle:{"margin-left":"150px"}},[c("el-avatar",{staticClass:"header-img",attrs:{size:30,src:e.avatar}}),t._v(" "),c("br"),t._v(" "),c("span",{staticClass:"reply"},[t._v(t._s(e.nickname))])],1),t._v(" "),c("div",[c("h5",{staticClass:"reply",staticStyle:{"margin-left":"70px","text-align":"center"}},[t._v("\n                                      "+t._s(e.content)+"\n                              "),c("el-button",{staticStyle:{float:"right"},attrs:{size:"mini"},on:{click:function(c){return t.replyReply(e.id,e.nickname)}}},[t._v("\n                                  回复\n                              ")])],1)])])})),t._v(" "),c("br")],2),t._v(" "),c("el-divider")],1)})),t._v(" "),c("el-pagination",{attrs:{background:"",layout:"prev, pager, next","page-size":t.size,total:t.total},on:{"current-change":t.currentChange}})],2)])]),t._v(" "),c("aside",{staticClass:"fl col-3"},[c("div",{staticClass:"i-box"},[c("div",[t._m(5),t._v(" "),c("section",{staticClass:"stud-act-list"},[c("ul",{staticStyle:{height:"auto"}},[c("li",[c("div",{staticClass:"u-face"},[c("a",{attrs:{href:"#"}},[c("img",{attrs:{src:t.course.avatar,width:"50",height:"50",alt:""}})])]),t._v(" "),c("section",{staticClass:"hLh30 txtOf"},[c("a",{staticClass:"c-333 fsize16 fl",attrs:{href:"#"}},[t._v(t._s(t.course.teacherName))])]),t._v(" "),c("section",{staticClass:"hLh20 txtOf"},[c("span",{staticClass:"c-999"},[t._v(t._s(t.course.intro))])])])])])])])]),t._v(" "),c("div",{staticClass:"clear"})])])])}),[function(){var t=this.$createElement,e=this._self._c||t;return e("section",{staticClass:"c-attr-mt of"},[e("span",{staticClass:"ml10 vam"},[e("em",{staticClass:"icon18 scIcon"}),this._v(" "),e("a",{staticClass:"c-fff vam",attrs:{title:"收藏",href:"#"}},[this._v("收藏")])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("section",{staticClass:"c-infor-tabTitle c-tab-title",attrs:{id:"c-i-tabTitle"}},[e("a",{staticClass:"current",attrs:{name:"c-i",title:"课程详情"}},[this._v("课程详情")])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("h6",{staticClass:"c-i-content c-infor-title"},[e("span",[this._v("课程介绍")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("h6",{staticClass:"c-g-content c-infor-title"},[e("span",[this._v("课程大纲")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("span",{staticClass:"fr"},[e("i",{staticClass:"free-icon vam mr10"},[this._v("免费试听")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("section",{staticClass:"c-infor-tabTitle c-tab-title"},[e("a",{attrs:{title:"",href:"javascript:void(0)"}},[this._v("主讲讲师")])])}],!1,null,null,null);e.default=component.exports}}]);