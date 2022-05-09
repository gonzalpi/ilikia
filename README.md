# Ilikia

*Ilikia* is an exam application tool for elderly care. It was developed as a prototype proposal for the Club del Abuelo elderly care home in Zapopan, México.

Users can apply Mini-Mental State Examinations to assess a patient's mental condition. Geriatricians and other medical staff can consult these results from within the app.

## Features

- Take Mini-Mental State Examinations
- Store results including date on a per-user basis
- Display results from a geriatician's assigned patients

## How to run

1. Make sure an `ilikia` database with the tables in `server/Ilikia.sql` exists in your local MySQL server

    - Optional: Add the data contained in `server/test_data.sql` to experiment

2. Run the following in a command line at the root of the project

        npm install
        npm run build
        npm start

3. Open web app on `localhost:3001`


## Tech stack

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![MySQL](https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&color=black&logoColor=white)