<template>
 <audio  preload="auto"
         onload="onloading()"
         @timeupdate="getCurrentTime($event)"
        :autoplay="false"
        :src="url"
        ref="audio"
        @error="audioError"
        @loadedmetadata="onloadedmetadata($event)"
        @ended="onended()"
 > </audio>
</template>
<script>
import {mapState} from 'vuex'
export default {
  name: "AudioPlay",
  data(){
    return{
      url:''
    }
  },
  computed:{
    ...mapState({
      isPlay:state => state.musicplay.isPlay,
      musicUrl:state => state.musicplay.musicUrl,
      updateProgress:state => state.musicplay.progress,
      updateVolume:state => state.musicplay.volume
    })
  },
  watch:{
    isPlay(state){
      this.handlePlay(state)
    },
    updateProgress(progress){
      this.updateTime(progress)
    },
    updateVolume(index){
      this.updatevolume(index)
    },
    musicUrl(index){
      // console.log("新UEL"+OLDVALUE);
       console.log(index);
      this.url = index
    }
},
  methods:{
    handlePlay(state){
      state?this.audioPlay():this.audioPause();
    },
    onloading(){
      this.$msgbox.msgbox('加载中','success')
    },
    audioPlay(){
      this.$refs.audio.play()
    },
    audioPause(){
      this.$refs.audio.pause()
    },
    getCurrentTime(e){
        this.$store.commit('musicplay/setcurrentTime', parseInt(e.target.currentTime))
    },
    updateTime(progress){
      this.$refs.audio.currentTime = progress/100 * this.$refs.audio.duration
    },
    audioError(){
      this.$msgbox.msgbox('资源加载出错','success')
    },
    onloadedmetadata(e){
      this.$store.commit('musicplay/setMaxTime', parseInt(e.target.duration))

    },
    updatevolume(index){
      index=index<0?0:index>1?1:index
      this.$refs.audio.volume = index
    },
    onended(){
      this.$audio.pause()

    }
  },
  mounted() {
    this.url = this.musicUrl
    this.$audio.setVolume(1)
  }
}
</script>

<style scoped>

</style>
