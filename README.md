# wechat_scraper
A simple NodeJs data scraper for WeChat Official Account articles searched via Sogou Search Engine.

###Preparation
```sh
$ npm install x-ray
$ npm install x-ray-phantom
$ npm install fs
```
This application used [X-ray](https://github.com/lapwinglabs/x-ray) framework of NodeJS and its phantom-driver.

###Usage
```sh
var keywords = "广州";	//keywords for search engine
var url = "http://weixin.sogou.com/weixin?type=2&query=" + encodeURIComponent(keywords);
```
Users could change keywords in the line shown above.
After getting the html file of searching results for specific keywords, data filtered by tag will be scraped and stored.

###Sample Output
```sh
  {
    "article_title": "\n明星都来拍网剧了!陈乔恩《整容季》分饰两角\n",
    "article_info": "网剧《整容季》剧照陈乔恩网剧《整容季》剧照明道首部以整容为... 于3月14日在北京举办了首播会,制片人白成浩、主演马秋子等到...",
    "article_url": "http://mp.weixin.qq.com/s?src=3&timestamp=1483127527&ver=1&signature=jViUB99mOwNoqUl0sfJIiGg59GXQEQ*ri*HKkZxEhSOtEThaBrmQ27IQ1yA*a*tuc-Rh3NKK5hDP1-3glc1P5YcHfXmLQA4u47jP5x4PVdjYBVqtIN5fY7J3gS3TbzdeHXelYFMcH5IjaSzAPGDbmA==",
    "views": "1715",
    "account": "电视剧排行榜",
    "date": "2016-3-14",
    "account_url": "http://mp.weixin.qq.com/profile?src=3&timestamp=1483127527&ver=1&signature=m3NZ4QrGtpR4u-auEWuvXx1xfDzJqGQypQzLm-TxMR9dmL9f-TSYiJfL8ivlHEnWuSRYC7MePoWjUjXE7uGkYQ==",
    "wechat_search": [
      {
        "title": "电视剧排行榜",
        "wechat": "微信号：lxhdq16\n",
        "verified": "上海好动科技有限公司"
      },
      {
        "title": null,
        "wechat": "微信号：dsj365\n"
      }
    ]
  }
  ```



