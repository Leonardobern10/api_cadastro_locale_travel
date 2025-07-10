import App from 'App';
import Server from 'Server';
import express from 'express';

const server: Server = new Server(express(), 3000);
const app: App = new App(server);
app.init();
