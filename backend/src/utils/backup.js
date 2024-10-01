const fs = require('fs');
const { exec } = require('child_process');
const path = require('path');


async function createBackupDb() {
    
  try {
    const date = new Date();
    const dayOfWeek = date.getDay(); // Obtenemos el día de la semana (0=Domingo, 6=Sábado)
    const backupFolderPath = `./backup/day-${dayOfWeek}`; // Sobreescribimos por día de la semana

    // Verifica si el directorio de backup existe, si no, lo crea
    if (!fs.existsSync('./backup')) {
      fs.mkdirSync('./backup');
    }

    const command = mongodump `--uri ${process.env.COPY_DB} --out ${backupFolderPath}`;

    try {
      const { stdout, stderr } = await exec(command);
      console.log("Backup successful:", stdout);
      return true;
    } catch (err) {
      console.error("Error during backup:", err);
      return false;
    }
  } catch (err) {
    console.error("Error:", err);
    return false;
  }
}


module.exports = { createBackupDb };