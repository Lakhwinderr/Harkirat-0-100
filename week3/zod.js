const z = require("zod")

const mySchema = z.object(
    {
        username: z.string().email(),
        password: z.string()
    }
)

console.log(mySchema.safeParse({
    username: "lakhwinder.code@gmail.com",
    password: "123"
}).success)