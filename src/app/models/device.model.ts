export type DeviceStatus = 'online' | 'offline';
export type VendorType = 'Cisco' | 'Arista' | 'Others';

//Inventory
export interface Device{
    id : string;    //Primary Key
    hostname : string;
    ipAddress : string;
    vendor : VendorType;
    status : DeviceStatus;
    rackNo : string;
    description : string;
}