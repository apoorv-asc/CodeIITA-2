var express=require('express');
var app=express();
app.set("view engine","ejs");
app.use(express.static('public'))

var bodyParser =require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));

var mysql      = require('mysql');
var db = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'iwp project trial'
});
db.connect();

var useris='';

const nodemailer = require("nodemailer");


// =============================
//        Authentication
// =============================


app.get('/signup',function(req,res){
    res.render("signup",{user:useris});
})

app.post("/signup",function(req,res){
    var u=req.body.password;
    var mail=req.body.email;
    var user={
        username:req.body.username,
        password:req.body.password,
        email:req.body.email,
        Avatar:req.body.avatar
    }
    mind=false;
    mind2=false;
    for(x=0;x<u.length;x++){
        if(!((u.charCodeAt(x)>=65 && u.charCodeAt(x)<=90) || (u.charCodeAt(x)>=97 && u.charCodeAt(x)<=122)))
        mind=true;
    }
    for(x=0;x<mail.length;x++){
        if(mail.charAt(x)=='@')
        mind2=true;
    }
    
    console.log(u.length);
    console.log((u.length)<(10));
    if(u.length>=10 && mind==false && mind==false ){
        res.redirect("/signup");
    }
    else{
    let sql="INSERT INTO users SET ?";
    db.query(sql,user,function(err){
        if(err)
            throw err;
        else{
            res.redirect("/signin");
        }
    })}
})

app.get("/signin",function(req,res){
    res.render("signin",{user:useris});
})

app.post("/signin",function(req,res){
    let sql="SELECT * FROM users WHERE username = \""+req.body.username+"\" and password = \""+req.body.password+"\"";
    db.query(sql,function(err,result){
        if(err)
        throw err;
        else{
            result.forEach((row)=>{
                useris=row.username;
                app.use(function(req,res,next){
                    res.locals.useris=useris;
                    next();
                })
                res.redirect("/");
            })
        }
    })
})

app.get("/signout",function(req,res){
    useris='';
    res.redirect("/");
})
// ===========================

app.get("/compare",function(req,res){
    res.render("compare",{user:useris});
})

app.get("/single_user",function(req,res){
    res.render("single_user",{user:useris});
})

app.get('/',function(req,res){
    res.render("home",{user:useris});
})

app.get('/superuser',function(req,res){
    res.render("form",{user:useris});
})

app.get('/tutorials',function(req,res){
    res.render("tutorials",{user:useris});
})

app.get("/superuser/tables",function(req,res){
    var nodejs="SELECT * FROM tutorials WHERE section='webdev-nodejs'";
    var data="SELECT * FROM tutorials WHERE section='data_structures'";
    var algo="SELECT * FROM tutorials WHERE section='algorithms'";
    db.query(nodejs,function(err,nodejs){
        db.query(data,function(err,data){
            db.query(algo,function(err,algo){
                res.render("tables",{nodejs:nodejs,data:data,algo:algo,user:useris});
            })
        })
    })
})

app.get("/edit_comments/:embedded",function(req,res){
    var sql="SELECT * FROM comments WHERE embedded=\""+req.params.embedded+"\"";
    db.query(sql,function(err,result){
        if(err)
            throw err
        else
            res.render("edit_comments",{user:useris,comments:result})
    })
})

app.get("/delete_comment/:id/:embedded",function(req,res){
    var sql="DELETE FROM comments WHERE id="+req.params.id;
    db.query(sql);
    res.redirect("/edit_comments/"+req.params.embedded);
})

app.get("/superuser/delete/:section/:id",function(req,res){
    let del="DELETE FROM tutorials WHERE section=\'"+req.params.section+"\' AND id=\'"+req.params.id+"\'";
    db.query(del);
    res.redirect("/superuser/tables");
})

app.post("/superuser/edit/:id",function(req,res){
    var tutorial={
        id:req.params.id,
        title:req.body.title,
        embedded:req.body.link,
        section:req.body.section,
        likes:req.body.likes
    }
    let sql="UPDATE tutorials SET ? WHERE id="+req.params.id;
    db.query(sql,tutorial,function(err){
        res.redirect("/superuser/tables");
    })
})

