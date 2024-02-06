import * as fs from "fs";
import * as path from "path";

/**
 * Dear developer, admin, or whoever is reading this.
 *
 * We have prepared this file for you to configure the settings of your app. This is the only file you need to edit.
 */

const dotEnvReader = async (): Promise<boolean> => {
  try {
    const dotEnv = await fs.promises.readFile(".env", "utf-8");

    const dotEnvStatus = stringModelChecker(dotEnv);

    if (!dotEnvStatus) {
      noDotEnv();
      return false;
    }

    const status = await fs.promises.writeFile(
      path.join(__dirname, "../", "api", "dist", "src", ".env"),
      dotEnv
    );

    console.log(status);

    return true;
  } catch (error) {
    if (error.message.includes("No such file")) {
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

function stringModelChecker(string: string): boolean {
  //string must contain JWT_SECRET = anything (string)
  const regex = /JWT_SECRET = .*/g;
  const JWT_SECRET_STATUS: boolean = regex.test(string);

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
  //string must contain JWT_REFRESH_SECRET = anything (string)
  const regex2 = /JWT_REFRESH_SECRET = .*/g;
  const JWT_REFRESH_SECRET_STATUS: boolean = regex2.test(string);
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
  //string must contain JWT_EXPIRE = anything (string)
  const regex3 = /JWT_EXPIRE = .*/g;
  const JWT_EXPIRE_STATUS: boolean = regex3.test(string);
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
  //string must contain JWT_EXPIRE_REFRESH = anything (string)
  const regex4 = /JWT_EXPIRE_REFRESH = .*/g;
  const JWT_EXPIRE_REFRESH_STATUS: boolean = regex4.test(string);
  if (!JWT_EXPIRE_REFRESH_STATUS) {
    console.log(
      "\x1b[31m%s\x1b[0m",
      "\n======================================"
    );
    console.log(
      "\x1b[31m%s\x1b[0m",
      "\n JWT_EXPIRE_REFRESH is missing in .env file. Please add it."
    );
    console.log(
      "\x1b[31m%s\x1b[0m",
      "======================================\n"
    );
    return false;
  }
  //string must contain DATABASE_URL = anything (string)
  const regex5 = /DATABASE_URL = .*/g;
  const DATABASE_URL_STATUS: boolean = regex5.test(string);
  if (!DATABASE_URL_STATUS) {
    console.log(
      "\x1b[31m%s\x1b[0m",
      "\n======================================"
    );
    console.log(
      "\x1b[31m%s\x1b[0m",
      "\n DATABASE_URL is missing in .env file. Please add it."
    );
    console.log(
      "\x1b[31m%s\x1b[0m",
      "======================================\n"
    );
    return false;
  }
  //string must contain PORT = anything (string)
  const regex6 = /PORT = .*/g;
  const PORT_STATUS: boolean = regex6.test(string);
  if (!PORT_STATUS) {
    console.log(
      "\x1b[31m%s\x1b[0m",
      "\n======================================"
    );
    console.log(
      "\x1b[31m%s\x1b[0m",
      "\n PORT is missing in .env file. Please add it."
    );
    console.log(
      "\x1b[31m%s\x1b[0m",
      "======================================\n"
    );
    return false;
  }

  //if all are true, return true else return false
  if (
    JWT_SECRET_STATUS &&
    JWT_REFRESH_SECRET_STATUS &&
    JWT_EXPIRE_STATUS &&
    JWT_EXPIRE_REFRESH_STATUS &&
    DATABASE_URL_STATUS &&
    PORT_STATUS
  ) {
    return true;
  } else {
    return false;
  }
}
