export const createHateoas = (client: any, basePath: string) => {
     return {
          ...client,
          _links: {
               self: {
                    href: `${basePath}/${client.client_id}`,
                    method: 'GET'
               },
               delete: {
                    href: `${basePath}/${client.client_id}`,
                    method: 'DELETE'
               },
               all: {
                    href: `${basePath}`,
                    method: 'GET'
               }
          }
     };
};
