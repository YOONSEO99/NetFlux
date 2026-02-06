import { Device } from './device.model';

export const MOCK_DEVICES: Device[] = [
    {
        id: 'dev-01',    //Primary Key
        hostname: 'VAN-Core-SW01',
        ipAddress: '10.10.1.1',
        vendor: 'Cisco',
        status: 'online',
        rackNo: '3F-01-01',
        description: 'Main Core SW'
    },
    {
        id: 'dev-02',    //Primary Key
        hostname: 'VAN-Core-SW02',
        ipAddress: '10.10.1.2',
        vendor: 'Cisco',
        status: 'online',
        rackNo: '3F-02-01',
        description: 'Main Core SW'
    },
    {
        id: 'dev-03',    //Primary Key
        hostname: 'VAN-Border-SW01',
        ipAddress: '10.10.2.1',
        vendor: 'Arista',
        status: 'online',
        rackNo: '3F-01-02',
        description: 'Main Border SW'
    },
    {
        id: 'dev-04',    //Primary Key
        hostname: 'VAN-Border-SW02',
        ipAddress: '10.10.2.2',
        vendor: 'Arista',
        status: 'online',
        rackNo: '3F-02-02',
        description: 'Main Border SW'
    },
    {
        id: 'dev-05',    //Primary Key
        hostname: 'VAN-Leaf-SW01',
        ipAddress: '10.10.10.1',
        vendor: 'Arista',
        status: 'online',
        rackNo: '4F-01-01',
        description: 'Service Leaf SW'
    },
    {
        id: 'dev-06',    //Primary Key
        hostname: 'VAN-Leaf-SW02',
        ipAddress: '10.10.10.2',
        vendor: 'Arista',
        status: 'online',
        rackNo: '4F-02-01',
        description: 'Service Leaf SW'
    },
            {
        id: 'dev-07',    //Primary Key
        hostname: 'VAN-Leaf-SW03',
        ipAddress: '10.10.10.3',
        vendor: 'Arista',
        status: 'offline',
        rackNo: '4F-03-01',
        description: 'Service Leaf SW'
    },
            {
        id: 'dev-08',    //Primary Key
        hostname: 'VAN-Leaf-SW04',
        ipAddress: '10.10.10.4',
        vendor: 'Arista',
        status: 'online',
        rackNo: '4F-04-01',
        description: 'Service Leaf SW'
    },
            {
        id: 'dev-09',    //Primary Key
        hostname: 'VAN-Cloud-SW01',
        ipAddress: '10.10.100.1',
        vendor: 'Cisco',
        status: 'online',
        rackNo: '4F-10-01',
        description: 'Service Cloud SW'
    },
            {
        id: 'dev-10',    //Primary Key
        hostname: 'VAN-Cloud-SW02',
        ipAddress: '10.10.100.2',
        vendor: 'Cisco',
        status: 'offline',
        rackNo: '4F-12-01',
        description: 'Service Cloud SW'
    }
];