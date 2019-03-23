const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema
} = require("graphql");

//DB models
const Book= require('../models/bookM')
const Author= require('../models/authorM')


const authorType = new GraphQLObjectType({
  name: "author",
  fields: () => ({
    id: { type: GraphQLID },
    age: { type: GraphQLInt },
    name: { type: GraphQLString },
    books: {
      type: new GraphQLList(bookType),
      resolve(parent, args) {
        //return _.filter(books, { authorId: parent.id });
      }
    }
  })
});

const bookType = new GraphQLObjectType({
  name: "book",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    authorId: { type: GraphQLID },
    author: {
      type: authorType,
      resolve(parent, args) {
       
        //return _.find(authors, { id: parent.authorId });
      }
    }
  })
});

const rootQuery = new GraphQLObjectType({
  name: "rootQueryType",
  fields: {
    book: {
      type: bookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // get data from DB
        //return _.find(books, { id: args.id });
      }
    },
    author: {
      type: authorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // get data from DB
        //return _.find(authors, { id: args.id });
      }
    },
    books: {
      type: new GraphQLList(bookType),
      resolve(parent, args) {
        // get data from DB
        //return books;
      }
    },
    authors: {
        type: new GraphQLList(authorType),
        resolve(parent,args){
            //return authors
        }
    }
  }
});

const Mutation= new GraphQLObjectType({
    name:'mutation',
    fields:{
        addAuthor:{
            type:authorType,
            args:{
                name:{type:GraphQLString},
                age:{type:GraphQLInt}
            },
            resolve(parent,{name,age}){
                let author= new Author({
                    name,
                    age,
                })
                return author.save()
            }
        },
        addBook:{
            type:bookType,
            args:{
                name:{type:GraphQLString},
                genre:{type:GraphQLString},
                authorId:{type:GraphQLID}
            },
            resolve(parent,{name,genre,authorId}){
                let book= new Book({
                    name,
                    genre,
                    authorId
                })
                return book.save()
            }
        }
        
    }
})
module.exports = new GraphQLSchema({
  query: rootQuery,
  mutation:Mutation,
});
