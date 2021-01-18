const database = require('./config/database');

  const server = require('./config/server');
  
  (async()=>{
    server.configure();
    database.configureEvents();

		await database.connect();
    await server.start();
  })();