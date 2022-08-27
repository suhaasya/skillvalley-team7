import { v4 as uuid } from "uuid";

const users = [
  {
    _id: uuid(),
    firstName: "Anjali",
    lastName: "Chauhan",
    description: "Developer",
  },
  {
    _id: uuid(),
    firstName: "Suhas",
    lastName: "Khobragade",
    description: "Developer",
  },
  {
    _id: uuid(),
    firstName: "Kelvin",
    lastName: "Parmar",
    description: "Developer",
  },
  {
    _id: uuid(),
    firstName: "Aslam",
    lastName: "Khan",
    description: "Developer",
  },
];

export default users;
