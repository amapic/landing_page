const Client = require("ssh2-sftp-client");
const fs = require("fs");
upload("./index.html");
const path = require("path");
// async function example() {
//     let sftp = new Client();
//     sftp.connect({
//       host: "amaurypichat.fr",
//       port: "22",
//       username: "root",
//       password: "prout",
//       privateKey: fs.readFileSync('C:/Users/rotom/Documents/ssh/light_and_shadows/private.ppk')
//     //   algorithms: {
//     //     serverHostKey: ["ssh-dss"],
//     //     kex: ["diffie-hellman-group14-sha1"],
//     //     cipher: ["aes128-cbc"],
//     //   },
//     })
//     .then(() => {
//       sftp.put("./index.html", "/index.html", false);
//     })
//     // .then((data) => {
//     //   console.log(data, "the data info");
//     // })
//     .catch((err) => {
//       console.log(err, "catch error");
//     });

// }

// fs.readdir(directoryPath, function (err, files) {
//handling error
// if (err) {
//   return console.log("Unable to scan directory: " + err);
// }
//listing all files using forEach
const directoryPath = path.join(__dirname, "dist");
async function upload(directoryPath) {
  const sftp = new Client();
  // const sftpSSHKey = fs.readFileSync(keyPath);
  // fs.readdir(directoryPath, function (err, files) {
  //   //handling error
  //   if (err) {
  //       return console.log('Unable to scan directory: ' + err);
  //   }

  
  // console.log(directoryPath);

  try {
    await sftp.connect({
      host: "amaurypichat.fr",
      port: "22",
      username: "root",
      password: "prout",
      privateKey: fs.readFileSync(
        "C:/Users/rotom/Documents/ssh/light_and_shadows/private.ppk"
      ),
      //   host: 'somehost',
      //   port: 'port',
      //   username: 'username',
      //   privateKey: sftpSSHKey,
      //   passphrase: 'passphrase for an encrypted private key',
    });
    console.log("Successfully connected to sftp");
  } catch (error) {
    console.log(error);
  }

  try {
    // const res = await sftp.put(Buffer.from(file), '/root', {
    //   writeStreamOptions: {
    //     flags: 'w',
    //     encoding: null, // use null for binary files
    //   },
    // });
    fs.readdir(directoryPath, async function (err, files) {
      //handling error
      if (err) {
        return console.log("Unable to scan directory: " + err);
      }
      console.log(directoryPath + files, "var/www/" + files);
      // const res = await sftp.put("directoryPath, "var/www/", false);
      console.log("File uploaded successfully");
    });
  } catch (error) {
    console.log(error);
  } finally {
    await sftp.end(); // don't forget to close connection
  }
}
// });
