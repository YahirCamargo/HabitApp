import Navigation from "./navigation/Navigation.js"
import { SQLiteProvider } from "expo-sqlite";

export default function App() {
  return (
    <SQLiteProvider databaseName="userDatabase.db">
      <Navigation />
    </SQLiteProvider>
  );
};
