const express = require('express');
const app = express();
const path = require('path');
const indexRouter = require('./routes/index');

app.set('view engine', 'ejs');
app.use('/uploads', express.static('uploads'));
app.use('/', indexRouter);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
