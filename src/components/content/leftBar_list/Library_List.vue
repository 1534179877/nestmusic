<template>
  <div class="back">
    <div class="sidebar_title">
      Library
    </div>
    <div class="sideBar_btn" :class="[btn_now === 'recently'?active:before]" @click="sideBar_btn('recently')" >最近播放</div>
    <div class="sideBar_btn" :class="[btn_now === 'playlist'?active:before]" @click="sideBar_btn('playlist')">歌单广场</div>
  </div>
</template>

<script>
export default {
  name: "Library_list",
  data(){
    return{
      btn_now : false,
      active: 'sideBar_btn_AfterClick',
      before: 'sideBar_btn_beforeClick',
    }
  },
  methods:{
    //点击按钮切换Main页面
    sideBar_btn(btn){
      this.btn_now = btn;
      this.$router.push('/Home/'+ btn );
    }
  },
  watch:{
    '$route.path':function (newValue){
      this.btn_now = newValue.substring(6);
    }
  },
}
</script>

<style scoped>
.back{
  height: 120px;
}
</style>
