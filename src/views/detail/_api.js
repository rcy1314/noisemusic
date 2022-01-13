import request from "@/utils/request";
// 获取歌手详情
export function getArtistDetail(params) {
  return request({
    url: `/artist/detail`,
    method: "get",
    params
  });
}

// 获取用户详情
export function getUserDetail(params) {
  return request({
    url: ` /user/detail`,
    method: "get",
    params
  });
}
// 获取精品歌单
export function getPlayListDetail(params) {
  return request({
    url: `/playlist/detail`,
    method: "get",
    params
  });
}
// 获取精品歌单
export function getAlbumDetail(params) {
  return request({
    url: `/album/detail`,
    method: "get",
    params
  });
}

// 获取歌单详情
export function getAlbum(params) {
  return request({
    url: `/album`,
    method: "get",
    params
  });
}
// 获取歌手热门50首
export function getArtistTopSong(params) {
  return request({
    url: `/artist/top/song`,
    method: "get",
    params
  });
}

// 获取歌手专辑
export function getArtistAlbum(params) {
  return request({
    url: `/artist/album`,
    method: "get",
    params
  });
}

// 获取歌手MV
export function getArtistMv(params) {
  return request({
    url: `/artist/mv`,
    method: "get",
    params
  });
}

