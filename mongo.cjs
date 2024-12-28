const mongoose = require('mongoose')

if (!(process.argv.length === 3 || process.argv.length === 5) ) {
  console.log('?????')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://jumakinen03:${password}@cluster0.qznmz.mongodb.net/puhelinluetteloApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const puhelinluetteloSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Tieto = mongoose.model('Note', puhelinluetteloSchema)

if (process.argv.length === 3) {
  Tieto.find({}).then(result => {
    result.forEach(tieto => {
      console.log(tieto)
    })
    mongoose.connection.close()
  })
}

const tiedot = new Tieto({
  name: process.argv[3],
  number: process.argv[4],
})


if (process.argv.length === 5 ) {
  tiedot.save().then(result => {
    console.log('information saved!')
    mongoose.connection.close()
  })
}