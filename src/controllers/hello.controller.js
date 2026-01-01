import { getUserCollection } from "../config/db.js";

export const hellocontroller = async (req, res) => {
  console.log("My Cokkie",req.cookies);
  console.log('Signed Cookies: ', req.signedCookies);
  res.send("Hello World!!!");
};

export const helloemon = async (req, res) => {
  res.send("Hello My name is Emon Hossain Hira");
};






