import * as fs from 'fs';
import { ServiceManager } from './ServiceManager';
import { FileService } from './FileService';
import { UserService } from '../../common/UserService';
import * as path from "path";

export class ServiceController {

  private path: string;
  private services: ServiceManager[] = [];

  constructor(path: string) {
    this.path = `${path}/services.json`;
  }

  loadServices() {
    const servicesExists = fs.existsSync(this.path);
    if (servicesExists) {
      try {
        const userServiceFile = FileService.readFileString(this.path);
        const userServiceList = JSON.parse(userServiceFile) as UserService[];
        const basePath = path.resolve(path.join(__dirname, './services'));
        this.services = userServiceList.map((userService, index) => {
          const service = new ServiceManager(userService, basePath);
          if (index === 0) {
            service.setActive(true);
          }
          return service;
        });
      } catch (e) {
        console.error(e);
      }
    }
  }

  getServices(): ServiceManager[] {
    return this.services;
  }

  getServiceById(id: string): ServiceManager {
    const service = this.services.find(service => service.getId() === id);
    if (!service) {
      throw Error(`Service not found: ${id}`);
    }
    return service;
  }

  setActive(id: string) {
    this.services.forEach(service => {
      service.setActive(service.getId() === id);
    })
  }

  hasCount(): boolean {
    return this.services.some(service => service.getCount() > 0);
  }

  setCount(id: string, count: number) {
    const service = this.getServiceById(id);
    service.setCount(count);
  }

}
