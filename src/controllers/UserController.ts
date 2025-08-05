import ClientService from 'services/ClientService';
import BaseClientController from './BaseClientController';
import { Roles } from 'infra/database/models/Roles';

export const UserController = (service: ClientService) =>
     new BaseClientController(service, Roles.USER);
