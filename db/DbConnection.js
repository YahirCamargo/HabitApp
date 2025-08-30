import { SQLiteProvider } from "expo-sqlite";

export const createTables = () => {
  return (
    <SQLiteProvider
      databaseName="userDatabase.db"
      onInit={async (db) => {
        await db.execAsync(`
            CREATE TABLE IF NOT EXISTS habits(
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              name TEXT NOT NULL,
              created_at TEXT DEFAULT (datetime('now')),
              goal INTEGER
            );
            CREATE TABLE IF NOT EXISTS habit_completions(
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              habit_id INTEGER NOT NULL,
              date TEXT NOT NULL,
              progress INTEGER DEFAULT 0,
              FOREIGN KEY(habit_id) REFERENCES habits(id)
            );
          `);
      }}
      options={{ useNewConnection: false }}
    />
  );
};

export const createHabit = async (db, {habitName,habitGoal}) =>{
  const result = await getIdOfHabitByName(db,{habitName});
  if(!habitName || !habitGoal){
    console.log('All data is necesary');
    return;
  }
  if(result==null){
    await db.runAsync("INSERT INTO habits(name,goal) VALUES(?,?)",
        [habitName,habitGoal]
      );
      console.log('Added habit');
      return;
  }
  console.log('There is another habit with the same name');
};

export const getAllHabits = async(db) =>{
  const result = await db.getAllAsync("SELECT * FROM habits;");
  return result;
};

export const getIdOfHabitByName = async (db,{habitName}) => {
  const result = await db.getAllAsync("SELECT * FROM habits where name=?",
    [habitName]
  );
  return result.length > 0 ? result[0] : null;
};

export const addHabitCompletion = async (db,{habitDate,habitProgress,habitId}) => {
  await db.runAsync("INSERT INTO habit_completions(date,progress,habit_id) VALUES(?,?,?)",
      [habitDate,habitProgress,habitId]
    );
};
