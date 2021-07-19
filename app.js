const express=require('express');
const exphbs=require('express-handlebars');
const path=require('path');


const sequelize=require('./config/database');

sequelize.authenticate()
.then(()=>console.log('Connection has been established successfully.'))
.catch(error=>console.log('Unable to connect to the database:', error))

const app=express();

app.engine('handlebars',exphbs({defaultLayout: 'main'}));
app.set('view engine','handlebars');

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(express.static(path.join(__dirname,'public')));

app.get('/',(req,res)=>{
	res.render('index',{layout:'landing'});
});

app.use('/gigs',require('./routes/gigs'));

const PORT=process.env.PORT || 5000;

app.listen(PORT,console.log(`Server started on port ${PORT}`));
