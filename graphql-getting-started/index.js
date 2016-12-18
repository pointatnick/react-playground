const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
  graphql
} = require('graphql')

const {
  getVideoById,
  getVideos,
  createVideo
} = require('./src/data')

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
    videos: {
      type: new GraphQLList(videoType),
      resolve: getVideos
    },
    video: {
      type: videoType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID),
          description: 'The id of the video'
        }
      },
      resolve: (_, args) => getVideoById(args.id)
    }
  }
})

const mutationType = new GraphQLObjectType({
  name: 'Mutation',
  description: 'The root mutation type',
  fields: {
    createVideo: {
      type: videoType,
      args: {
        title: {
          type: new GraphQLNonNull(GraphQLString),
          description: 'The title of the video'
        },
        duration: {
          type: new GraphQLNonNull(GraphQLInt),
          description: 'The duration of the video (in seconds)'
        },
        released: {
          type: new GraphQLNonNull(GraphQLBoolean),
          description: 'Whether or not the video is released'
        }
      },
      resolve: (_, args) => createVideo(args)
    }
  }
})

const schema = new GraphQLSchema({
  query: queryType,
  mutation: mutationType
})

const query = `
  mutation M {
    createVideo(title: "Foo", duration: 300, released: false) {
      id,
      title
    }
  }
`

graphql(schema, query)
  .then(result => console.log(result))
  .catch(error => console.log(error))
