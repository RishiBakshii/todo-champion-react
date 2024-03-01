import { Stack, useTheme } from "@mui/material"
import { TodoList } from "./features/todos/components/TodoList"

function App(){

  const theme=useTheme()

  return (
    <Stack bgcolor={theme.palette.primary.light} width={'100vw'} height={'100vh'}  justifyContent={'center'} alignItems={'center'}>
      <TodoList/>
    </Stack>
  )
}

export default App