import { Inngest } from "inngest";
import Teacher from "../models/User.js";
// Create a client to send and receive events

const inngest2 = new Inngest({ id: "skillbridge-teacher" });

//Inngest function to save user data to database

const syncTeacherCreation = inngest.createFunction(
    {id: 'sync-teacher-from-clerk'},
    {event: 'clerk/user.created'},
    async ({ event }) => {
        // Logic to save user data to database
        const {id, first_name, last_name, email_addresses, image_url} = event.data;
        const userData = {
            _id: id,
            email: email_addresses[0].email_address,
            name: first_name + ' ' + last_name,
            image: image_url
        }
        await Teacher.create(userData);
    }
)

//Inngest function to delete user from database

const syncTeacherDeletion = inngest.createFunction(
    {id: 'delete-teacher-with-clerk'},
    {event: 'clerk/user.deleted'},
    async ({ event }) => {
        // Logic to delete user data from database
        const {id} = event.data;
        await Teacher.findByIdAndDelete(id);
    }
)

//Inngest function to update user in database

const syncTeacherUpdation = inngest.createFunction(
    {id: 'update-teacher-from-clerk'},
    {event: 'clerk/user.updated'},
    async ({ event }) => {
        // Logic to update user data in database
        const {id, first_name, last_name, email_addresses, image_url} = event.data;
        const userData = {
            _id: id,
            email: email_addresses[0].email_address,
            name: first_name + ' ' + last_name,
            image: image_url
        }
        await Teacher.findByIdAndUpdate(id, userData);
    }
)

// Create an empty array where we'll export future Inngest functions
const functions2 = [syncTeacherCreation, syncTeacherDeletion, syncTeacherUpdation];

export { inngest2, functions2 };