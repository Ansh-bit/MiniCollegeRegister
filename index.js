const express=require('express');

const port=8000;
const path=require('path');

const db=require('./config/mongoose');
const Contact=require('./models/contact');
const app=express();


app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));

var contactlist=[
    { name:"Ansh",
      phone:"123456",
      branch:"CSE",
      rollno:"10"},
      
      { name:"Anurag",
      phone:"223456",
      branch:"CSE",
      rollno:"11"}


    ]


app.get('/',function(req,res){
    Contact.find({},function(err,contacts){
        if(err){
            console.log('Error in fetching contact');
            return;
        }
    return res.render('home',{
      title:"my men",
      contact_list:contacts
    });
    });
});
app.post('/create-contact',function(req,res){
    // contactlist.push({
    //     name: req.body.name,
    //     phone: req.body.phone,
    //     branch: req.body.branch,
    //     rollno: req.body.rollno,
    // });
    Contact.create({
        name:req.body.name,
        phone:req.body.phone,
        branch:req.body.branch,
        rollno:req.body.rollno
    },function(err,newContact){
        if(err){console.log('error in creating contact');
    return;}
    console.log('******',newContact);
    return res.redirect('back');
    });

    //return res.render('/practice');
});
app.get('/delete-contact/',function(req,res){
    console.log(req.query);
    let id=req.query.id;
    Contact.findByIdAndDelete(id,function(err){
        if(err){
            console.log('error in deleting contact');
            return;
        }
        
    })
    // let contactIndex=contactlist.findIndex(contact => contact.phone==phone );
    // if(contactIndex!=-1){
    //     contactlist.splice(contactIndex,1);
    // }
     return res.redirect('/');
});




app.listen(port,function(err){
   if(err){
       console.log('Error bc',err);
   }
      else{
          console.log('express is running man!');
      }
});




