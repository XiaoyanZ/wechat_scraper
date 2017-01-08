var fs = require('fs');
var Xray = require('x-ray');
var phantom = require('x-ray-phantom');

//first engine for scraping dynamically created data
var x = Xray({
	filters:{
		date_format: function(value){
		    var pattern = /(.*\){2})(.*)/g;
		    var date = "";
		    if(match = pattern.exec(value)){
		    	date = match[2];
		    }
		    return date;
		}
	}
}).driver(phantom({webSecurity:false})).delay(15000);

//second engine for scraping static data
var x2 = Xray({
	filters:{
		match: function(value,str){
			return value.trim() == str.trim()? value.trim() : null
		}
	}
}).timeout(10000).delay(15000);

var keywords = "广州";	//keywords for search engine
var url = "http://weixin.sogou.com/weixin?type=2&query=" + encodeURIComponent(keywords);
x(url, 'div.txt-box', [{
	article_title: 'h3@text',
	article_info: 'p.txt-info@text',
	article_url: 'h3 a@href',
	views: '.s1@text',
	account: 'a.account@text',
	date: 'span.s2@text | date_format',
	account_url: 'a.account@href'
}])
//callback function
(function(err,obj){
	console.log("-----------------------New Top Level Request--------------------------");
	var limit = obj.length;
	//scrape data from subpages of each article
	for(i = 0;i < limit; i++){
		(function(i){
			setTimeout(function(){
				var sub_url = "http://weixin.sogou.com/weixin?type=1&query=" + encodeURIComponent(obj[i].account);
				var obj_account = obj[i].account;
				x2(sub_url,'.news-box ul li:has(p.tit:contains('+ obj_account +'))',[{
					title: 'p.tit@text | match:' + obj_account,
					wechat: 'p.info@text',
					verified: "dl:contains('认证') dd@text",
				}])
				(function(err,sub_obj){
					console.log("----------------Iteration "+ i +" --------------------");
					obj[i].wechat_search = sub_obj;
					if(i == limit - 1){
						//output to file
						fs.writeFile("out.json", JSON.stringify(obj,null,2), function(err) {
						    if(err) {
						        return console.log(err);
						    }
						    console.log("The file was saved!");
						}); 
					}
				})
			},15000 * i);
		}(i));
	}
})
  .paginate('#sogou_next@href')
  .limit(1)
  // .write('results.json')
