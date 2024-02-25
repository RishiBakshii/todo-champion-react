import { Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import { TodoList } from "./features/todo/components/TodoList";
import {motion} from 'framer-motion'

function App() {

  // theme
  const theme=useTheme()

  // breakpoints
  const is480=useMediaQuery(theme.breakpoints.down(480))

  return (
    <Stack p={is480?0:2}  bgcolor={theme.palette.primary.light} height={'100vh'} justifyContent={'center'} alignItems={'center'}>
      
      {/* <Stack mt={4} justifyContent={'flex-start'} alignItems={'flex-start'}>
          <motion.div initial={{y:20}} animate={{y:0}} transition={{delay:.7}}>
            <Typography variant="h3" fontWeight={700} color={'#7f7ff7'}>Todo Champion</Typography>
          </motion.div>

          <motion.div initial={{x:-40,opacity:0}} animate={{x:0,opacity:1}} transition={{delay:1.5}}>
              <Typography variant="body2" fontWeight={400} color={'#c9c9ea'}>Manage your task like a champ!</Typography>
          </motion.div>
      </Stack> */}

      <TodoList/>

    </Stack>
  );
}

export default App;
