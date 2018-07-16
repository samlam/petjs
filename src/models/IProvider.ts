import { PageInfo } from "./PageInfo";

interface IOption {
    callId:string;
}

interface IProvider {
    fetch(opts:IOption): any;
}


export { IOption, IProvider}