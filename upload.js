const ftp = require("basic-ftp")
const fs = require("fs")

example()

async function example() {
    const client = new ftp.Client()
    try {
        await client.access({
            host: "xxx",
            user: "root",
            password: "",
            secure: false
        })
        console.log(await client.list())
        await client.upload(fs.createReadStream("index.html"), "index.html")
    }
    catch(err) {
        console.log(err)
    }
    client.close()
}