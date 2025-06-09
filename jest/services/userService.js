export async function createUser(username,password){
	//imagine this connects to a real db
	const {insertId} = await Connection.promise().query(
		'insert into users (username,password) values ($1,$2)',[username,password]
	)
	return insertId; 
}
