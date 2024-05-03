// 等待DOM加载完毕
document.addEventListener('DOMContentLoaded', function() {
  // 获取所有包含图片的链接
  const imageLinks = document.querySelectorAll('a.reference.external');

  // 为每个链接添加事件监听器
  imageLinks.forEach(link => {
    // 只有当链接的href包含图片扩展名时才应用预览
    if (
	  link.href.startsWith('https://cards.scryfall.io/')
	  || link.href.startsWith('http://gatherer.wizards.com/Handlers/Image.ashx')
	  || ( /\.(jpe?g|png|gif)$/i.test(link.href) )
	) {
      // 创建图片预览容器
      const preview = document.createElement('div');
      preview.className = 'image-preview';

      // 创建图片元素并设置src
      const img = document.createElement('img');
      img.src = link.href;

      // 将图片添加到预览容器中
      preview.appendChild(img);

      // 将预览容器添加到DOM中，紧跟在链接后面
      link.insertAdjacentElement('afterend', preview);

      // 为链接添加事件监听器，以显示/隐藏预览
      link.addEventListener('mouseover', function() {
        preview.style.display = 'inline-block';
      });
      link.addEventListener('mouseout', function() {
        preview.style.display = 'none';
      });
      
      // 为链接添加点击事件监听器，以显示图片预览
      link.addEventListener('click', function(event) {
        event.preventDefault(); // 阻止默认的链接跳转行为
        preview.style.display = 'inline-block';
      });

      // 为文档添加点击事件监听器，以隐藏图片预览
      document.addEventListener('click', function(event) {
        if (!preview.contains(event.target) && event.target !== link) {
          preview.style.display = 'none';
        }
      });
    }
  });
});