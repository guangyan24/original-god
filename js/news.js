// 轮播功能
(function () {
  var curIndex = 0; // 当前显示的是第几张图片
  var indicators = $('.news-banner-indicators'); // 指示器（圆圈）的容器
  var banner = $('.news-banner-links'); // 图片的容器

  /**
   * 根据：curIndex
   * 正确的设置图片容器的横向位置，以及对应的指示器的选中效果
   */
  function setActive() {
    // 设置图片容器向左移动的百分比，第0张图片向左移动0%，第1张图片向左移动100%，以此类推
    banner.style.transform = `translateX(-${curIndex}00%)`;
    // 找到之前被选中的指示器
    var active = $('.news-banner-indicators .active');
    if (active) {
      // 如果该指示器存在，移除它的选中效果
      active.classList.remove('active');
    }
    // 找到正确的指示器，选中它
    indicators.children[curIndex].classList.add('active');
  }

  // 最开始需要设置一次，保证图片位置和指示器是正确的
  setActive();

  // 遍历所有的指示器，注册点击事件，为避免由作用域和闭包问题，使用es6的let来定义循环变量
  for (let i = 0; i < indicators.children.length; i++) {
    // 为每个指示器注册点击事件
    indicators.children[i].onclick = function () {
      // 点击哪个指示器的序号，就把其序号设置到 curIndex中，表示即将展示对应序号的图片
      curIndex = i;
      setActive(); // 设置图片容器和指示器到正确的位置
    };
  }
})();

// 新闻区域功能
(async function () {
  // 远程获取所有新闻数据，数据格式见「news-data.json」
  // 由于从米哈游服务器获取这些新闻数据有些麻烦😂，这里使用的仍然是模拟的远程数据
  // 在实际开发中会从后端地址(公司会提供)获取数据
  var newsData = await fetch('./js/news-data.json').then((resp) => resp.json());
  // 获取新闻菜单栏容器
  var newsNav = $('.news-nav');
  // 获取新闻列表容器
  var newsList = $('.news-list');

  /**
   * 将新闻数据填充到新闻列表中
   * @param {Number} index 新闻版块的索引
   */
  function fillData(index) {
    // 找到并移除当前选中的板块样式
    var active = newsNav.querySelector('.active');
    if (active) {
      active.classList.remove('active');
    }
    // 设置新的选中的板块样式
    newsNav.children[index].classList.add('active');
    // 得到该板块的新闻数组
    var datas = newsData[index];
    // 准备一个字符串，用于拼接每条新闻形成的html字符串
    var html = '';
    // 使用es6的for-of循环遍历数组中的所有新闻
    for (var item of datas) {
      // 使用新闻对象item，生成对应的html，追加到字符串html中
      html += `<a href="${item.link}">
      <div class="news-title">${item.title}</div>
      <div class="news-date">${item.date}</div>
    </a>
      `;
    }
    // 将所有新闻形成的html重新设置给新闻列表
    newsList.innerHTML = html;
  }

  // 一开始，填充第一个板块的新闻
  fillData(0);

  // 遍历每个新闻板块，为其注册点击事件
  for (let i = 0; i < newsNav.children.length; i++) {
    // 给每个新闻版块注册点击事件
    newsNav.children[i].onclick = function () {
      fillData(i); // 点击的是第几个板块，就填充第几个板块的新闻
    };
  }
})();
