export type LogType = 'info' | 'warning' | 'error';

//Log
export interface Log{
    id  : string;   //Primary Key
    deviceId : string;  //Foreign Key(Which Device)
    timestamp : string;
    message : string;
    type : LogType;
}