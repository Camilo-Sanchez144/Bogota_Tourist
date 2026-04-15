import app from './app'
import { AppDataSource } from './db/conexion';
import "reflect-metadata";

async function main(){
    try{
        await AppDataSource.initialize()
        console.log('Base conectada')
        app.listen(6505, () => {
        console.log('server activo');
        });
    }catch(err){
        if(err instanceof Error){
            console.log(err.message);
        }
    }
}

main();