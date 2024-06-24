const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

const PROTO_PATH = "./users.proto";

const options = {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
};
const packageDefinition = protoLoader.loadSync(PROTO_PATH, options);
const usersProto = grpc.loadPackageDefinition(packageDefinition);

const server = new grpc.Server();

let users = [
    { id: 1, name: "User 1", email: "admin@example.com" },
    { id: 2, name: "User 2", email: "admin2@example.com" },
];

server.addService(usersProto.UsersService.service, {
    getUser: (call, callback) => {
        const userId = call.request.id;
        const userItem = users.find(({ id }) => userId === id);
        callback(null, userItem);
    },
    addUser: (call, callback) => {
        const newId = Math.max(...users.map(({ id }) => id)) + 1;
        const user = { ...call.request };
        user.id = newId;
        users.push(user);
        callback(null, user);
    },
    editUser: (call, callback) => {
        const userId = call.request.id;
        const userItem = users.find(({ id }) => userId === id);
        userItem.name = call.request.name;
        userItem.email = call.request.email;
        callback(null, userItem);
    },
    deleteUser: (call, callback) => {
        const userId = call.request.id;
        users = users.filter(({ id }) => id !== userId);
        callback(null, {});
    },
});

server.bindAsync(
    "127.0.0.1:50051",
    grpc.ServerCredentials.createInsecure(),
    (error, port) => {
        console.log("Server at port:", port);
        console.log("Server running at http://127.0.0.1:50051");
    }
);
