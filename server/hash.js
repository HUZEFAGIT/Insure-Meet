const bcrypt2 = require('bcrypt');
bcrypt2.hash('admin', 10).then(console.log);