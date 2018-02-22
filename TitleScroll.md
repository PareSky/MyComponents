
# 新建信息滚动栏
跑马灯效果，多条消息从下往上循环滚动

![滚动消息](./images/TitleScoll.png)

``` js
/*  eleObject: 容器
* messages: 消息数组
* params:
* 		duration: 翻滚速度（秒）
* 		hrefs: 消息对应的链接
* 		delay: 翻滚间隔
*/
	function initTitleScroll(eleObject, messages,params){
		var rounds = messages.length; // 滚动条数
		if (rounds==0) {return}
		var now = 1; //当前位置
		var ele = eleObject;
		params = typeof params =='undefined'? {} : params;
		var tran_dur = params.duration || '0.5s';
		var tran_time  = tran_dur.substr(0, tran_dur.length-1)*1000;
		var hrefs = params.hrefs || [];
		messages.unshift(messages[messages.length-1]);
		messages.push(messages[1]);
		hrefs.unshift(hrefs[hrefs.length-1]);
		hrefs.push(hrefs[1]);
		ele.empty();
		ele.addClass('title_scroll');
		var ul = document.createElement('ul');
		messages.forEach(function(item, index){
			var li = document.createElement('li');
			li.innerText = item;
			li.setAttribute('href',hrefs[index]);
			ul.appendChild(li);
		})
		ele.append(ul);
		var li = $('.title_scroll li');
		var curLi = li[now];
		ul.style.transform='translate(0, -' + curLi.offsetTop+'px)';
		setInterval(function(){
			if (now >= rounds+1) {
				now = 0;
				curLi = li[now];
				ul.style.transitionDuration = '0s';
				ul.style.transform='translate(0, 0)';
				a1=ul.offsetWidth;
				ul.style.transform='translate(0, -' + curLi.offsetTop+'px)';
				ul.style.transitionDuration = tran_dur;
				now++;
			}
			curLi = li[now];
			ul.style.transform='translate(0, -' + curLi.offsetTop+'px)';
			now++;
		},params.delay||3000)

	}
```
