import { h, Component,render } from "preact";
import { Props } from './models/Props';
import { State } from './models/State';
import { ITagHandler } from "./models/ITagHandler";
//import { GtmListing } from "./tagHandlers/GtmListing/GtmListing";
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

  get version(): string {
    return this.props.version;
  }

  constructor(public props: any ) {
    super(props);

    this.root = this.props.rootDom;

    //NOTE - temporary solution until i have a better di setup
    this.loadProviders();
  }

  componentWillMount() {
    //this.setState(this.state);
    //this.init();
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
    //if (this.isInitRunning) return -1;

    //console.log(`Initializing ${this.constructor.name} ...`)
    //this.isInitRunning = true;
    //this.handlers = null; //reset the handlers
    //this.loadHandlers();

    //this.isInitRunning = false;

    if (window.document.project.app.constructor.name === 'App') return;
    /* expose this in the global; and do this only once*/
    (Object as any).assign(this, window.document.project.app);
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
      console.log(`${tagHandler.tagName} dom `, e.constructor.name)
    }
  }

  // private loadHandlers(): void {
  //   this.handlers && this.handlers.constructor.name === 'Array' || (this.handlers = [])

  //   const helloDom = this.root.querySelector(`${Hello.tagName} ,[${Hello.tagName}] `)
  //   const e = render( <Hello dom={helloDom}/> , helloDom );
  //   console.log(`hello dom `, e.constructor.name)
  //   //TODO: specify the handlers as decorator of dependencies
  //   this.handlers = this.handlers.concat(this.commonService.loadTagHandlers(this.root, GtmListing, this.providers, this.commonService));
  //   this.handlers = this.handlers.concat(this.commonService.loadTagHandlers(this.root, Hello, this.providers, this.commonService));
  // }

  private loadProviders(): void {
    this.providers && this.providers.constructor.name === 'Array' || (this.providers = [])
    this.providers = this.providers.concat(this.commonService.loadProviders([LocalProvider], this.commonService) )
  }
}

