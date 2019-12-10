import * as fs from "fs";
import uuid from 'uuid/v4';
import { FileService } from './FileService';
import { UserService } from '../../common/UserService';

interface ServiceConfig {
  name: string;
  url: string;
}

export class ServiceManager {

  private count = 0;
  private active = false;

  private id: string;
  private config: ServiceConfig;
  private icon: string;
  private script: string;

  private type: string;
  private session?: string;
  private muted: boolean;

  constructor(private service: UserService, private basePath: string) {
    this.id = `${service.type}-${service.session}-${uuid()}`;
    this.type = service.type;
    this.session = service.session;
    this.muted = service.muted || false;
    this.config = this.loadConfig();
    this.icon = this.loadIcon();
    this.script = this.loadScript();
  }

  private filePath(filename: string): string {
    return `${this.basePath}/${this.type}/${filename}`;
  }

  private readFile(filename: string): Buffer {
    return FileService.readFile(this.filePath(filename));
  }

  private readFileString(filename: string): string {
    return FileService.readFileString(this.filePath(filename));
  }

  private loadConfig(): ServiceConfig {
    return JSON.parse(this.readFileString('config.json')) as ServiceConfig;
  }

  private loadIcon(): string {
    const base64 = Buffer.from(this.readFile('icon.png')).toString('base64');
    return `data:image/png;base64,${base64}`;
  }

  private loadScript(): string {
    return this.filePath('script.js');
  }

  public getType(): string {
    return this.type;
  }

  public getId(): string {
    return this.id;
  }

  public getName(): string {
    return this.config.name;
  }

  public getUrl(): string {
    return this.config.url;
  }

  public getScript(): string {
    return this.script;
  }

  public getIcon(): string {
    return this.icon;
  }

  public setCount(count: number) {
    this.count = count;
  }

  public getCount(): number {
    return this.count;
  }

  public setActive(active: boolean) {
    this.active = active;
  }

  public getActive(): boolean {
    return this.active;
  }

  public getSession(): string | undefined {
    return this.session;
  }

  public getMuted(): boolean {
    return this.muted;
  }

}
