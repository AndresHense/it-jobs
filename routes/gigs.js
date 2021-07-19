const express=require('express');
const router=express.Router();
const db=require('../config/database');
const Gig=require('../models/Gig');
const Sequelize=require('sequelize');
const Op=Sequelize.Op;
router.get('/add',(req,res)=>{
	res.render('add');
})

router.post('/add',(req,res)=>{
	let {title,technologies,budget,description,contact_email}=req.body;

	let errors=[];

	if(!title){errors.push({text: 'Please add a title'});}
	if(!technologies){errors.push({text: 'Please add some technologies'});}
	if(!description){errors.push({text: 'Please add a description'});}
	if(!contact_email){errors.push({text: 'Please add a contact email'});}

	//Check for errors
	if(errors.length>0){res.render('add',{
		errors,
		title,
		technologies,
		description,
		contact_email,
		budget
	})}else{
		if(!budget){
			budget='Unknown'
		}else{
			budget=`$${budget}`
		}
		technologies=technologies.toLowerCase().replace(/, /g, ',');
		Gig.create({
			title,
			technologies,
			budget,
			description,
			contact_email
		}).then(gig=>res.redirect('/gigs')).catch(err=>console.log(err));
	}
})

router.get('/search',(req,res)=>{
	let {term}=req.query;
	term=term.toLowerCase();
	Gig.findAll({where:{
		technologies:{
			[Op.like]:'%'+term+'%'
			}
		}
	}).then(gigs=>{
		const context={
				gigs:gigs.map(data=>{
					return{
						title:data.title,
						technologies:data.technologies,
						description:data.description,
						budget:data.budget,
						contact_email:data.contact_email
					}
				})
			}
			res.render('gigs',{
				gigs: context.gigs
			})

	})
})

router.get('/',(req,res)=>{
	Gig.findAll()
		.then(gigs=>{
			const context={
				gigs:gigs.map(data=>{
					return{
						title:data.title,
						technologies:data.technologies,
						description:data.description,
						budget:data.budget,
						contact_email:data.contact_email
					}
				})
			}
			res.render('gigs',{
				gigs: context.gigs
			})
		})
		.catch(err=>console.log(err))
});



module.exports=router;
