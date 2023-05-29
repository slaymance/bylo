import { Handler } from '@netlify/functions';
import { GraphQLClient, RequestDocument } from 'graphql-request';

const { FAUNA_DB_SERVER_SECRET } = process.env;

const client = new GraphQLClient('https://graphql.us.fauna.com/graphql', {
  headers: {
    authorization: `Bearer ${FAUNA_DB_SERVER_SECRET}`,
  },
});

export const handler: Handler = async (event) => {
  const query = event.queryStringParameters?.query as RequestDocument;
  const data = await client.request(query);

  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
};
