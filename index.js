const { compile } = require("./compile");
compile()
.then(res => console.log(res))
.catch(err => console.error(err));