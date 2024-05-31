import fs from 'fs';

export const errorLogger = (error: any) => {
    const errorMessage = `WebSocket error: ${error.message}\n`;
    console.error(errorMessage);
    fs.appendFile('error.log', errorMessage, (err) => {
      if (err) console.error('Failed to write to log file:', err);
    });
  }
