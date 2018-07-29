import '../src/global'
import {h} from 'preact';
import {shallow, render } from 'preact-render-spy';
import { App } from '../src/App'

describe(`all test cases`, () => {

    beforeEach(() => {
        document.project = document.project || {};
        document.project.app = {
          session: {
            user:7383422,
          }
        };
    
        document.project.app.page = document.project.app.page || [];
        document.project.app.page.push({'interests':'books,baseball,football'});
    })
    
    /**
     * @jest-environment jsdom
     */
    it('App, main component, should be initialized', () => {
        const parser = new DOMParser();
        const html = '<body app><hello hello-id="unique id of the handler" hello-title="world"></hello></body>'
        const doc = parser.parseFromString(html, 'text/html')
        const appContext = shallow(<App rootDom={doc} />);

        expect( document.project.app.handlers[0].constructor.name ).toBe('Hello')
        expect( document.project.app.session.user).toBeTruthy()

        //console.log(`document after expect `, document.project.app )
        //console.log(document.location )
    })
})
