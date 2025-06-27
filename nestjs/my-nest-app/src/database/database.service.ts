import { Injectable ,OnModuleInit,OnApplicationShutdown} from '@nestjs/common';  // this OnModuleInit, OnApplicationShutdown are interfaces , inside these interfaces , we have methods onModuleInit and onApplicationShutdown

@Injectable()
export class DatabaseService {
    private isConnected = false;

    onModuleInit(){    // now it is special method , it will be called on a special event which is when this service/module loads 
        this.isConnected = true;
        console.log('database connected ')
    }

    onApplicationShutdown(signal: string){ // this will be called when our app will be closed // signal parameter is passed which tells how the application is shutdown , by user using ctrl c , or by production side server shutdown
        this.isConnected = false;
        console.log(`database disconned due to app shutdown. Signal ${signal}`) 
        // if we shut down using ctrl c then we get signal as SIGINT which means we shutdown our application manually 
    }

    //  nest js can't directly execute OnApplicationShutdown method .  We need to tell in main.ts that shutdown lifecycle methods should be implemented successfuly
    getStatus(){
        return this.isConnected? 'connected' : 'disconnected';
    }

}
