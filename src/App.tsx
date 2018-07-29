import './global'
import { h, Component,render } from "preact";
import { Props } from './models/Props';
import { State } from './models/State';
import { ITagHandler } from "./models/ITagHandler";
import { CommonService } from "./services/CommonService";
import { IContext } from "./models/IContext";
import { IProvider } from "./models/IProvider";
import { LocalProvider } from "./providers/LocalProvider";
import { Hello } from "./tagHandlers/Hello/Hello";

/**
 * root component
 *
 * @export
 * @class App
 * @extends {Component<Props, State>}
 */
export class App extends Component<Props, State> implements IContext {

  
  private root: Element;
  private isInitRunning: boolean = false;

  public commonService: CommonService = new CommonService(this);
  public handlers:ITagHandler[] = [];
  public providers:IProvider[] = [];
  public services:any[] = [this.commonService];
  public session: Object;
  public page: Object;

  public nodeName:any;

  get version(): string {
    return this.props.version;
  }

  constructor(public props: any ) {
    super(props);

    this.root = this.props.rootDom;

    //TODO - temporary solution until i have a better di setup
    this.loadProviders();
  }

  componentWillMount() {
  }

  componentDidMount() {
    this.fasten()
  }

  render(props: Props, state: State) {

    this.init();

    return (null);
  }


  /* public methods */

  /**
   * initialize childs (TagHandlers)
   *
   * @memberof App
   */
  init(): void {
    this.handlers = null;
    this.renderTag(Hello)
  }

  
  fasten(): void {

    if (window.document.project && window.document.project.app && window.document.project.app.constructor.name === 'App') return;
    if (window.document.project){
      (Object as any).assign(this, window.document.project.app);
    }
    /* expose this in the global; and do this only once*/
    window.document.project = window.document.project || {}
    window.document.project.app = this;
  }

  /* private methods */

  private renderTag(tagHandler:any ): void {
    CommonService.typeGuard(tagHandler);
    this.handlers && this.handlers.constructor.name === 'Array' || (this.handlers = [])

    const Tag = tagHandler ;
    const handlerDomList = this.root.querySelectorAll(`${tagHandler.tagName} ,[${tagHandler.tagName}] `)

    for(let i = 0 ; i < handlerDomList.length; i ++) {
      const handlerDom = handlerDomList.item(i)
    
      const e = render( <Tag
        dom={handlerDom} 
        commonService={this.commonService}
        providers={this.providers}
        ref={(h)=> {this.handlers.push(h)} } /> , handlerDom );
      //console.log(`${tagHandler.tagName} dom `, e.constructor.name)
    }
  }

  private loadProviders(): void {
    this.providers && this.providers.constructor.name === 'Array' || (this.providers = [])
    this.providers = this.providers.concat(this.commonService.loadProviders([LocalProvider], this.commonService) )
  }
}

