/**
 * @flow
 * @relayHash f9586148a455c3e96881c7b8a3a7e2cf
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type AppWrapperQueryVariables = {||};
export type AppWrapperQueryResponse = {|
  +items: ?$ReadOnlyArray<?{|
    +id: string,
    +name: ?string,
    +description: ?string,
    +dateCreated: ?string,
    +categories: ?$ReadOnlyArray<?{|
      +id: string,
      +name: ?string,
    |}>,
  |}>
|};
*/


/*
query AppWrapperQuery {
  items {
    id
    name
    description
    dateCreated
    categories {
      id
      name
    }
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v1 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "name",
  "args": null,
  "storageKey": null
},
v2 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "items",
    "storageKey": null,
    "args": null,
    "concreteType": "ItemType",
    "plural": true,
    "selections": [
      v0,
      v1,
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "description",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "dateCreated",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "categories",
        "storageKey": null,
        "args": null,
        "concreteType": "CategoryType",
        "plural": true,
        "selections": [
          v0,
          v1
        ]
      }
    ]
  }
];
return {
  "kind": "Request",
  "operationKind": "query",
  "name": "AppWrapperQuery",
  "id": null,
  "text": "query AppWrapperQuery {\n  items {\n    id\n    name\n    description\n    dateCreated\n    categories {\n      id\n      name\n    }\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "AppWrapperQuery",
    "type": "RootQueryType",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": v2
  },
  "operation": {
    "kind": "Operation",
    "name": "AppWrapperQuery",
    "argumentDefinitions": [],
    "selections": v2
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '148ca17b2445086a6eae087a2894ffc1';
module.exports = node;
