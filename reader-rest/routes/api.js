var express = require('express');
var router = express.Router();
var read = require('node-readability');
var needle = require('needle');
var extractor = require('unfluff');
var url = require('url');

router.get('/' , function(req, res) {

var givenurl = req.query.url;

//needle.get(givenurl, function(error, response) {
 // if (!error && response.statusCode == 200){
  		 
        read(givenurl, function(err, article, meta) {
        var data = extractor.lazy(article.html , '');
         var img = data.image();
       	var content = null;

         var dom = article.document;
         var check = 0;
        
     //	var content = '<html><head><meta charset="utf-8"><title>'+dom.title+'</title></head><body><div><img src = ' + img + '> </div>' +article.content+'</body></html>';
   //  var content = '<html><head><meta charset="utf-8"><title>'+dom.title+'</title></head><body>' +article.content+'</body></html>';
     	 var images = dom.getElementsByTagName('IMG');
         for (var i = 0; i < images.length; ++i) {
         	var src = images[i].getAttribute('src');
         	console.log(src);
         	//src = url.resolve(givenurl, src);
           
           if(src == img){
           	var content = '<html><head><meta charset="utf-8"><title>'+dom.title+'</title></head><body>' +article.content+'</body></html>';
           	break;
             		} 
      		else{
      			check = check + 1;
      		}
		 }

		if(check == images.length){  
   			var content = '<html><head><meta charset="utf-8"><title>'+dom.title+'</title></head><body><div><img src = ' + img + '> </div>' +article.content+'</body></html>';
      		}
          		
   
          	 res.write(content);
         // Close article to clean up jsdom and prevent leaks
 		 article.close();
        });
// }
//});

});

module.exports = router;

