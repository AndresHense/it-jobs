const {Sequelize}=require('sequelize');

module.exports=new Sequelize('d6l91hsp1ur52b','ajscbdcwhgzuyq','f310a7210326ee9c97aaee994b072e4e2f1ab870dcbb6714b89f6e464a9678b3',{
	host: 'ec2-52-202-152-4.compute-1.amazonaws.com',
	dialect:'postgres',
	protocol:'postgres',
	dialectOptions:{
		ssl:{
			require:true,
			rejectUnauthorized:false
		}
	}
})


