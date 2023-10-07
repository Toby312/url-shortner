var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res, next)=> {
  res.sendFile(__dirname + '/index.html')
});

const originalUrls = []
const shortUrls = []

router.post('/api/shorturl', (req, res)=>{
  const url = req.body.url

 const foundIndex = originalUrls.indexOf(url)

if(!url.includes('https://') && !url.includes("http://")){
  res.json({error: 'invalid url'})
}

 if(foundIndex < 0){
  originalUrls.push(url)
  shortUrls.push(shortUrls.length)

  return res.json({
    original_url: url,
    short_url: shortUrls.length - 1
  })
 }

 return res.json({
  original_url: url,
  short_url: shortUrls[foundIndex]
 })
})

router.get("/api/shorturl/:shorturl", (req, res)=>{
  const shorturl = parseInt(req.params.shorturl)
  const foundIndex = shortUrls.indexOf(shorturl) 

  if( foundIndex < 0){
    return res.json({
      "error" : "No short URL found for the given input"
    })
  }
  res.redirect(originalUrls[foundIndex])
})
module.exports = router;
