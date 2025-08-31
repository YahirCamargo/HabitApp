import Navigation from "./navigation/Navigation.js"
import {createTables} from './db/DbConnection.js'
import { Children } from "react";

export default function App() {
  return (
      createTables({
        children:<Navigation />
      })
  );
};
