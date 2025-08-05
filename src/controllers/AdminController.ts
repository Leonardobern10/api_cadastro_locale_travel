import ClientService from 'services/ClientService';
import BaseClientController from './BaseClientController';
import { Roles } from 'infra/database/models/Roles';

export const AdminController = (service: ClientService) =>
     new BaseClientController(service, Roles.ADMIN);
