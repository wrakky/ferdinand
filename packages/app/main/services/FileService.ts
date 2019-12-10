import * as fs from "fs";

export class FileService {

  public static readFile(path: string): Buffer {
    return fs.readFileSync(path);
  }

  public static readFileString(path: string): string {
    return fs.readFileSync(path, { encoding: 'utf8' });
  }

}
