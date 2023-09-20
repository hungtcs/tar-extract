import { join } from "path";
import { extract } from "../lib";

extract(join(__dirname, "./00.tar.gz"), join(__dirname, "./00/")).catch((err) =>
  console.error("extract failed: ", err)
);
