import {User} from '../../../models/usermodel'
import { Chats } from '../../../models/chatmodel';
import {hashPassword} from '../../../utilsServer/hash'
import { v4 as uuidv4 } from 'uuid';

export default async function handler(req, res){
	if(req.method ==='POST'){
		const data = req.body.username;
		const {username, password} = data;
		const regexUserName = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/;
		/* basic validation for inputs */
		if(!username || !password){
			return res.status(422).json({message:'Missing Input'});
		};
		/* basic validation for password */
		if(password.trim().length < 7 ){
			return res.status(422).json({message:'Invalid Input: password should also be at least 7 characters long.'});
		};
		/* basic validation for username */
		if (!regexUserName.test(username)){
			return res.status(422).json({message:'Invalid Input: username has invalid characters'});
		};
		/* checking for duplicate username */
		const duplicateUser = await User.findOne({username:username},(err, duplicateUser)=>{
			if(duplicateUser){return duplicateUser} else if(!duplicateUser){return null}
		});
		if (duplicateUser){
			return res.status(422).json({message:'Username already taken.'});
		};
		/* hashing password and registering user */
		const hashedPassword = await hashPassword(password);
		try{
			const chatID = uuidv4();
			const user = await new User({
				isAdmin: false,
				username: username, 
				password: hashedPassword, 
				chats:[ 
					{chatID:chatID}
				],
				commissions:[]
			});
			await User.insertMany(user);

			/* updating admin chats everytime a user is registered */
			await User.findOneAndUpdate({username:process.env.ADMIN_USERNAME},{ 
				$push: { 
					"chats": {
						$each:[{chatID: chatID, client:username, seen:false}],
						$position:0
					}
				}
			});

			/* adding a new chat */
			const userChat = await new Chats({
				chatID: chatID,
				client: username,
				chatUsers: [username, process.env.ADMIN_USERNAME],
				messages: []
			});
			await Chats.insertMany(userChat);
			return res.status(201).json({message:'Successfully signed up'});
		}
		catch (error) {
			console.error(error);
			return res.status(500).send(`Server error`);
		};
	};
}