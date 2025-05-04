import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,

    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    profilePic:{
        type: String,
        default: ""
    }
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;
// This schema defines a User model with fields for name, email, and password.
// The email field is unique, meaning no two users can have the same email address.
// The timestamps option automatically adds createdAt and updatedAt fields to the schema.
// This model can be used to interact with the users collection in the MongoDB database.
// You can use this model to create, read, update, and delete user records in your application.
// You can also add methods to the schema for additional functionality, such as password hashing or validation.
// You can use this model in your controllers to handle user-related operations.
// For example, you can use it to register a new user, authenticate a user, or retrieve user information.