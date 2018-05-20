import React from 'react';
import { graphql, QueryRenderer } from 'react-relay';
import relayEnvironment from './relayEnvironment';
import App from './components/App';

// TODO
// TODO
// TODO
// TODO
// TODO
// TODO
// TODO
// TODO
// TODO
// TODO
// TODO torrc
const AppWrapper = () => (
  <QueryRenderer
    environment={relayEnvironment}
    query={graphql`
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
    `}
    variables={{}}
    render={({ error, props }) => {
      if (error) {
        return <div>Error!</div>;
      }
      if (!props) {
        return <div>Loading...</div>;
      }

      return <App items={props.items} />;
    }}
  />
);

export default AppWrapper;
