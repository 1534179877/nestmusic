import {request} from 'network/Base_request';

// 获取评论相关
export function radio_hot(){
  return request({
    url:'/comment',
  })
}

// 获取音乐评论

//新版本
export function get_comment(id,type,sorttype,pageNo){
  /*if(type == 2){
    return request({
      url:'/comment/playlist?id='+id
    })
  }else{*/
  return request({
    url:'/comment/new?type='+type+'&id='+id+'&sortType='+sorttype+'&pageNo='+pageNo
  })
  //}

}
//评论点赞
export function commentlike(musicid,cid,like,ctype){
  return request({
    url:'/comment/like?id='+musicid+'&cid='+cid+'&t='+like+'&type='+ctype
  })
}

//子评论
export function get_child_comment(id,type,parentCommentId){
  return request({
    url:'/comment/floor?parentCommentId='+parentCommentId+'&id='+id+'&type='+type
  })
}

//发送评论
export function send_comment(id,content,t,type){
  return request({
    url:'/comment?t='+t+'&type='+type+'&id='+id+'&content='+content
  })
}