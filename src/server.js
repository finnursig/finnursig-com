import express from 'express';
import compression from 'compression';
import appRoute from 'server/routes/appRoute';

const app = express();
const env = process.env.NODE_ENV || 'development';
const port = process.env.PORT || 5000;

app.locals.env = env;

app.use(compression());
app.use(express.static('dist/public'));
app.use(express.static('public'));
app.set('views', './src/server/views');
app.set('view engine', 'ejs');
app.get('*', appRoute);

app.listen(port, (err) => {
  if (err) {
    console.log(err);
    return;
  }

  console.log(`Listening at http://localhost:${port}`);
});
