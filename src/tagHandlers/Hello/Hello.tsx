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
    public tagData: any

    get id(): string {
        return this.tagData.title;
    }

    constructor(public props: any) {
        super(props);
  
        this.tagData = {};
        CommonService.attach(this, props);

        this.handle();
    }

    componentDidUpdate(prevProps, prevState, snapshot){
        //   this.setState({ value: `_${value}_` })
    }

    componentWillMount() { }

    componentDidMount() { }

    render() {
        return (<div>{this.tagData.helloTitle}</div>)
    }

    handle(): void {
    }

    fireEvent(opts: any): void {
        if (!opts) return;
    }

}