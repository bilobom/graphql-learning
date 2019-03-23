const app = require('express')();
const graphqlHTTP = require('express-graphql')
const schema = require('./schemas/schema')
const mongoose = require('mongoose')

mongoose.connect("mongodb+srv://bilobom:BiloBom123..@cluster0-eyiia.mongodb.net/graphql?retryWrites=true",{ useNewUrlParser: true })
mongoose.connection.once('open',()=>{
    console.log('connected to DB')
})
app.use('/graphql',graphqlHTTP({
    schema,
    graphiql:true
}));

app.listen(4000,()=>{
    console.log('listening on port 4000')
})