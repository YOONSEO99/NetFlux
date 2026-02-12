export type severity = 'INFO' | 'WARNING' | 'ERROR';

//Log
export interface Log{
    id  : string;   //Primary Key
    deviceId : string;  //Foreign Key(Which Device)
    hostname : string;
    timestamp : string;
    message : string;
    type : severity;
}