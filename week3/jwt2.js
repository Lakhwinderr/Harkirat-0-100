const jwt = require("jsonwebtoken");
const jwtPass = "343433"
const user = {username: "Lakhwinder", password: "12344"};

const token  = jwt.sign(user, jwtPass);
console.log(token)

const payload = jwt.decode("eyJhbGciOiJIUzI1NiIIkpXVCJ9.eyJ1c2VybmFtZSI6Ikxha2h3aW5kZXIiLCJwYXNzd29yZCI6IjEyMzQ0IiwiaWF0IjoxNzI1MzkxMzgyfQ.BwYbb-JYVTadtkLX0r8ik8auShnZRH6ZrVjI7MU4Y1M")
console.log(payload)

const verification = jwt.verify(token, jwtPass);
console.log(verification)