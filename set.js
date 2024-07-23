const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiV0VjWE43M3R4Nm5icTRueXF6MGpEcDFSVzZyYW96VGVBeldTS0xXMzRXZz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiN0JPcFlHblFSb1d6ZDJ0YjRmQXJ2ZWNLSURoNzNvNTlnc2JPaVdaSVBHQT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ3RmM1UmtlMVRMNU9kcjZZMi9qeTc3UUhQWVNSdjlKcFNlYVBVNE1hN1ZBPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJiMWNSYzNYTi9ObUkzT2g5TW1iV0c4cFhkb1V6T1ovMkdScENMMmY3V3hRPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlNORnlSaWl5UDl4V2x3U1pQeEg5TEM1anA1ZXo3TFNSSjZpbDJ0aHYxR3c9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImNqSUFEdDBLcjMvbHNYcDkrZEVRYzNaVlVtMUpRQkoxdWdsWklpVUYyR1k9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVUdPWEVxM055T2pyQU14K2FVd2I0S1JEWHBaSVFPL1E0OGNpTkFYR1hIRT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTUZ2bXNrTkUzbXljd3RmU2tUbkMxQ1RFWUNiZVZSYm9JMUdoVXNKUmloYz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InBBdm1nZ1VXckRLa2I3cFFrK2lVVDZ3dWI4WHpwNC9HS2VtVi92U2gxUWJDTEhkWkVOTm1vYklvRFp6eDJJMkgyZEhCS0RKVTV0dkd0S042SUc1MGdnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NTgsImFkdlNlY3JldEtleSI6InBzclNkbjBWOUt0cVFDcmV1aDQraEIxT2lSUlp5dVo4YmNUaVBqN0R4LzA9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6InFWLTduYlc4UkFDUE5LeFVueWE3cHciLCJwaG9uZUlkIjoiMDQwNmU0ODYtMjRmYS00YmI5LTg2OTYtZTFjOWU4NGFhYWZjIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InVqQ2hIRHVpZlM1akVvd1dRTWQ1OS9YcTJmYz0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI5bXVxSHVmZ0k4Mnl6bkRXdG1MSnpOS3hiMHc9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiVFYyTjYyODIiLCJtZSI6eyJpZCI6IjI1Njc0MzM5MTU2Njo0NUBzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiJHb29nbGUifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ09UaHQzY1F0L1Q4dEFZWUF5QUFLQUE9IiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IlBWVWVCWFhrNHRFNmVpeWlXclRXbVFSQTE0bTRwelJxL3krSTdQOXRWZ2s9IiwiYWNjb3VudFNpZ25hdHVyZSI6Ik5ldVMxak80ckIvdm5ETGpmSlpTN2kxY2F6RTcxU0x2TStHZEJTemVWZkVyeWNyV2tRYnEzWk5iWHpUdlcyb2pCMys0bVUzajZpQ0txRndSd01KSEN3PT0iLCJkZXZpY2VTaWduYXR1cmUiOiJYSHM3WFdTamt6TW1uMkpLZWxIa3p3MFFJa2RaTmlyRjRmeXViNWtsa1lWL1NNM3NMakZ2QTJJQmU1dWtJY1NuZDJ1clR2bmhnZjV0d1djSXE5aEdodz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI1Njc0MzM5MTU2Njo0NUBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJUMVZIZ1YxNU9MUk9ub3NvbHEwMXBrRVFOZUp1S2MwYXY4dmlPei9iVllKIn19XSwicGxhdGZvcm0iOiJzbWJhIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzIxNzExMTcyfQ==',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Godson256",
    NUMERO_OWNER : process.env.OWNER_NUM || "25674391566",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'TKM bot',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/e07a3d933fb4cad0b3791.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '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',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    TZ : process.env.TIME_ZONE || 'Etc/GMT',
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    BOOM_MESSAGE_LIMIT : process.env.BOOM_MESSAGE_LIMIT || 100,
    PORT : process.env.PORT || 8000,
    LINK : process.env.LINK || '',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://tkm:Aqi6tqwyv5IwDHncTtVi5XtMGZvfndDJ@dpg-cqahogtds78s739sl81g-a.oregon-postgres.render.com/takudzwa" : "postgresql://tkm:Aqi6tqwyv5IwDHncTtVi5XtMGZvfndDJ@dpg-cqahogtds78s739sl81g-a.oregon-postgres.render.com/takudzwa",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`update ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
