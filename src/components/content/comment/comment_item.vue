<template>
  <div class="container">
    <div class="left">
      <a href="">
        <img :src="item.user.avatarUrl" class="head">
      </a>
    </div>
    <div class="right">
      <div class="info">
        <div class="infoup">
          <a href="" class="userName">{{ item.user.nickname }}</a>
          <div class="infoupleft">
            <p :class="[like ? activeClass : '', iconfont2, iconliked]"
               @click="likeclicked(musicID,item.commentId,like,comtype)"
            ></p>
            <p class="com_likecont">{{ count }}</p>
          </div>

        </div >
        <div class="infodown">
          <p class="com_time">{{ timeDateTrans(item.time) }}</p>
          <span class="com_time" @click="showchild()">回复</span>
          <!--          <span class="com_time" v-show="UserId === item.user.userId">删除</span>-->
        </div>

      </div>
      <div class="content">
        <p class="com_content">{{  item.content }}</p>
      </div>
      <!--      <p href="" @click="childshow = !childshow">{{}}:条回复</p>-->
      <div class="childbox" v-show="showchildcom">
        <comment_item v-for="(childitem,index) in childlist"
                      :key="index"
                      :musicid="item.commentId"
                      :item="childitem"></comment_item>
      </div>

    </div>
  </div>
</template>

<script>
import {commentlike ,get_child_comment} from "network/comment";
import {mapState} from "vuex";
import {timeDateTrans} from "@/utils/tools";

export default {

  name: "comment_item",
  data(){
    return{
      showchildcom:false,
      iconfont2: 'iconfont',
      iconliked: 'Player-icon-randommdpi',
      activeClass: 'like',
      like :this.item.liked,
      count : this.item.likedCount,
      ismycomment:false,

      childlist:[]
    }
  },
  props:{
    item:{
      type:Object,

    },
    comtype: {
      type:Number  //资源种类
    },
    musicid:{
      type:Number   //资源id
    }
  },
  computed:{
    ...mapState({
      musicID:state => state.musicplay.musicID,
      UserId:state => state.user.userInfo.userId
    })
  },
  mounted() {
    this.getchildcomment(this.musicid,this.comtype,this.item.commentId);
  },
  watch:{
    item :function (newitem){
      this.like = newitem.liked;
      this.count = newitem.likedCount;
      this.getchildcomment(this.musicid,this.comtype,this.item.commentId);
    },


  },
  methods:{
    timeDateTrans(time){
      return timeDateTrans(time);
    },
    likeclicked(musicID,cid,t,type){
      let isliked ; // 通过t判断点击触发类型 0 为取消 1为点赞
      if(t){
        isliked = 0;
      }else {
        isliked = 1;
      }
      commentlike(musicID,cid,isliked,type).then((result)=>{
        if(result.statusText == 'OK'){
          this.like = !this.like;
          if(this.like) this.count++;
          else this.count --;
        }

      });

    },
    getchildcomment(id,type,parentCommentId){
      get_child_comment(id,type,parentCommentId).then((result)=>{
        if(result.data.data.comments != undefined){
          this.childlist = result.data.data.comments;
        }
        console.log(result);
      })
    },
    showchild(){
      //this.getchildcomment(this.musicid,this.comtype,this.item.commentId);
      this.showchildcom = !this.showchildcom;

    }


  }
}
</script>

<style scoped>
.container{

  width: 100%;
  height: 100%;
  display: flex;
  border-bottom: #666666 solid 1px;
  margin-top: 8px;

}
.left{
  width: 50px;
}
.right{

  width: 100%;
}
.head{
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.info{
  margin-left: 20px;
}
.infoup {
  display: flex;
  justify-content:space-between;
}
.infodown{
  font-size: 10px;
  display: flex;
  justify-content:flex-start;
}
.userName{
  text-decoration:none;

}
.infoupleft{
  display: flex;
}
.com_likecont{
  margin: 0 10px;

  line-height: 50px;
}
.com_time{
  margin: 0 10px 0 0;

}
.com_time:last-child{
  color: blue;

}
.com_time:last-child:hover{
  cursor: pointer;
}
.content{
  margin: 20px;
  text-align:left;
}
.like{
  color: red;
}
</style>