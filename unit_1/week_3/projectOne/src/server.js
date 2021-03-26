const app = require('./app');

const port = 3004;
app.listen(port, () => {
  console.log(`Running on port ${port}...`);
});
