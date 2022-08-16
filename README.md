## Image Processing Api
###### Command line
to install packages use command: 

    npm install
to run server use command:

    npm run start
to build server use command: 

    npm run build
to watch server use command: 

    npm run watch
    
to run test use commant: 

    npm run test
        
###### Notes
###### to create two databases for development and testing using postgresql, please run below commands in terminal:

    sudo -u postgres psql
    
    CREATE DATABASE database_name;

    CREATE DATABASE database_name_test;

###### database default port to connect database is 5432 and default port for server is 3000

###### to run migration use

     db-migrate up

###### you will find file which called .env-example you can duplicate it to crate .env and use your own configuration or you can copy the below with your own configuration

    POSTGRES_HOST=
    PORT=
    POSTGRES_DB=
    POSTGRES_DB_TEST=
    POSTGRES_USER=
    POSTGRES_PASSWORD=
    BCRYPT_PASSWORD=
    SALT_ROUNDS=
    TOKEN_SECRET=
    ENV='dev'
    DATABASE_PORT=