// 处理音乐
(function () {
  var bgmWind = $('#bgm-wind'); // 获取风声背景音乐audio元素
  var bgmMusic = $('#bgm-music'); // 获取钢琴背景音乐audio元素
  var musicIcon = $('.header-music'); // 获取音乐图标元素
  var isPlaying = true; // 当前是否正在播放音乐

  /**
   * 播放背景音乐
   */
  async function play() {
    try {
      bgmWind.currentTime = 0; // 设置风声背景音乐当前的播放进度为0
      bgmMusic.currentTime = 0; // 设置钢琴背景音乐当前的播放进度为0
      // 同时播放两个音乐
      await Promise.all([bgmWind.play(), bgmMusic.play()]);
      // 播放成功，移除图标的closed样式
      musicIcon.classList.remove('closed');
      isPlaying = true; // 标注正在播放
    } catch {
      stop(); // 任何一个音乐播放失败，全部停止
    }
  }

  /**
   * 停止播放音乐
   */
  function stop() {
    bgmWind.pause(); // 风声背景音乐停止
    bgmMusic.pause(); // 钢琴背景音乐停止
    musicIcon.classList.add('closed'); // 图标添加停止的样式
    isPlaying = false; // 标注已停止播放
  }

  play(); // 一开始自动播放（受浏览器策略影响，有可能会失败）

  musicIcon.onclick = function () {
    // 点击图标时，若当前在播放，则停止；反之则播放
    isPlaying ? stop() : play();
  };
})();

// 处理导航移动条
(function () {
  var headerNav = $('.header-nav'); // 导航栏
  var bar = $('.header-nav-bar'); // 导航条
  var active = $('.header-nav .active'); // 当前被选中的导航

  /**
   * 设置导航条的水平位置，将其放到某个元素上方
   * @param {HTMLElement} dom 某个元素，导航条会在其上方
   */
  function setBarPosition(dom) {
    bar.style.transform = `translateX(${dom.offsetLeft + 30}px)`;
  }

  /**
   * 让导航条停到当前选中的导航上方
   */
  function setActive() {
    setBarPosition(active);
  }

  // 当鼠标移入到导航栏时，需要设置导航条的位置
  headerNav.onmouseover = function (e) {
    if (e.target.tagName === 'A') {
      // 如果鼠标移动到了某个导航a元素上
      setBarPosition(e.target); // 设置导航条的位置到这个a元素上
    }
  };

  // 当鼠标离开导航栏时，需要将导航条归为到当前选中的导航上
  headerNav.onmouseleave = setActive;

  setActive(); // 最开始，将导航条归为到当前选中的导航上
})();

// 处理滚动条
(function () {
  var header = $('.header'); // 获取整个头部
  // 监听浏览器滚动
  window.addEventListener('scroll', function () {
    if (this.document.documentElement.scrollTop > 0) {
      // 如果滚动条离开了顶部，让头部的背景颜色变得更加 不 透明
      header.style.background = `rgba(17, 17, 17, 0.85)`;
    } else {
      // 如果滚动条没有离开顶部，让头部的背景颜色变成原本的透明度
      header.style.background = `rgba(17, 17, 17, 0.75)`;
    }
  });
})();
