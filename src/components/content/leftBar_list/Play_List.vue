<template>
  <div class="back">
    <div class="sidebar_title">
      {{sidebar_title}}
    </div >
    <div v-if="user_playlist.length<=1" class="item">
      <div class="tip" >您还没有收藏歌单</div>
    </div>
    <div v-else class="item line"> </div>
      <div class="item">
       <p v-for="item in user_playlist.slice(1)">{{ item.name.trim() }}</p>
      </div>
  </div>
</template>

<script>

import {user_playlist,top_album} from "network/music";
import {reactive} from "vue";
import {useStore} from "vuex"

export default {
  name: "Play_List",
  data(){
    return{
      sidebar_title:'',
      //最近播放
      user_playlist:[],
      //推荐热歌
      recommend_list:{}
    }
  },
  methods:{
    getrecord(){
      if(this.$store.getters['user/getloginState']){
        this.sidebar_title='我的歌单'
        const id =this.$store.getters['user/getuserid']
        //获取最近播放 type=1 时只返回 weekData, type=0 时返回 allData
        user_playlist(id).then(result => {
          // console.log(this.$store)
          // console.log(result.data.playlist)
          this.user_playlist = result.data.playlist
          console.log(this.user_playlist)
        }).catch(error=>{
          console.log(error)
        })
      }else{
        //获取推荐歌曲
        this.sidebar_title = '近期热门'
      }
    }
  },
  mounted() {
    setTimeout(this.getrecord,500)

  }
}

</script>

<style scoped>
.back{
  height: 120px;
}
.item p{
  width: 145px ;
  height: 30px;
  line-height: 30px;
  color: var(--info_text);
  font-size: 8pt;
  font-weight: 400;
  font-family: var(--VamFont);
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap;
  text-align: left;
  transition: 0.2s cubic-bezier(0.2 ,0.4 ,.6, 0.8);
  margin: 0;
  padding-left: 20px;
}
.item p:hover{
  color: var(--Main_blue);
  transition: 0.2s cubic-bezier(0.2 ,0.4 ,.6, 0.8);
}
.line{
  margin-left: 20px;
  width: 145px;
  border-bottom: 1px solid var(--info_text);
  margin-bottom: 5px;
}
.tip{
  text-align: center;
  line-height: 200px;
  width: 100%;
  height: 200px;
  font-size: 10pt;
  color: rgb(50,50,50);
}
</style>
