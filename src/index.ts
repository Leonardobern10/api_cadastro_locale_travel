import App from 'App';
import Server from 'Server';
import express from 'express';

const server: Server = new Server(express(), Number(process.env.PORT));
const app: App = new App(server);
app.init();
