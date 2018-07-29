import '../global'
import { IProvider, IOption } from "../models/IProvider";
import { CommonService } from "../services/CommonService";
import { PageInfo } from "../models/PageInfo";

export class LocalProvider implements IProvider {

    constructor(private commonService:CommonService){
    }

    public fetch(opts: IOption): PageInfo {
        const obj = (<any>Object);
        const ns =  document.project && document.project.app;
        let ret = new PageInfo();
        if (!ns) return ret;

        obj.assign(ret, ns.session);
        const p = ns.page as object[];
        if (!p) return ret;
        
        p.forEach(po => {
            obj.assign(ret, po)
        })
        return ret;
    }
}