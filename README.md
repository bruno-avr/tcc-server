To create the database in PGAdmin:
Right click on server -> Register -> Server
- In General -> Name = localhost
- In Connection -> Host name/address = 127.0.0.1
                   Password: 1
- Save
  If you get an error, set a new password doing the following:
  - Open linux terminal, and execute the following commands:
  - sudo -i -u postgres
  - psql
  - \password postgres
  - 1
- npm run migrate

The default .env:
DATABASE_URL="postgresql://postgres:1@localhost:5432/TCC?schema=public"
