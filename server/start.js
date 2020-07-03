const app = require('./server')

app.listen(process.env.PORT, () => {
  console.log(`Escuchando desde el puerto ${process.env.PORT}`);
});
