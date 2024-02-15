const express = require('express');

const app = express();
const port = 3500;

app.use(express.json());
app.use('/api/v1/',require("./routes/app.router"));
app.listen(port,function(){
    console.log(`Server Started at port ${port}`);
});

