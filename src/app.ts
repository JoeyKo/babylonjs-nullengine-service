import express from 'express'
import * as path from 'path';
import indexRouter from './routes/index';
import modelRouter from './routes/model';

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use('/', indexRouter);
app.use('/model', modelRouter);

app.listen(4100, () =>
  console.log(`
🚀 Server ready at: http://localhost:4100`),
)
