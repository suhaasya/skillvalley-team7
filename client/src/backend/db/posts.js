import { v4 as uuid } from "uuid";

function getDate() {
  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let date = new Date();
  date = `${date.getDate()} ${month[date.getMonth()]}, ${date.getFullYear()}`;

  return date;
}

const posts = [
  {
    _id: uuid(),
    user: {
      firstName: "Anjali",
      lastName: "Chauhan",
    },
    post: {
      message:
        "See brother cat receive pets, attack out of jealousy purr when being pet kitty pounce, trip, faceplant you didn't see that no you didn't definitely didn't lick, lick, lick, and preen away the embarrassment.",
      likes: 2,
      date: getDate(),
    },
  },
  {
    _id: uuid(),
    user: {
      firstName: "Suhas",
      lastName: "Khobragade",
    },
    post: {
      message:
        "See brother cat receive pets, attack out of jealousy purr when being pet kitty pounce, trip, faceplant you didn't see that no you didn't definitely didn't lick, lick, lick, and preen away the embarrassment.",
      likes: 3,
      date: getDate(),
    },
  },
  {
    _id: uuid(),
    user: {
      firstName: "Kelvin",
      lastName: "Parmar",
    },
    post: {
      message:
        "See brother cat receive pets, attack out of jealousy purr when being pet kitty pounce, trip, faceplant you didn't see that no you didn't definitely didn't lick, lick, lick, and preen away the embarrassment.",
      likes: 8,
      date: getDate(),
    },
  },
  {
    _id: uuid(),
    user: {
      firstName: "Aslam",
      lastName: "Khan",
    },
    post: {
      message:
        "See brother cat receive pets, attack out of jealousy purr when being pet kitty pounce, trip, faceplant you didn't see that no you didn't definitely didn't lick, lick, lick, and preen away the embarrassment.",
      likes: 6,
      date: getDate(),
    },
  },
];

export default posts;
