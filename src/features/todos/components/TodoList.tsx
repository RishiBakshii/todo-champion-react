import AddIcon from '@mui/icons-material/Add';
import AddCardIcon from '@mui/icons-material/AddCard';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Button, IconButton, Stack, TextField, Typography, useMediaQuery, useTheme } from "@mui/material";
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import BackspaceIcon from '@mui/icons-material/Backspace';
import { useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import {motion, AnimatePresence} from 'framer-motion'
import { TodoItem } from './TodoItem';
import { getSections, getTodos, saveSections, saveTodos } from '../../../utils/utils';



export const TodoList = () => {

    // theme
    const theme=useTheme()

    // breakpoints
    const is769=useMediaQuery(theme.breakpoints.down(769))
    const is480=useMediaQuery(theme.breakpoints.down(480))

    // form toggle states
    const [isSectionForm,setIsSectonForm]=useState<boolean>(false)
    const [isTodoForm,setIsTodoForm]=useState<boolean>(false)
    const [isDeleteSection,setIsDeleteSection]=useState<boolean>(false)

    // sections && todos
    const [sections,setSections]=useState<Array<SectionType>>(getSections())
    const [todos,setTodos]=useState<Array<TodoItemType>>(getTodos())

    // selected Section
    const [selectedSection, setSelectedSection] = useState<SectionType['name']>('');

    // (new section value) && (new todo value)
    const [newSectionVal,setNewSectionVal]=useState<SectionType["name"]>('')
    const [newTodoVal,setNewTodoVal]=useState<TodoItemType['title']>('')


    useEffect(()=>{
        setSelectedSection(sections[0]?.name)
        saveSections(sections)
    },[sections])

    useEffect(()=>{
        saveTodos(todos)
    },[todos])


    const handleAddTodo=():void=>{

        const newTodo:TodoItemType={
            id:String(new Date()),
            section:selectedSection,
            isCompleted:false,
            title:newTodoVal
        }

        setNewTodoVal('')
        setIsTodoForm(false)
        setTodos(prev=>[...prev,newTodo])

    }

    const handleDeleteTodo=(id:TodoItemType['id']):void=>{
        setTodos(todos.filter(todo=>todo.id!==id))
    }

    const handleUpdateTodo=(id:TodoItemType['id'],newTitle:TodoItemType['title']):void=>{
        setTodos(todos.map(todo=>todo.id===id?{...todo,title:newTitle}:todo))
    }

    const handleToggleCompleteTodo=(id:TodoItemType['id'],isCompleted:TodoItemType['isCompleted']):void=>{
        setTodos(todos.map(todo=>todo.id===id?{...todo,isCompleted}:todo))
    }

    const handleAddSection=():void=>{
        const newSection:SectionType={
            id:String(new Date()),
            name:newSectionVal
        }
        setIsSectonForm(false)
        setNewSectionVal('')
        setSections(prev=>[...prev,newSection])
    }

    const handleDeleteSection=()=>{
        setIsDeleteSection(false)
        setTodos(todos.filter(todo=>todo.section!==selectedSection))
        setSections(sections.filter(section=>section.name!==selectedSection))
    }
    

    const actions = [
        { icon: <AddIcon/>, name: 'Add Todo' ,func:()=>setIsTodoForm(!isTodoForm)},
        { icon: <AddCardIcon />, name: 'Add Section' ,func:()=>setIsSectonForm(!isSectionForm)},
        { icon: <BackspaceIcon sx={{color:'red'}}/>, name: 'Delete Section' ,func:()=>setIsDeleteSection(!isDeleteSection)},
      ];

  return (
    <Stack bgcolor={theme.palette.primary.dark} height={'100%'} width={is769?'100%':'40rem'} position={'relative'}>

        {/* section and todo items todo items */}
        <Stack sx={{overflowY:'scroll'}} height={'49rem'} rowGap={2}>

            <TabContext value={selectedSection}>

                <Box sx={{width:"100%",zIndex:1, borderBottom: 1, borderColor: 'divider' ,position:"sticky",top:0,backgroundColor:theme.palette.primary.dark}}>
                    <TabList variant='scrollable' sx={{color:'whitesmoke'}} onChange={(_,value)=>{setSelectedSection(value)}} aria-label="todo-sections">
                        {
                            sections.map(section=>(
                                <Tab sx={{color:'white'}} key={section.id} label={section.name} value={section.name}/>
                            ))
                        }
                    </TabList>
                </Box>
                
                {
                    sections.map(section=>(
                        <TabPanel value={section.name} sx={{bgcolor:theme.palette.primary.light,p:0}}>
                            <Stack>
                                {
                                    todos.map(todo=>{
                                        if(todo.section===selectedSection){
                                            return <TodoItem todo={todo} handleDeleteTodo={handleDeleteTodo} handleUpdateTodo={handleUpdateTodo} handleToggleCompleteTodo={handleToggleCompleteTodo}/>
                                        }
                                    })
                                }
                            </Stack>
                        </TabPanel>
                    ))
                }

            </TabContext>

        </Stack>

        {/* add section form */}
        <AnimatePresence>
        {
            isSectionForm && 
            <motion.div
                variants={{
                    hide:{y:50,rotate:"-5deg",opacity:0},
                    show:{y:0,rotate:"0deg",opacity:1}
                }}
                transition={{type:'spring'}}
                initial='hide'
                animate="show"
                exit='hide'

                style={{alignSelf:'center',position:'absolute',bottom:0,top:0}}

            >

                <Stack p={2} rowGap={2} bgcolor={theme.palette.primary.light} width={is480?'17rem':'20rem'}>
                    <Stack flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
                        <Typography color={'whitesmoke'} variant='h6'>Add Section</Typography>
                        <IconButton onClick={()=>setIsSectonForm(false)}><CloseIcon sx={{color:'whitesmoke'}}/></IconButton>
                    </Stack>
                    <TextField onKeyDown={e=>e.key==='Enter' && newSectionVal.trim()!==''?handleAddSection():''} value={newSectionVal} onChange={e=>setNewSectionVal(e.target.value)} autoFocus inputProps={{style:{color:'whitesmoke'}}}/>
                    <Button onClick={handleAddSection} disabled={!newSectionVal.trim()} variant='outlined'>Add</Button>
                </Stack>

            </motion.div>

        }
        </AnimatePresence>

        {/* Add Todo Form */}
        <AnimatePresence>

        {
            isTodoForm && 
            <motion.div
                variants={{
                    hide:{y:50,rotate:"-5deg",opacity:0},
                    show:{y:0,rotate:"0deg",opacity:1}
                }}
                transition={{type:'spring'}}
                initial='hide'
                animate="show"
                exit='hide'

                style={{alignSelf:'center',position:'absolute',bottom:0,top:0}}

            >

                <Stack p={2} rowGap={2} bgcolor={theme.palette.primary.light} width={is480?'17rem':'20rem'}>
                    <Stack flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
                        <Typography color={'whitesmoke'} variant='h6'>Add Todo</Typography>
                        <IconButton onClick={()=>setIsTodoForm(false)}><CloseIcon sx={{color:'whitesmoke'}}/></IconButton>
                    </Stack>
                    <TextField onKeyDown={e=>e.key==='Enter' && newTodoVal.trim()!==''?handleAddTodo():''} value={newTodoVal} onChange={e=>setNewTodoVal(e.target.value)} InputProps={{style:{color:'whitesmoke'}}} multiline rows={4} autoFocus inputProps={{style:{color:'whitesmoke'}}}/>
                    <Button disabled={!newTodoVal.trim()} onClick={handleAddTodo} variant='outlined'>Add</Button>
                </Stack>

            </motion.div>

        }




        </AnimatePresence>

        {/* Delete section Form */}
        <AnimatePresence>

        {
            isDeleteSection && 
            <motion.div
                variants={{
                    hide:{y:50,rotate:"-5deg",opacity:0},
                    show:{y:0,rotate:"0deg",opacity:1}
                }}
                transition={{type:'spring'}}
                initial='hide'
                animate="show"
                exit='hide'

                style={{alignSelf:'center',position:'absolute',bottom:0,top:0}}

            >

                <Stack p={2} rowGap={2} bgcolor={theme.palette.primary.light} width={is480?'17rem':'20rem'}>
                    <Stack flexDirection={'row'} justifyContent={'space-between'}>
                        <Typography color={'whitesmoke'} variant='h6'>Do you really want to delete {selectedSection} section?</Typography>
                        <IconButton sx={{alignSelf:'flex-start'}}  onClick={()=>setIsDeleteSection(false)}><CloseIcon sx={{color:'whitesmoke'}}/></IconButton>
                    </Stack>
                    <Typography color={'error'} fontSize={'.8rem'}>*All todos of this section will be deleted</Typography>

                    <Stack flexDirection={'row'} alignSelf={'flex-end'} columnGap={is480?1:2}>
                        <Button onClick={handleDeleteSection} variant='outlined'>Yes</Button>
                        <Button onClick={()=>setIsDeleteSection(false)} color='error' variant='outlined'>Cancel</Button>
                    </Stack>
                </Stack>

            </motion.div>

        }




        </AnimatePresence>

        {/* Speed dial */}
        <Stack p={2} >
            <SpeedDial direction='left' ariaLabel="SpeedDial basic example" icon={<SpeedDialIcon />} >
                {actions.map((action) => {
                    if(!sections.length || !selectedSection){
                        if(action.name==='Add Section')
                        return <SpeedDialAction onClick={action.func} key={action.name} icon={action.icon} tooltipTitle={action.name}/>
                    }
                    else{
                        return <SpeedDialAction onClick={action.func} key={action.name} icon={action.icon} tooltipTitle={action.name}/>
                    }
                })}
            </SpeedDial>
        </Stack>

    </Stack>
  )
}
