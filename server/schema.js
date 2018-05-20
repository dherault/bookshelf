const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
} = require('graphql');
const { nodeDefinitions, globalIdField, fromGlobalId } = require('graphql-relay');

const items = [
  {
    id: 0,
    type: 'Item',
    name: 'Cool stuff',
    description: 'A cool item',
    price: 200,
    available: true,
    dateCreated: '2018-05-19T14:13:27.089Z',
  },
  {
    id: 1,
    type: 'Item',
    name: 'Another cool item',
    price: 1000,
    available: true,
    categories: ['a'],
    dateCreated: '2018-05-19T14:13:27.089Z',
  },
  {
    id: 2,
    type: 'Item',
    name: 'A dark one',
    price: 999999,
    available: true,
    description: 'Handle with care',
    categories: ['a', 'b'],
    dateCreated: '2018-05-19T14:13:27.089Z',
  },
];

const categories = [
  {
    id: 'a',
    type: 'Category',
    name: 'tools',
  },
  {
    id: 'b',
    type: 'Category',
    name: 'crafts',
  },
];

const { nodeInterface, nodeField } = nodeDefinitions(
  globalId => {
    const { type, id } = fromGlobalId(globalId);

    if (type === 'ItemType') {
      return items.find(item => item.id === id);
    }

    return categories.find(category => category.id === id);
  },
  obj => obj.type === 'Item' ? ItemType : CategoryType,
);

const CategoryType = new GraphQLObjectType({
  name: 'CategoryType',
  fields: {
    id: globalIdField(),
    name: {
      type: GraphQLString,
    },
  },
  interfaces: [nodeInterface],
});

const ItemType = new GraphQLObjectType({
  name: 'ItemType',
  fields: {
    id: globalIdField(),
    name: {
      type: GraphQLString,
    },
    description: {
      type: GraphQLString,
    },
    dateCreated: {
      type: GraphQLString,
    },
    categories: {
      type: new GraphQLList(CategoryType),
      resolve(_) {
        return (_.categories || []).map(id => categories.find(c => c.id === id));
      },
    },
  },
  interfaces: [nodeInterface],
});

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      items: {
        type: new GraphQLList(ItemType),
        resolve() {
          return items;
        },
      },
      node: nodeField,
    },
  }),
});

module.exports = schema;
