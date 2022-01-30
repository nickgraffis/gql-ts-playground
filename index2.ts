import { Query } from "./graphqltest";
import { getBranchesByLocation } from "./test";

type ModelMatchAppSyncEvent<A = any> = {
  field: keyof Query,
  identity: {
    claims: {
      ['custom:userId']: string,
      ['custom:tenantId']: string,
      ['cognito:groups']: string[]
    }
  },
  arguments: A
}

type ModelMatchAppSyncResult = {

}

type ModelMatchAppSyncHandler<A = any> = (event: ModelMatchAppSyncEvent<A>) => 
  Promise<ModelMatchAppSyncResult>;

export const handler: ModelMatchAppSyncHandler = (event) => {
  switch (event.field) {
    case 'getBranchesByLocation':
      return getBranchesByLocation({
        ...event.arguments,
        userId: event.identity.claims['custom:userId'],
      });      
  }
}