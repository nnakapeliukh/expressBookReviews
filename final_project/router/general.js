const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

public_users.post("/register", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if (username && password) {
        if (!isValid(username)) {
            users.push({ "username": username, "password": password });
            return res.status(200).json({ message: "User successfully registred. Now you can login" });
        } else {
            return res.status(404).json({ message: "User already exists!" });
        }
    }
    return res.status(404).json({ message: "Username and/or password not provided." });
});

// Get the book list available in the shop
public_users.get('/', async function (req, res) {
    //Write your code here
    let myPromise = new Promise((resolve,reject) => {
        resolve(books);
    });
    
    res.send(await myPromise);
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', async function (req, res) {
    //Write your code here
    let myPromise = new Promise((resolve,reject) => {
        resolve(books[parseInt(req.params.isbn)]);
    });
    
    res.send(await myPromise);
});

// Get book details based on author
public_users.get('/author/:author', async function (req, res) {
    //Write your code here
    //Write your code here
    let myPromise = new Promise((resolve,reject) => {
        
        const filteredAuthorNumber = Object.keys(books).filter((book) => {
            return books[parseInt(book)].author === req.params.author
        });
        resolve(books[parseInt(filteredAuthorNumber)]);
    });
    
    return res.send(await myPromise);
});

// Get all books based on title
public_users.get('/title/:title', async function (req, res) {

    let myPromise = new Promise((resolve,reject) => {
        
        
    const filteredTitleNumber = Object.keys(books).filter((book) => {
        return books[parseInt(book)].title === req.params.title
    });
        resolve(books[parseInt(filteredTitleNumber)]);
    });
    
    return res.send(await myPromise);
});

//  Get book review
public_users.get('/review/:isbn', function (req, res) {
    //Write your code here
   
    res.send((books[parseInt(req.params.isbn)]).reviews);
});

module.exports.general = public_users;
