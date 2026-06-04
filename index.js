  let express =   require("express");  
  let multer =  require("multer");  
  let  path  = require("path"); 
  let  docxtopdf  =  require("docx-pdf");
  let port =  process.env.port || 4400;  
  let app  =  express();    

  app.use(express.static("uploads"));
 app.use(express.urlencoded({extended:true,})); 



 var   storage  =   multer.diskStorage({
      destination  :  function(req,file  ,cb) {
           cb(null ,"uploads");
      }  , 
      filename  :  function(req  ,file ,cb)  
      {
          cb(null  ,   Date.now()  +  path.extname(file.originalname));
      }
 });
 
 var  upload  =  multer({storage:storage});  

 app.get('/' , (req  ,res)=>  
    {
       res.sendFile(__dirname  +  "/index.html");
    });    

  app.post("/docxtopdf"  ,upload.single('file'), (req ,res)=>  
    {   
                       let  outputFilepath   = Date.now()   +  "output.pdf";   

          docxtopdf(req.file.path  ,  outputFilepath , (err,result)=>  {
                  if(err)   console.log(err);  
                  else 
                    {
                          res.download(outputFilepath);
                    }
          });

    });

    app.listen(port   , ()=>  
        {
         console.log("  le  serveur  est en ligne  au port",port);
        });

