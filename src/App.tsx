import './App.css'

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './components/ui/card'
import DialogAddTaskButton from './components/add-task'

function App() {
  return (
    <Card className='w-[350px] h-[400px]'>
      <CardHeader className='flex flex-col'>
        <CardTitle>Todo List</CardTitle>
        <CardDescription>Manage you tasks</CardDescription>
      </CardHeader>
      <CardContent>
        Content
      </CardContent>
      <CardFooter className='flex justify-end mt-auto'>
        <DialogAddTaskButton />
      </CardFooter>

    </Card>

  )
}

export default App
