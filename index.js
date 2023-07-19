const express = require('express')
const app = express()
const port = 3000
const productRoutes = require('./routes/product.route');

const mongoose = require('mongoose')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.listen(port, () => {
  console.log('listening on port ' + `${port}`)

  mongoose
    .connect('mongodb://localhost:27017', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log('Connected to the database')
    })
    .catch((error) => {
      console.error('Error connecting to the database', error)
    })
})


app.use('/products', productRoutes);

