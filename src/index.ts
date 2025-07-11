import App from 'application/App';
import Server from 'application/Server';
import express from 'express';

const server: Server = new Server(express(), Number(process.env.PORT));
const app: App = new App(server);
app.init();
