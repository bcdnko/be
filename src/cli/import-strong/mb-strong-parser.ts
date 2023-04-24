import { IStrongWord } from 'core/interfaces/Bible.interfaces';

const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3');

export abstract class MbStrongParser {
  total = 0;
  current = 1;

  private dataPath: string;
  private db;

  constructor(dataPath: string, parserDir: string) {
    this.dataPath = dataPath;
  }

  private getDb(): Promise<any> {
    return new Promise((resolve, relect) => {
      if (this.db) {
        resolve(this.db);
      } else {
        this.connect(this.dataPath)
          .then(() => this.countEntries())
          .then((result) => {
            this.total = result.total;
            resolve(this.db);
          });
      }
    });
  }

  private connect(dataPath: string): Promise<void> {
    const files = fs.readdirSync(dataPath);
    if (files.length !== 1) {
      throw new Error('Unexpected files amount (expect only one sqlite file)');
    }

    const dbPath = path.join(dataPath, files[0]);
    return new Promise((resolve, reject) => {
      this.db = new sqlite3.Database(dbPath, (err) => {
        if (err) {
          reject(err);
        }
        resolve();
      });
    });
  }

  private countEntries(): Promise<any> {
    return new Promise((resolve, reject) => {
      const sql = 'select count(*) as total from dictionary order by topic';
      this.db.get(sql, [], (err, rows) => {
        if (err) {
          reject(err);
        }
        resolve(rows);
      });
    });
  }

  private async getRow(): Promise<any> {
    const db = await this.getDb();
    return new Promise((resolve, reject) => {
      const sql = 'select * from dictionary order by topic LIMIT ?,1';
      db.get(sql, [this.current], (err, row) => {
        if (err) {
          reject(err);
        }
        this.current++;
        resolve(row);
      });
    });
  }

  async parseStrong(): Promise<IStrongWord> {
    const row: any = await this.getRow();
    if (!row) {
      return undefined;
    }

    return {
      id: row.topic,
      word: row.lexeme,
      pron: row.pronunciation,
      pronAlt: row.transliteration,
      meaning: row.definition,
    };
  }
}
