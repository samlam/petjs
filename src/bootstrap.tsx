import { h, render } from "preact";
import { App } from "./App";
import * as pkg from "../package.json";
import './polyfill';

const version = (pkg as any).version;

declare global {
    interface Document {
        project: {
            app: App
        }
    }
    interface Function {
        name: string;
    }
}

declare interface ObjectConstructor {
    assign(...objects: Object[]): Object;
}

const root = document.querySelector('[app]');

console.log(`bootstrapping ... pet.js ${version}`)
var app = render(<App version={version} rootDom={root} />, root);
