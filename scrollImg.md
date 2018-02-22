# 横向滑动的图片组

``` js
/*
* eleObject 目标dom对象
items = [{
	imgUrl, //图片地址
	hrefUrl, //跳转地址
	title  //标题
	}]
* 
*/
define(function(require, exports, module){
	var HIscroll = require("hIscroll");


	var scrollImg = function(eleObject, items){
		console.log('scrollImg');
		var ele = $(eleObject);
		ele.empty();
		ele.addClass('elastic');
		var iscroller = document.createElement('div');
		iscroller.className = 'iscroller';
		var ul = document.createElement('ul');
		items.forEach(function(item, index){
			var li = document.createElement('li');
			li.innerHTML = "<img src='"+item.imgUrl+"'><div class='title'>"+(item.title||'')+"</div>";
			if (item.hrefUrl) {
				li.setAttribute('url',item.hrefUrl);
				$.bindEvent($(li),function(){
					window.open(li.getAttribute('url'));
				})
			}
			ul.appendChild(li);
		})
		iscroller.appendChild(ul);
		ele.append(iscroller);

		lis = ele.find('li');
		
		$.bindEvent(lis.find('img'),function(){
			var imgWitdth = $(this).css('width');
			console.log('imgWitdth',imgWitdth)
			$(this).parent().css('width',imgWitdth)
		},'load')

		var config = {
            wrapper: ele, //wrapper对象
            scroller: ele, //scroller对象
        };

		myScroll = new HIscroll(config);

        return myScroll;
	}

	//暴露对外的接口
	module.exports = scrollImg;
})
```
