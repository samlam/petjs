import { ISession } from "./ISession";

export class PageInfo implements ISession {
    contactId: string;    
    locationId: string;
    userId: string;
    premiumLister: boolean;
    costarInfo: boolean;
}