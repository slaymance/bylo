const { FAUNA_DB_SERVER_SECRET } = process.env;

export const config = {
  runtime: 'edge',
};

export default async (request: Request) => {
  const { query, variables } = await request.json();

  const response = await fetch('https://graphql.us.fauna.com/graphql', {
    method: 'POST',
    headers: {
      authorization: `Bearer ${FAUNA_DB_SERVER_SECRET}`,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const { data } = await response.json();

  return new Response(
    JSON.stringify({
      body: data,
    })
  );
};
