import Server from 'server/Server';
import { DataSource } from 'typeorm';

export default class App {
    private server: Server;
    private db: DataSource;

    constructor(server: Server, db: DataSource) {
        this.server = server;
        this.db = db;
        this.testApi();
    }

    public init(): void {
        this.server.getApp().listen(this.server.getPort(), () => {
            console.log(
                `Executando servidor em ${process.env.SERVER_ADDRESS}`
            );
        });
        this.db.initialize()
            .then(() => console.log("Conexão com o banco estabelecida!"))
            .catch((error) => console.error(`Erro ao estabelecer conexão com o banco => ${error}`))
    }

    public testApi(): void {
        this.server.getApp().get('/', async (req, res) => {
            res.status(200).json({ message: "API Locale Travel está ativa 🚀" });
        });
    }
}
