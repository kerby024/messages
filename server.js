const express = require('express');
const app = express();
const port = 8000;
const bp = require('body-parser');
const path = require('path');
const session = require('express-session');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/messaging')
var UserSchema = new mongoose.Schema({
    name: {type: String, required: true, minlength: 3},
    message: {type: String, required: true, minlength: 5}},
    {timestamps: true});
// var Schema = mongoose.Schema;
mongoose.model('User', UserSchema);
var User = mongoose.model('User');
app.use(bp.urlencoded());
app.use(session({secret: 'keyboard cat'}));
app.use(express.static(path.join(__dirname,'/views')));
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

app.get('/', function(req, res){
    User.find({}, function(err, users){
        if(err){
            res.redirect('/')
        }
        else{
            res.render('index', {users:users})
        }
    })
})
app.post('/add', function(req, res){
    var user = new User({name: req.body.name, message: req.body.quote})
    user.save(function(err){
        if(err){
            console.log('WRONG')
            res.redirect('/')
        }
        else {
            console.log('RIGHT')
            User.find({}, function(err, users){
                if(err){
                    console.log('WRONG')
                    res.redirect('/')
                }
                else {
                    console.log('RIGHT')
                    res.redirect('/')
                }
            })
        }
    })
})

app.listen(port, function(){
    console.log('listening')
})