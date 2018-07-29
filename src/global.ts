declare global{
    interface Window  {
    }
    interface Document {
        project: any
    }
    interface Function {
        readonly name: string
    }
}
export{}
