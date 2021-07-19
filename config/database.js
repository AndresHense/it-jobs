const {database,user,password,host}=require('./keys.js');
const {Sequelize}=require('sequelize');

module.exports=new Sequelize(database,user,password,{
	host:host,
	dialect:'postgres',
	protocol:'postgres',
	dialectOptions:{
		ssl:{
			require:true,
			rejectUnauthorized:false
		}
	}
})


