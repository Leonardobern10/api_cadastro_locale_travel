/**
 * Cria os links HATEOAS para um cliente.
 * @param client Dados do cliente
 * @param basePath Caminho base da rota
 * @returns Objeto com links HATEOAS
 */
export const createHateoas = (client: any, basePath: string) => {
     return {
          ...client,
          _links: {
               self: {
                    href: `${basePath}/${client.client_id}`,
                    method: 'GET'
               },
               update: {
                    href: `${basePath}/${client.client_id}`,
                    method: 'PUT'
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
