import {useRoutes } from "react-router-dom";
import routes from "./routes/index";
import { Suspense } from "react";

function App() {
  const element = useRoutes(routes)
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className='h-full'>{element}</div>
    </Suspense>
  )
}

export default App;
