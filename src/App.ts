import test from 'node:test';
import Server from 'Server';

export default class App {
    private server: Server;

    constructor(server: Server) {
        this.server = server;
        this.testApi();
    }

    public init() {
        this.server.getApp().listen(this.server.getPort(), () => {
            console.log(
                `Executando servidor em http://localhost:${this.server.getPort()}`
            );
        });
    }

    public testApi() {
        this.server.getApp().get('/', async (req, res) => {
            res.send('Hello World!');
        });
    }
}
