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

const UsersService = grpc.loadPackageDefinition(packageDefinition).UsersService;

const client = new UsersService(
    "localhost:50051",
    grpc.credentials.createInsecure()
);

const addUser = (user) => {
    return new Promise((resolve, reject) => {
        client.addUser(user, (error, response) => {
            if (error) {
                return reject(error);
            }
            resolve(response);
        });
    });
};

const getUser = (id) => {
    return new Promise((resolve, reject) => {
        client.getUser(id, (error, response) => {
            if (error) {
                return reject(error);
            }
            resolve(response);
        });
    });
};

const editUser = (user) => {
    return new Promise((resolve, reject) => {
        client.editUser(user, (error, response) => {
            if (error) {
                return reject(error);
            }
            resolve(response);
        });
    });
};

const deleteUser = (id) => {
    return new Promise((resolve, reject) => {
        client.deleteUser(id, (error, response) => {
            if (error) {
                return reject(error);
            }
            resolve(response);
        });
    });
};

const main = async () => {
    try {
        const newUser = await addUser({
            name: "User 3",
            email: "student@example.com",
        });
        console.log("Added User:", newUser);

        const user = await getUser({ id: 3 });
        console.log("Fetched User:", user);

        const updatedUser = await editUser({
            id: 3,
            name: "User 3 Updated",
            email: "student@example.com",
        });

        console.log("Updated User:", updatedUser);

        const deletedUser = await deleteUser({ id: 3 });
        console.log("Deleted User:", deletedUser);
    } catch (error) {
        console.error("Error:", error);
    }
};

main();
