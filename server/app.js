/**
 * Created by Asaf Karavani on 07/06/2017.
 */
var agent;
var connected = false;
var numbers = [];
var io = require('socket.io')();
io.on('connection', function (client) {
    agent = client;
    console.log('Agent connected: ', agent.id);
    connected = true;
    client.on('newImage', function (data) {
        console.log(data);
    });
    client.on('disconnect', function () {
        connected = false;
    });
});
io.listen(3000);
console.log('Server listening for Agents on port 3000.');

const express = require('express');
const app = express();

app.get('/sendTestToAgent', function (req, res) {
    if (connected) {
        agent.emit('test', {test: 'test'});
        res.send('Sent test.');
    } else {
        res.send('Agent not connected...');
    }
});

app.get('/start', function (req, res) {
    if (connected) {
        agent.emit('start', {});
        res.send('Sent start.');
    } else {
        res.send('Agent not connected...');
    }
});

app.get('/stop', function (req, res) {
    if (connected) {
        agent.emit('stop', {});
        res.send('Sent stop.');
    } else {
        res.send('Agent not connected...');
    }
});

app.listen(4444, function () {
    console.log('Server listening for CP on port 4444!');
});