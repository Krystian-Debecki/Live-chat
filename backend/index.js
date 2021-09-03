const app = require('express')();
const httpServer = require('http').createServer(app)
const cors = require('cors');

app.use(cors())

const io = require('socket.io')(httpServer,{
    cors: {
        origins: ['*']
    }
})


function getRoomsList(map) {
    const arr = Array.from(map);
    const filtered = arr.filter(room => !room[1].has(room[0]))
    return filtered.map(i => i[0]);
}

function getUsers(map,room){    
    return [...map.get(room)];
}

let activeUsers = []
io.on("connection", async socket => {
    const userId = socket.id
    socket.emit('connected', userId)
    
    socket.on('disconnecting', () => {
        let room = '';  
        console.log(room)
        activeUsers = activeUsers.filter(user => {
            if(user.id === userId) room = user.room
            return user.id !== userId
        })

        console.log(activeUsers)
        console.log('asdas')
        socket.to(room).emit('disc', userId)
    })
    
    socket.on('joinRoom', req => {
        const {name, room} = req;
        const rooms = getRoomsList(io.sockets.adapter.rooms)

        if(!req) return socket.emit('Error', () => console.error('Error'));

        socket.join(room)
        activeUsers.push({name, id:userId, room})
        
        for(let i = 0; i< rooms.length; i++)
            if(room === rooms[i]){
                const usersInRoom = getUsers(io.sockets.adapter.rooms,room)

                let response = [];
                response = activeUsers.filter(user => {
                    for(i=0;i<usersInRoom.length;i++)
                        if(user.id === usersInRoom[i])
                            return user
                })
                
                io.to(room).emit('getUsersList', response)
            }
                
        return;
    })

    socket.on('getUsersList', ({room}) => {
        if(!room) return;
        if(!io.sockets.adapter.rooms) return;

        const usersInRoom = getUsers(io.sockets.adapter.rooms,room)
        let response = [];
        response = activeUsers.filter(user => {
            for(i=0;i<usersInRoom.length;i++)
                if(user.id === usersInRoom[i])
                    return user
        })

        io.to(room).emit('getUsersList', response)
    })

    socket.on('message', ({room,from,message}) => {
        io.to(room).emit('message', {from,message})
    })

    socket.on('createRoom', ({room,name}) => {
        socket.join(room)

        socket.emit('createRoom', getRoomsList(io.sockets.adapter.rooms))
        io.sockets.emit('getRoomsArray', getRoomsList(io.sockets.adapter.rooms))
    })

    socket.on('getRoomsArray', () => {
        socket.emit('getRoomsArray', getRoomsList(io.sockets.adapter.rooms))
    })
})

httpServer.listen(3200, () => console.log('Działa'))

/*

    console.log(getGuests(io.sockets.adapter.rooms,req))
    console.log(getRoomsList(io.sockets.adapter.rooms))

*/