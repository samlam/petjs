import { h, Component } from "preact";
import { CommonService } from '../../services/CommonService';
import { Props } from '../../models/Props';
import { State } from '../../models/State';
import { ITagHandler } from "../../models/ITagHandler";
import { IProvider } from "../../models/IProvider";
import { PageInfo } from "../../models/PageInfo";



export class Hello extends Component<Props, State> implements ITagHandler {

    public dom: Element;
    public providers: IProvider[];    
    public localProvider: IProvider;
    public commonService: CommonService;

    public static tagName: string = 'hello';

    public tagName: string = Hello.tagName;
    public tagData: any = new Object as any;


    get id(): string {
        return this.tagData.title;
    }

    constructor(public props: any) {
        super(props);
        
        CommonService.attach(this, props);

        this.handle();
    }

    componentWillMount() { }

    componentDidMount() { }

    render() {
        return (<span> {this.tagData.helloTitle} </span>)
    }

    handle(): void {
    }

    fireEvent(opts: any): void {
        if (!opts) return;
    }

}