import mongoose from 'mongoose';
import config from './config';
import { app } from './app';

async function main() {
  try {
    const { ConnectionStates } = await mongoose.connect(
      config.database_url_atlas as string,
    );

    if (ConnectionStates.connected) {
      console.log('Db is connected');
    }

    app.listen(config.port, () => {
      console.log(`App is listening at http://localhost:${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();
