<template>
  <div class="list">

      <div class="pl">
        <div class="title">评论</div>
        <!--我的评论 -->
        <div class="mycomment">
          <div class="left">
            <a href=""><img :src="userHead" alt="" class="head"></a>
          </div>
          <div class="textcomment">
            <textarea  placeholder="发送一条友善的评论~" class="textinput"  rows="S" cols="80"  v-model="content"></textarea>
          </div>
          <button class="btn" @click="sendcomment(musicId,content,1,comtype)">评论</button>
        </div>
<!--        评论选择-->
        <div class="sort">
          <span @click="changsort(1)" :class="[sortType==1?active:'',sorttype]">推荐</span> |
          <span @click="changsort(2)" :class="[sortType==2?active:'',sorttype]">热度</span> |
          <span @click="changsort(3)" :class="[sortType==3?active:'',sorttype]">时间</span>|

        </div>
        <!-- 评论列表-->
        <comment v-for="(item,index) in commentsList"
                 :item="item"
                 :key="index"
                 :comtype="comtype"
                 :musicid="musicId"
        >
        </comment>
        <div class="page">
          <div>上一页</div>
          <div>下一页</div>
        </div>
      </div>

  </div>

</template>

<script>
import comment_item from "@/components/content/comment/comment_item";
import {get_comment ,send_comment}from "network/comment";
import {mapState} from "vuex";
export default {
name: "comment_List",
  components:{comment:comment_item},
  data(){
    return {
      sorttype:'sorttype',// class
      active:'active',
      UserHead:'',
      commentsList:[],
      content:'',
      sortType:1,
      pageNo:1

    }
  },
  props:{
   comtype:{
     type:Number
   },
    musicId:{
     type:Number
    }

  },
  computed:{
   ...mapState({
     userHead: state => state.user.userinfo.avatarUrl
   })
  },
  mounted() {
    this.loadComment(this.musicId,this.comtype,this.sortType,this.pageNo)
  },
  methods:{
    loadComment(id,type,sorttype,pageNo){
      get_comment(id,type,sorttype,pageNo).then(result => {
        console.log(result);
        if(result.data.data.comments){
          this.commentsList = result.data.data.comments;
        }else{
          console.log(result.data.data.comments);
        }
      })
    },
    //发送评论  t =1 发送  2回复 0 删除
    sendcomment(id,content,t,type){
      if(content !== ""){
        send_comment(id,content,t,type).then(() =>{
          alert('发送成功！');
          this.loadComment(this.musicId,this.comtype,this.sortType,this.pageNo);
        })
      }else{
        alert("输入评论");
      }
    },
    changsort(type){
      this.sortType = type;
      this.loadComment(this.musicId,this.comtype,this.sortType,this.pageNo);
    }
  },
  watch:{
    musicId:function (currentMusicID){
      //this.currentMusicID=currentMusicID
      this.loadComment(currentMusicID,this.comtype,this.sortType,this.pageNo)
    },



  }

}
</script>

<style scoped>
.head{
  width: 50px;
  height: 50px;
  margin: 5px;
  border-radius: 50%;
}
.left{
  width: 50px;
}
.mycomment{
  margin: 30px 0;
  height: 200px;
}
.textcomment{
  height: 120px;
}
.textinput{
  resize:none;
  width: 80%;
  height: 70%;
  margin-left: 10px;
  background:transparent;

}
.sort{

  float: right;
}
.sorttype{
  margin: 0 10px;
  cursor: pointer;

}
.sorttype:hover{
  color: red;
}
.btn{

}
.page{
  display: flex;
  justify-content:space-between;
}
.active{
  color: red;
}
</style>