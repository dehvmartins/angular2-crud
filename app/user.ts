import {Address} from './address';

export class User {
    name: string;
    email: string;
    phone: string;
    address = new Address();
}