app.get("/superuser/edit/:section/:id",function(req,res){
    let tutorials="SELECT * FROM tutorials WHERE section=\'"+req.params.section+"\' AND id=\'"+req.params.id+"\'";
    db.query(tutorials,function(err,result){
        res.render("form_edit",{user:useris,tutorials:result});
    })
})


app.post('/superuser',function(req,res){
    let info;
    if(req.body.id==0){
        info={
            title:req.body.title,
            likes:0,
            embedded:req.body.link,
            section:req.body.section
        };    
    }
    else{
        info={
            id:req.body.id,
            title:req.body.title,
            likes:0,
            embedded:req.body.link,
            section:req.body.section
        };
    }
    let sql="INSERT INTO tutorials SET ?";
    db.query(sql,info,function(err){
        if(err)
            throw err;
        res.redirect('/superuser');
    })
})

app.get("/blogs/manage",function(req,res){
    if(useris!=''){
        let sql="SELECT * FROM blogs WHERE author=\""+useris+"\"";
        db.query(sql,function(err,result){
        res.render("manage_blogs",{blogs:result,user:useris});
    })
    }
    else{
        res.redirect("/blogs");
    }
})

app.get("/blog/delete/:id",function(req,res){
    let sql="DELETE FROM blogs WHERE id="+req.params.id;
    db.query(sql);
    res.redirect("/blogs/manage");
})


app.get("/blog/edit/:id",function(req,res){
    let sql="SELECT * FROM blogs WHERE id="+req.params.id;
    db.query(sql,function(err,result){
        Object.keys(result).forEach(function(key){
            var blog=result[key];
            if(blog.type=="link")
            res.render("blogs_edit_link",{user:useris,blog:result});
            else
            res.render("blogs_edit_written",{user:useris,blog:result});
        })
    })
})

app.post("/blogs/update/:id",function(req,res){
    var updated_blog;
    if(req.body.type=='written'){
    updated_blog={
        title:req.body.title,
        type:req.body.type,
        author:req.body.author,
        piclink:req.body.piclink,
        id:req.params.id,
        body:req.body.body,
        likes:req.body.likes,
        innerhtml:req.body.innerhtml
    }}
    else if(req.body.type=='link'){
        updated_blog={
        title:req.body.title,
        type:req.body.type,
        author:req.body.author,
        link:req.body.link,
        id:req.params.id,
        body:req.body.body,
        likes:req.body.likes
    }}
    let sql="UPDATE blogs SET ? WHERE id="+req.params.id;
    db.query(sql,updated_blog,function(err){
        if(err)
        throw err;
        else{
            res.redirect("/blogs");
        }
    })
})

app.get("/blogs/:id",function(req,res){
    let blog="SELECT * FROM blogs WHERE id="+req.params.id;
    db.query(blog,function(err,result){
        if(err)
            throw err;
        else{
            Object.keys(result).forEach(function(key){
                var blg=result[key];
                if(blg.type=="link")
                res.render("blogs_shown_t2",{blog:result,user:useris});
                else
                res.render("blogs_shown_t1",{blog:result,user:useris});
            })
        }
    })
})

app.get("/blogs/:id/like",function(req,res){
    let blog="SELECT * FROM blogs WHERE id="+req.params.id;
    db.query(blog,function(err,result){
        if(err)
        throw err;
        else{
            Object.keys(result).forEach(function(key){
                var blg=result[key];
                var like=Number(blg.likes)+1;
                let sql2="UPDATE blogs SET likes="+like+" WHERE id="+req.params.id;
                db.query(sql2);
            })
            res.redirect("/blogs/"+req.params.id);
        }
    })
})

app.get("/tutorials/:embedded/like",function(req,res){
    let tutorials="SELECT * FROM tutorials WHERE embedded= \""+req.params.embedded+"\"";
    db.query(tutorials,function(err,result){
        if(err)
        throw err;
        else{
            Object.keys(result).forEach(function(key){
                var tut=result[key];
                var like=Number(tut.likes)+1;
                let sql2="UPDATE tutorials SET likes="+like+" WHERE embedded= \""+req.params.embedded+"\"";
                db.query(sql2);
                res.redirect("/"+tut.section+"/"+req.params.embedded);
            })
        }
    })
})

