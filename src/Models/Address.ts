export class EntityBase{
    ID:string = 'null';
}


export default class Address extends EntityBase
{       
    DoorNumber: string = "";
    PostCode : string = "";
    AddressLine1 : string = "";
    AddressLine2 : string = "";
}


