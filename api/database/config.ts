import { connect, set } from 'mongoose';


export const dbConnection = async () => {
    try {
        connect(process.env.DB_CNN || '').then(() => console.log('DB is online'));
        set('strictQuery', false);
        console.log('DB online');
    } catch (error) {
        console.log(error);
        throw new Error('Error al iniciar la base de datos')
    }
}
set('strictQuery', false);


