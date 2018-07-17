import { IProvider } from "./IProvider";
import { CommonService } from "../services/CommonService";

/**
 * common ITagHandler interface with constructor requirement; 
 *
 * @export
 * @interface ITagHandler
 */
export interface ITagHandler {
    id: string;
    tagName: string;
    tagData: any;

    dom: Element;
    providers: IProvider[];    
    localProvider: IProvider;
    commonService: CommonService;

    handle(): void;
}