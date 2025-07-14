export const createClientHateoas = (client: any) => {
      const baseUrl = `/api/v1/clients/${client.client_id ? client.client_id : ':id'}`;

      return {
            ...client,
            _links: {
                  self: {
                        href: baseUrl,
                        method: "GET"
                  },
                  delete: {
                        href: baseUrl,
                        method: "DELETE"
                  },
                  all: {
                        href: "/api/v1/clients",
                        method: "GET"
                  }
            }
      }
}