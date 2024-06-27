const Project = require("../models/Project");
const Client = require("../models/Client");

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLBoolean,
  GraphQLEnumType,
} = require("graphql");

const ClientType = new GraphQLObjectType({
  name: "Client",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
  }),
});

const ClientCreateResultType = new GraphQLObjectType({
  name: "ClientCreateResult",
  fields: () => ({
    status: { type: GraphQLBoolean },
    message: { type: GraphQLString },
    data: { type: ClientType },
  }),
});

const ClientDeleteResultType = new GraphQLObjectType({
  name: "ClientDeleteResult",
  fields: () => ({
    status: { type: GraphQLBoolean },
    message: { type: GraphQLString },
    id: { type: GraphQLID },
  }),
});

const ProjectType = new GraphQLObjectType({
  name: "Project",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },
    client: {
      type: ClientType,
      resolve: async (parent, args) => {
        const result = await Client.findById(parent.clientId);
        return result;
      },
    },
  }),
});

const ProjectCreateResultType = new GraphQLObjectType({
  name: "ProjectCreateResult",
  fields: () => ({
    status: { type: GraphQLBoolean },
    message: { type: GraphQLString },
    data: { type: ProjectType },
  }),
});

const ProjectDeleteResultType = new GraphQLObjectType({
  name: "ProjectDeleteResult",
  fields: () => ({
    status: { type: GraphQLBoolean },
    message: { type: GraphQLString },
    id: { type: GraphQLID },
  }),
});

// query -----
const queries = new GraphQLObjectType({
  name: "Queries",
  fields: {
    getProjects: {
      type: new GraphQLList(ProjectType),
      args: { clientId: { type: GraphQLID } },
      resolve: async (parent, args) => {
        const result = await Project.find({ clientId: args.clientId });
        return result;
      },
    },
    getProject: {
      type: ProjectType,
      args: { id: { type: GraphQLID } },
      resolve: async (parent, args) => {
        const result = await Project.findById(args.id);
        return result;
      },
    },
  },
});

// mutation -----
const mutations = new GraphQLObjectType({
  name: "Mutations",
  fields: {
    addClient: {
      type: ClientCreateResultType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        phone: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: async (parent, args) => {
        const { name, email, phone } = args;
        const newClient = new Client({
          name,
          email,
          phone,
        });

        let result;

        try {
          result = await newClient.save();
        } catch (err) {
          console.log(err);
          return {
            status: false,
            message: "Something went wrong",
            error: err,
          };
        }

        return {
          status: true,
          message: "Client created successfully",
          data: result,
        };
      },
    },
    clientLogin: {
      type: ClientCreateResultType,
      args: { email: { type: GraphQLNonNull(GraphQLString) } },
      resolve: async (parent, args) => {
        const result = await Client.findOne({ email: args.email });
        if (!result) {
          return {
            status: false,
            message: "User not exists",
          };
        }
        return {
          status: true,
          message: "Logged in successfully",
          data: {
            name: result.name,
            email: result.email,
            phone: result.phone,
            id: result._id,
          },
        };
      },
    },
    deleteClient: {
      type: ClientDeleteResultType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve: async (parent, args) => {
        const { id } = args;

        let result;

        try {
          result = await Client.findByIdAndDelete(id);
          await Project.deleteMany({ clientId: id });
        } catch (err) {
          console.log(err);
          return {
            status: false,
            message: "Something went wrong",
            error: err,
          };
        }

        return {
          status: true,
          message: "Client deleted successfully",
          id: result._id,
        };
      },
    },
    addProject: {
      type: ProjectCreateResultType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLNonNull(GraphQLString) },
        status: {
          type: new GraphQLEnumType({
            name: "projectStatus",
            values: {
              new: { value: "Not Started" },
              running: { value: "In Progress" },
              completed: { value: "Completed" },
            },
          }),
          defaultValue: "Not Started",
        },
        clientId: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve: async (parent, args) => {
        const { name, description, status, clientId } = args;
        const newProject = new Project({
          name,
          description,
          status,
          clientId,
        });

        let result;

        try {
          result = await newProject.save();
        } catch (err) {
          console.log(err);
          return {
            status: false,
            message: "Something went wrong",
            error: err,
          };
        }

        return {
          status: true,
          message: "project created successfully",
          data: result,
        };
      },
    },
    changeProjectStatus: {
      type: ProjectCreateResultType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        status: {
          type: new GraphQLEnumType({
            name: "projectEditStatus",
            values: {
              new: { value: "Not Started" },
              running: { value: "In Progress" },
              completed: { value: "Completed" },
            },
          }),
          defaultValue: "Not Started",
        },
      },
      resolve: async (parent, args) => {
        const { id, status } = args;

        let result;

        try {
          result = await Project.findByIdAndUpdate(
            id,
            { $set: { status } },
            { new: true }
          );
        } catch (err) {
          console.log(err);
          return {
            status: false,
            message: "Something went wrong",
            error: err,
          };
        }

        return {
          status: true,
          message: "project created successfully",
          data: result,
        };
      },
    },
    deleteProject: {
      type: ProjectDeleteResultType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve: async (parent, args) => {
        const { id } = args;

        let result;

        try {
          result = await Project.findByIdAndDelete(id);
        } catch (err) {
          console.log(err);
          return {
            status: false,
            message: "Something went wrong",
            error: err,
          };
        }

        return {
          status: true,
          message: "Project deleted successfully",
          id: result._id,
        };
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: queries,
  mutation: mutations,
});
