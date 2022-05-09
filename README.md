# ILIKIA

*Ilikia* is an exam application tool for elderly care. It was developed as a prototype proposal for the Club del Abuelo elderly care home in Zapopan, México.

Users can apply Mini-Mental State Examinations to assess a patient's mental condition. Geriatricians and other medical staff can consult these results from within the app.

## Features

- Take Mini-Mental State Examinations
- Store results including date on a per-user basis
- Display results from a geriatician's assigned patients

## How to run

1. Make sure an `ilikia` database with the tables in `server/Ilikia.sql` exists in your local MySQL server

    - Optional: Add the data contained in `server/test_data.sql` to experiment

2. Open a command line window at the root of the project

3. Install all *server* dependencies and run

        npm install
        npm start

4. Open another command line window and navigate to the client folder

        cd client/

5. Install all *client* dependencies and run

        npm install
        npm start

## Tech stack

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![MySQL](https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&color=black&logoColor=white)