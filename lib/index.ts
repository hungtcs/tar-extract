import fs from "fs";
import tar from "tar-stream";
import { join } from "path";
import gunzip from "gunzip-maybe";

export function extract(path: string, dest: string) {
  return new Promise<void>((resolve, reject) => {
    fs.createReadStream(path)
      .on("error", (err) => {
        reject(err);
      })
      .pipe(gunzip())
      .on("error", (err) => {
        reject(err);
      })
      .pipe(tar.extract())
      .on("error", (err) => {
        reject(err);
      })
      .on("finish", () => {
        resolve();
      })
      .on("entry", (header, stream, next) => {
        switch (header.type) {
          case "file": {
            stream
              .pipe(fs.createWriteStream(join(dest, header.name)))
              .on("error", (err) => {
                reject(err);
              })
              .on("finish", () => {
                next();
              });
            break;
          }
          case "symlink": {
            fs.symlink(header.linkname!, join(dest, header.name), (err) => {
              if (err) {
                reject(err);
              }
              next();
            });
            break;
          }
          case "directory": {
            fs.mkdir(join(dest, header.name), { mode: header.mode }, (err) => {
              if (err) {
                reject(err);
                return;
              }
              next();
            });
            break;
          }
          default: {
            console.warn(`ignore type "${header.type}": ${header.name}`);
            next();
            break;
          }
        }
      });
  });
}
