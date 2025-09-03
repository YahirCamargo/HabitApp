
//Hice la funcion sincrona, si da error volver a poner asincrono
export const createTables = async (db) => {
  return (
    //Poner en la tabla habitos, algo para que el usuario sepa si minutos, segundos, horas, unidades
    
    db.execAsync(
     `
      CREATE TABLE IF NOT EXISTS habits(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        created_at TEXT DEFAULT (datetime('now')),
        goal INTEGER NOT NULL,
        goal_unit TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS habit_completions(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        habit_id INTEGER NOT NULL,
        date TEXT NOT NULL,
        progress INTEGER DEFAULT 0,
        FOREIGN KEY(habit_id) REFERENCES habits(id)
      );
    `)
  );
};

export const borrarDespuesDeUsarBorrarTablas = async (db) => {
  await db.runAsync("DROP TABLE IF EXISTS habit_completions");
  await db.runAsync("DROP TABLE IF EXISTS habits");
};

export const checkIfCompletionExists = async (db,habitId,today) => {
  const result = await db.getAllAsync("SELECT * FROM habit_completions WHERE habit_id=? AND date=?",
    [habitId,today]
  );
  return result.length > 0 ? true : false;
};

export const insertHabitToComplete = async (db, habitId, today) => {
  await db.runAsync("INSERT INTO habit_completions(habit_id,date) VALUES(?,?)",
    [habitId,today]
  );
};

export const createHabit = async (db, {habitName,habitGoal,habitGoalUnit}) =>{
  const result = await getIdOfHabitByName(db,{habitName});
  if(!habitName || !habitGoal || !habitGoalUnit){
    console.log('All data is necesary');
    return 0;
  }
  if(result==null){
    await db.runAsync("INSERT INTO habits(name,goal,goal_unit) VALUES(?,?,?)",
        [habitName,habitGoal,habitGoalUnit]
      );
      console.log('Added habit');
      return 0;
  }
  console.log('There is another habit with the same name');
  return null;
};

export const getAllHabits = async(db) =>{
  const result = await db.getAllAsync("SELECT * FROM habits;");
  return result;
};

export const getHabitsWithOutCompleteByDate = async (db,habitDate) =>{
  const result = await db.getAllAsync("SELECT h.id,h.name,h.goal_unit,h.goal,hc.progress FROM habits AS h JOIN habit_completions AS hc ON h.id=hc.habit_id WHERE h.goal>hc.progress AND hc.date=?;",
    [habitDate]
  );
  return result;
}

export const getIdOfHabitByName = async (db,{habitName}) => {
  const result = await db.getAllAsync("SELECT * FROM habits where name=?",
    [habitName]
  );
  return result.length > 0 ? result[0] : null;
};

export const updateProgressHabitByName = async (db,habitId,habitProgress,habitDate) => {
  await db.runAsync("UPDATE habit_completions SET progress=? WHERE habit_id=? AND date=?",
    [habitProgress,habitId,habitDate]
  );
  console.log(`Se actualizo ${habitId} con progreso ${habitProgress}`);
}

export const addHabitCompletion = async (db,{habitDate,habitProgress,habitId}) => {
  await db.runAsync("INSERT INTO habit_completions(date,progress,habit_id) VALUES(?,?,?)",
      [habitDate,habitProgress,habitId]
    );
};
