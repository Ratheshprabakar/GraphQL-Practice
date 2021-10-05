const graphql = require("graphql");
const axios = require("axios");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLSchema,
  GraphQLInt,
  GraphQLNonNull
} = graphql;

const BASE_URL = `https://jsonplaceholder.typicode.com`

const fetchAllPosts= ()=>{
  return axios.get(`${BASE_URL}/posts`)
        .then(res=>res.data);
}

const PostType = new GraphQLObjectType({
    name : 'Post',
    fields : ()=>({
        userId : {type:GraphQLNonNull(GraphQLInt)},
        id: {type: GraphQLNonNull(GraphQLInt)},
        title : {type: GraphQLNonNull(GraphQLString)},
        body : {type: GraphQLNonNull(GraphQLString)},
    
    })
})
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: ()=> ({

        //To get all posts
        posts: {
            type: new GraphQLList(PostType),
            resolve: fetchAllPosts         
        },

        //To get a particular post
        post : {
          type : PostType,
          args : {
            id: {type: GraphQLNonNull(GraphQLInt)},
          },
          resolve(parent,args){
            return axios.get(`${BASE_URL}/posts/${args.id}`)
                    .then(res=>res.data);
          }
          }
        }
    )
});

module.exports = new GraphQLSchema({
    query: RootQuery
});

