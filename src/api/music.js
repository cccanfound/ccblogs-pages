import request from "@/utils/request";

export const querySinger = (singerName) => request.post('/api/v1/pri/music/querySinger', {
  'singer_name': singerName,
  'count': 20
})

export const coverUpload = (file, config) => request.post('/api/v1/pri/music/uploadCoverImg', file, config)

export const musicUpload = (file, config) => request.post('/api/v1/pri/music/musicUpload', file, config)

export const imgDelete = (filePath,id) => request.post('/api/v1/pri/music/deleteImg', {
  'filepath': filePath,
  'id': id

})

export const mergeMusicInfo = (formData) => request.post('/api/v1/pri/music/mergeMusicInfo', {
  'id': formData.id,
  'musicName': formData.musicName,
  'singerId': formData.singerId,
  'describe': formData.describe,
  'musicImg': formData.imgUrl,
  'musicUrl': formData.musicUrl,
  'lyricUrl': formData.lyricUrl
})

export const queryMusicList = (searchInfo) => request.post('/api/v1/pri/music/queryMusicList', {
  'searchInfo': searchInfo,
  'count': 20
})

export const querySingleMusic = (musicId) => request.post('/api/v1/pri/music/querySingleMusic', {
  'musicId': musicId
})




