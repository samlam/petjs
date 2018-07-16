import { ITagHandler } from "../models/ITagHandler";
import { IContext } from "../models/IContext";
import { IProvider } from "../models/IProvider";

export class CommonService {

    constructor(public context:IContext){

    }

    /**
     * attach props to a TagHandler, ie Providers, CommonService, Dom, and data
     *
     * @static
     * @param {ITagHandler} taghandler
     * @param {*} props
     * @memberof CommonService
     */
    public static attach(taghandler:ITagHandler, props: any){
        
        const {providers, commonService, dom } = props
        taghandler.commonService = commonService;
        taghandler.dom = dom;

        if (providers && providers.filter){
            taghandler.localProvider = providers.filter(p => p.constructor.name === 'LocalProvider')[0]
        }
        taghandler.tagData = taghandler.dom && CommonService.getTagData(taghandler.dom.attributes, taghandler.tagName);
    }

    /**
     * parse object into string, ignore recursive ref
     *
     * @param {*} obj
     * @param {*} [replacer]
     * @param {*} [indent]
     * @returns {string}
     * @memberof CommonService
     */
    public static stringifyOnce (obj, replacer?, indent?): string {
        var printedObjects = [];
        var printedObjectKeys = [];
    
        function printOnceReplacer(key, value){
            if ( printedObjects.length > 2000){ // browsers will not print more than 20K, I don't see the point to allow 2K.. algorithm will not be fast anyway if we have too many objects
            return 'object too long';
            }
            var printedObjIndex: any = false;
            printedObjects.forEach(function(obj, index){
                if(obj===value){
                    printedObjIndex = index;
                }
            });
    
            if ( key == ''){ //root element
                 printedObjects.push(obj);
                printedObjectKeys.push("root");
                 return value;
            }
    
            else if(printedObjIndex+"" != "false" && typeof(value)=="object"){
                if ( printedObjectKeys[printedObjIndex] == "root"){
                    return "(pointer to root)";
                }else{
                    return "(see " + ((!!value && !!value.constructor) ? value.constructor.name.toLowerCase()  : typeof(value)) + " with key " + printedObjectKeys[printedObjIndex] + ")";
                }
            }else{
    
                var qualifiedKey = key || "(empty key)";
                printedObjects.push(value);
                printedObjectKeys.push(qualifiedKey);
                if(replacer){
                    return replacer(key, value);
                }else{
                    return value;
                }
            }
        }
        return JSON.stringify(obj, printOnceReplacer, indent);
    }

    /**
     * turn dash delimited name into Camel case
     *
     * @param {string} val
     * @returns {string}
     * @memberof CommonService
     */
    public static toCamelCase(val:string): string {
        return val.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); });
    }

    /**
     * Instanstiate a new component
     *
     * @static
     * @param {*} type
     * @param {...any[]} args
     * @returns {*}
     * @memberof CommonService
     */
    public static newInstance( type: any, ...args: any[]) : any {
        var instance = Object.create(type.prototype);
        instance.constructor.apply(instance, ...args);
        return instance;
    }

    public static typeGuard(type: any) {
        if (typeof(type) !== 'function') {
            throw new Error(`${type} ${this.stringifyOnce(type)} is not a class type`)
        }
    }

    /**
     * turn dash delimited name into Camel case
     *
     * @param {string} val
     * @returns {string}
     * @memberof CommonService
     */
    public toCamelCase(val:string): string {
        return CommonService.toCamelCase(val);
    }
    
    /**
     * parse object into string, ignore recursive ref
     *
     * @param {*} obj
     * @param {*} [replacer]
     * @param {*} [indent]
     * @returns {string}
     * @memberof CommonService
     */
    public stringifyOnce (obj, replacer?, indent?): string {
        return CommonService.stringifyOnce(obj, replacer, indent);
    }

    /**
     * preload the tag handlers
     *
     * @param {ITagHandler} tagHandler
     * @returns {ITagHandler[]}
     * @memberof CommonService
     */
    public loadTagHandlers (root:Element, tagHandler: any, providers: IProvider[], commonSvc:CommonService) : ITagHandler[] {
        let ret: ITagHandler[] = [];

        CommonService.typeGuard(tagHandler)

        const handlerDoms = root.querySelectorAll(`${tagHandler.tagName} ,[${tagHandler.tagName}] `);
        for(let i = 0; i < handlerDoms.length; i ++  ) {
            const dom = handlerDoms.item(i);
            ret.push (CommonService.newInstance(tagHandler, [{}, providers, commonSvc, dom] ) );
        }

        return ret;
    }

    public loadProvider( provider: any, commonSvc: CommonService): IProvider {
        CommonService.typeGuard(provider);
        return CommonService.newInstance(provider, [ commonSvc]) as IProvider;
    }

    public loadProviders( providers: any[], commonSvc: CommonService): IProvider[] {
        let ret: IProvider[] = [];
        providers.forEach( p => {
            var r = this.loadProvider(p, commonSvc)
            ret.push( r);
        })
        return ret;
    }


    private static getTagData(attr:NamedNodeMap, tagName: string): any {
        let ret = {};
        tagName = tagName.toLowerCase();
        for( let i = 0; i < attr.length; i ++ ){
            const a = attr.item(i);
            if (a.name.indexOf(tagName) === -1 ) return;
            ret[CommonService.toCamelCase(a.name)] = a.value;
        }
        return ret;
    }
}