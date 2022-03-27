const connection = require('./config/mongoConnection');
const bands = require('./data/bands');
const albums= require('./data/albums');



async function main() {
	const db = await connection.connectToDb();
	await db.dropDatabase();

	let Leher = undefined;
	try {
		Leher = await bands.create(
			'Leher',
			['Old Bollywood', '90s Music', 'Classical'],
			'http://www.Leher.com',
			'Tseries',
			[
				'Alka Yagnik',
				'AR Rahman',
				'Lata Mangeshkar',
				'sonu Nigam',
				'Udit Narayan',
			],
			1983
		);
	} catch (e) {
		console.log(e);
	}
	let Leher2 = undefined;
	try {
		Leher2 = await bands.create(
			'Leher2',
			['Old Bollywood', '90s Music', 'Classical'],
			'http://www.Leher.com',
			'Tseries',
			[
				'Alka Yagnik',
				'AR Rahman',
				'Lata Mangeshkar',
				'sonu Nigam',
				'Udit Narayan',
			],
			1983
		);
	} catch (e) {
		console.log(e);
	}
	let Leher3 = undefined;
	try {
		Leher3 = await bands.create(
			'Leher3',
			['Old Bollywood', '90s Music', 'Classical'],
			'http://www.Leher.com',
			'Tseries',
			[
				'Alka Yagnik',
				'AR Rahman',
				'Lata Mangeshkar',
				'sonu Nigam',
				'Udit Narayan',
			],
			1983
		);
	} catch (e) {
		console.log(e);
	}

	let a1=undefined
	try{
		a1= await albums.create(
			"6228e4da3d2c6279902cc67a",
			"Wish You Were Here", 
			 "09/12/1975", 
			["Shine On You Crazy Diamond, Pts. 1-5", "Welcome to the Machine","Have a Cigar (Ft. Roy Harper)", "Wish You Were Here","Shine On You Crazy Diamond, Pts. 6-9"], 
			 5
		);
	}catch(e){
		console.log(e);
	}
	console.log('Done seeding database');

	await connection.closeConnection();
}

main();