var express = require("express");
var router = express.Router();

const  credential = { //element de comparaison afin de voir si on l'envoit bien ce qu'il faut
    name : "user",
    email : "user@gmail.com",
    password : "user123"
}

// login user
router.post('/login', (req, res)=>{ //fonction decrivant les conditions de comparaisons
    if(req.body.email == credential.email && req.body.password == credential.password && req.body.name == credential.name){
        req.session.user = req.body.email;
        res.redirect('/route/dashboard');
        //res.end("Login Successful...!");
    }else{
        res.end("Invalid Username")
       // res.redirect('/route/error');
    }
});


// route for dashboard
router.get('/dashboard', (req, res) => {
    if(req.session.user){
        res.render('dashboard', {user : req.session.user})
    } else{
        res.redirect('/route/error')
        res.send("Unauthorize User")
   }
})

// route for logout
router.get('/logout', (req ,res)=>{
    req.session.destroy(function(err){
        if(err){
            console.log(err);
            res.send("Error")
        }else{
            res.render('base', { title: "Express", logout : "logout Successfully...!"})
        }
    })
})

module.exports = router;


