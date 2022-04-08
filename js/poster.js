// 海报区域的视频播放功能
(function () {
  // 获取海报区域的朦层
  var posterModal = $('.poster-modal');
  // 获取播放按钮
  var playBtn = $('.poster-play .poster-play-button');
  // 获取朦层内部的视频元素
  var video = $('.poster-modal video');

  // 当点击播放按钮时
  playBtn.onclick = function () {
    // 朦层显示
    posterModal.style.display = 'block';
    // 视频播放进度归零
    video.currentTime = 0;
    // 播放视频
    video.play();
  };

  // 当点击朦层时
  posterModal.onclick = function (e) {
    // 只要点击的不是视频元素（点击了视频元素以外的区域）
    if (e.target.tagName !== 'VIDEO') {
      // 朦层隐藏
      posterModal.style.display = 'none';
      // 视频停止播放
      video.pause();
    }
  };
})();
