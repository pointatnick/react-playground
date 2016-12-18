const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
  graphql
} = require('graphql')

const videoType = new GraphQLObjectType({
  name: 'Video',
  description: 'A video on Egghead.io',
  fields: {
    id: {
      type: GraphQLID,
      description: 'The id of the video',
    },
    title: {
      type: GraphQLString,
      description: 'The title of the video'
    },
    duration: {
      type: GraphQLInt,
      description: 'The duration of the video (in seconds)'
    },
    watched: {
      type: GraphQLBoolean,
      description: 'Whether or not the viewer has watched the video'
    }
  }
})

const queryType = new GraphQLObjectType({
  name: 'QueryType',
  description: 'The root query type',
  fields: {
    video: {
      type: videoType,
      resolve: () => new Promise(resolve => {
        resolve({
          id: 'a',
          title: 'GraphQL',
          duration: 180,
          watched: false
        })
      })
    }
  }
})

const schema = new GraphQLSchema({
  query: queryType
})

const videoA = {
  id: 'a',
  title: 'Create a GraphQL Schema',
  duration: 120,
  watched: true
}

const videoB = {
  id: 'b',
  title: 'Ember.js CLI',
  duration: 240,
  watched: false
}

const videos = [videoA, videoB]

const query = `
  query myFirstQuery {
    video {
      id,
      title,
      duration,
      watched
    }
  }
`

graphql(schema, query)
  .then(result => console.log(result))
  .catch(error => console.log(error))
