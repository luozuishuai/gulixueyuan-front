 <template>
    <div>
        <!-- 阿里云视频播放器样式 -->
        <link rel="stylesheet" href="https://g.alicdn.com/de/prismplayer/2.8.1/skins/default/aliplayer-min.css" >
        <!-- 阿里云视频播放器脚本 -->
        <script charset="utf-8" type="text/javascript" src="https://g.alicdn.com/de/prismplayer/2.8.1/aliplayer-min.js" />
        <!-- 定义播放器dom -->
        <div id="J_prismPlayer" class="prism-player" />
    </div>
</template>
<script>
import vodApi from '@/api/vod'

export default {
    // layout: 'video',
    data(){
        return {
            vid: '',
            playAuth:'',
        }
    },
    created(){
        this.vid = this.$route.params.vid
        this.playVideo(this.vid)
    },
    //页面渲染完成后
    mounted(){
    },
    methods: {
        //根据视频id，获取播放凭证
        playVideo(videoSourceId){
            vodApi.getPlayAuth(videoSourceId).then(response => {
                this.playAuth = response.data.playAuth
                //拿到播放凭证后再创建播放器！
                this.createPlayer()
            })
        },
        createPlayer(){
            return new Aliplayer({
                id: 'J_prismPlayer',
                encryptType: '1', // 如果播放加密视频，则需设置encryptType=1，非加密视频无需设置此项
                vid: this.vid, // 视频id
                playauth: this.playAuth, // 播放凭证
                width: '100%',
                height: '500px',
                //以下配置可选
                cover: 'http://guli.shop/photo/banner/1525939573202.jpg', // 封面
                qualitySort: 'asc', // 清晰度排序
                mediaType: 'video', // 返回音频还是视频
                autoplay: false, // 自动播放
                isLive: false, // 直播
                rePlay: false, // 循环播放
                preload: true, //提前缓冲
                controlBarVisibility: 'hover', // 控制条的显示方式：鼠标悬停
                useH5Prism: true, // 播放器类型：html5
            }) 
        },
    }
}
</script>