app.get("/superuser_login",function(req,res){
    res.render("superuser_form",{user:useris});
})

app.get("/password_recovery",function(req,res){
    res.render("password_recovery",{user:useris});
})

app.post("/password_recovery",function(req,res){
    var sql="SELECT username, email FROM users WHERE username=\""+req.body.username+"\"";
    db.query(sql,function(err,user){
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'apoorvsingh1120@gmail.com',
              pass: 'cliffsofmoher'
            }
          });
          
          var mailOptions = {
            from: 'apoorvsingh1120@gmail.com',
            to: user[0].email,
            subject: 'CodeIITA - Password Recovery',
            html:'<h1>Link for mail recovery</h1><br><p>localhost:4200/new_password/'+user[0].username+"</p>"
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              res.redirect("/passsword_recovery");
            }
          });
    })
})

app.get("/new_password/:username",function(req,res){
    res.render("new_password",{user:useris,username:req.params.username});
})

app.post("/new_password/:username",function(req,res){
    var sql="UPDATE users SET password=\""+req.body.password+"\" WHERE username=\""+req.params.username+"\"";
    db.query(sql);
    res.redirect("/signin");
})

app.get("/upvote/:id/:likes/:section/:embedded",function(req,res){
    var likes=Number(req.params.likes)+1;
    var sql="UPDATE comments SET likes="+likes+" WHERE id="+req.params.id;
    db.query(sql,function(err){
        if(err)
            throw err;
        else
            res.redirect("/"+req.params.section+"/"+req.params.embedded);
    })
})

app.get('/:_section/:_embedded',function(req,res){
    let sql1="SELECT * FROM tutorials WHERE section=\""+req.params._section+"\" ORDER BY id ASC";
    let sql2="SELECT * FROM tutorials WHERE section=\""+req.params._section+"\" and embedded=\""+req.params._embedded+"\"";
    let sql3="SELECT * FROM comments WHERE embedded=\""+req.params._embedded+"\" ORDER BY likes DESC";
    db.query(sql1,function(err1,result1){
        if(err1)
            throw err1;
        else{
            db.query(sql2,function(err2,result2){
                if(err2)
                    throw err2;
                else{
                    db.query(sql3,function(err,result3){
                        if(err)
                            throw err;
                        else
                            res.render("video",{result1:result1,result2:result2,result3:result3,user:useris});
                    })
                }
            })
        }
    })
})

app.post("/post_comment/:section/:embedded",function(req,res){
    var cmt={
        comment:req.body.comment,
        author:useris,
        embedded:req.params.embedded,
        likes:0
    }
    var sql="INSERT INTO comments SET ?";
    db.query(sql,cmt,function(err){
        if(err)
            throw err;
        else
            res.redirect("/"+req.params.section+"/"+req.params.embedded);
    })
})

app.get("/blogs",function(req,res){
    let sql="SELECT * FROM blogs";
    db.query(sql,function(err,result){
        if(err)
            throw err;
        else
            res.render("blogs",{blogs:result,user:useris});
    })
})

app.get("/add_blogs",function(req,res){
    if(useris=='')
        res.redirect("/blogs");
    else
        res.render("new_blog",{user:useris});
})

app.post("/add_blogs",function(req,res){
    let blog;
    var datetime = new Date();
    if(req.body.type=="written"){
    blog={
        author:req.body.author,
        type:req.body.type,
        innerhtml:req.body.innerhtml,
        title:req.body.title,
        body:req.body.body,
        piclink:req.body.piclink,
        link:req.body.link,
        likes:0,
        intro:req.body.intro,
        date:datetime.toISOString().slice(0,10)
    }}
    else{
     blog={
        author:req.body.author,
        type:req.body.type,
        title:req.body.title,
        link:req.body.link,
        body:req.body.body,
        piclink:req.body.piclink,
        likes:0,
        intro:req.body.intro,
        date:datetime.toISOString().slice(0,10)
     }
    }
    let sql="INSERT INTO blogs SET ?";
    db.query(sql,blog,function(err){
        if(err)
            throw err;
        else{
            res.redirect("/add_blogs");
        }
    })
})


app.listen(4200,process.env.IP,function(req,res){
    console.log("See the majic on port 4200");
})