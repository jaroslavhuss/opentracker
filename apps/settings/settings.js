const fs = require("fs");
const path = require("path");


const dotEnvReader = async () => {
    console.log("\x1b[32m%s\x1b[0m", "1. Starting the process");
    try {
        console.log("\x1b[32m%s\x1b[0m", "2. Checking for .env file at path " + __dirname + "/.env");

        const dotEnv = fs.readFileSync(
            __dirname + "/.env",
            "utf-8"
        );

        if(dotEnv){
            console.log("\x1b[32m%s\x1b[0m", "3. Found .env file");
        }

        console.log("\x1b[32m%s\x1b[0m", "4. Checking for JWT_SECRET, JWT_REFRESH_SECRET and JWT_EXPIRE in .env file")
        const dotEnvStatus = stringModelChecker(dotEnv);

        console.log("\x1b[32m%s\x1b[0m", "5. checking if .env is valid:  "+ dotEnvStatus)
       
    

        console.log("\x1b[32m%s\x1b[0m", "5. Writing .env file to api/dist/src/.env in path " + path.join(__dirname, "../", "api", "dist", "src", ".env") );

        const status = fs.writeFileSync(
            path.join(__dirname, "../", "api", "dist", "src", ".env"),
            dotEnv
        );

       console.log("\n")
        console.log("\x1b[32m%s\x1b[0m", "6. Seems like no problem found - check please if .env is in ./apps/api/dist/src/.env - otherwise manually add it!" );

        console.log("\n")
        return true;
    } catch (error) {

        if(error.code === "ENOENT"){
            noDotEnv();
        }
        return false;
    }
};

dotEnvReader();
function noDotEnv() {
    console.log("\x1b[31m%s\x1b[0m", "\n======================================");
    console.log("\x1b[31m%s\x1b[0m", "\nNo .env file found. Please create one.");
    console.log(
        "\x1b[31m%s\x1b[0m",
        "There has to be file called '.env' in ./apps/settings/.env\n"
    );
    console.log("\x1b[31m%s\x1b[0m", "======================================\n");
}

function stringModelChecker(string) {
    const regex = /JWT_SECRET = .*/g;
    const JWT_SECRET_STATUS = regex.test(string);

    if (!JWT_SECRET_STATUS) {
        console.log(
            "\x1b[31m%s\x1b[0m",
            "\n======================================"
        );
        console.log(
            "\x1b[31m%s\x1b[0m",
            "\n JWT_SECRET is missing in .env file. Please add it."
        );
        console.log(
            "\x1b[31m%s\x1b[0m",
            "======================================\n"
        );
        return false;
    }

    const regex2 = /JWT_REFRESH_SECRET = .*/g;
    const JWT_REFRESH_SECRET_STATUS = regex2.test(string);
    if (!JWT_REFRESH_SECRET_STATUS) {
        console.log(
            "\x1b[31m%s\x1b[0m",
            "\n======================================"
        );
        console.log(
            "\x1b[31m%s\x1b[0m",
            "\n JWT_REFRESH_SECRET is missing in .env file. Please add it."
        );
        console.log(
            "\x1b[31m%s\x1b[0m",
            "======================================\n"
        );
        return false;
    }

    const regex3 = /JWT_EXPIRE = .*/g;
    const JWT_EXPIRE_STATUS = regex3.test(string);
    if (!JWT_EXPIRE_STATUS) {
        console.log(
            "\x1b[31m%s\x1b[0m",
            "\n======================================"
        );
        console.log(
            "\x1b[31m%s\x1b[0m",
            "\n JWT_EXPIRE is missing in .env file. Please add it."
        );
        console.log(
            "\x1b[31m%s\x1b[0m",
            "======================================\n"
        );
        return false;
    }

    return true;
}
  
