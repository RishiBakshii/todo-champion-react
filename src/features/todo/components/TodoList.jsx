import { Button, IconButton, Stack, TextField, Typography, useMediaQuery, useTheme } from '@mui/material'
import React, { useEffect,useState } from 'react'
import { TodoItem } from './TodoItem'
import { motion, AnimatePresence } from 'framer-motion'
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import AddIcon from '@mui/icons-material/Add';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import BackspaceIcon from '@mui/icons-material/Backspace';
import CloseIcon from '@mui/icons-material/Close';


const animationVariants={
    hide:{y:40,opacity:0,rotate:"4deg"},
    show:{y:0,opacity:1,rotate:'0deg',y:0}
}

const formStyles={
    justifySelf:'center',
    alignSelf:'center'
}


export const TodoList = () => {
    
    // theme
    const theme=useTheme()

    // breakpoints
    const is820=useMediaQuery(theme.breakpoints.down(820))
    const is480=useMediaQuery(theme.breakpoints.down(480))

    // stores section's name
    const [sections,setSections]=useState([])
    
    // keeps selected section name
    const [selectedSection, setSelectedSection] = useState("")

    // keeps the overall todos
    const [todos,setTodos]=useState([])
    
    // stores todo for specific section
    const [sectionTodos,setSectionTodos]=useState([])

    // edit timestamp for todos
    const [editTimestamp,setEditTimestamp]=useState('')

    // enables toggling of todo form
    const [showTodoForm,setShowTodoForm]=useState(false)

    // enables toggling of section form
    const [showSectionForm,setShowSectionForm]=useState(false)

    // stores todo form text
    const [newTodo,setNewTodo]=useState('')

    // store new section form text
    const [newSection,setNewSection]=useState('')


    // sets a default section
    useEffect(()=>{
        if(sections){
            setSelectedSection(sections[0])
        }
        console.log(sections);
    },[sections])

    // fetch and set sections data
    useEffect(()=>{
        const todoSections=JSON.parse(localStorage.getItem('sections'))

        if(todoSections){
            setSections(todoSections)
        }
        else if(!todoSections){
            localStorage.setItem("sections",JSON.stringify(["demo"]))
            const todoSections=JSON.parse(localStorage.getItem('sections'))
            setSections(todoSections)
        }
    },[])

    // fetch and set todos data
    useEffect(()=>{
        const todos=JSON.parse(localStorage.getItem("todos"))
        if(todos){
            setTodos(todos)
        }
        console.log(todos);
    },[])

    // as as section is selected it fetched 
    useEffect(()=>{

        if(todos){
            const matchingTodos=todos.filter(todo=>todo.section===selectedSection)
            if(matchingTodos){
                setSectionTodos(matchingTodos)
            }
        }

    },[selectedSection])

    // save todos
    const saveTodos=(update)=>{
        localStorage.setItem("todos",JSON.stringify(update))
    }

    const handleAddTodo=()=>{
        const createdTodo={todo:newTodo.trim(),section:selectedSection,createdAt:new Date()}

        const updatedTodos=[...todos,createdTodo]
        const updatedSectionTodos=[...sectionTodos,createdTodo]

        setSectionTodos(updatedSectionTodos)
        setTodos(updatedTodos)
        
        setNewTodo("")
        setShowTodoForm(false)
        saveTodos(updatedTodos)
    }

    const handleDeleteTodo=(deleteIndex)=>{
        console.log(deleteIndex);
        const updatedSectionTodos=sectionTodos.filter((todo,index)=>index!==deleteIndex)
        setSectionTodos(updatedSectionTodos)
        const deleteTodoTimeStamp=sectionTodos[deleteIndex].createdAt
        const updatedTodos=todos.filter(todo=>todo.createdAt!==deleteTodoTimeStamp)
        setTodos(updatedTodos)
        saveTodos(updatedTodos)
    }

    const handleUpdateTodo=(update)=>{
        const index=todos.findIndex((todo)=>todo.createdAt===editTimestamp)
        const updatedTodos=[...todos]
        updatedTodos[index]={...updatedTodos[index],todo:update}
        
        const updatedSectionTodos=[...sectionTodos]
        const index1=updatedSectionTodos.findIndex((todo)=>todo.createdAt===editTimestamp)
        updatedSectionTodos[index1]={...updatedTodos[index],todo:update}
        setSectionTodos(updatedSectionTodos)

        setTodos(updatedTodos)
        saveTodos(updatedTodos)
        setEditTimestamp("")
    }

    // add section
    const handleAddSection=()=>{
        const updatedSections=[...sections,newSection.trim()]
        setSections(updatedSections)
        setNewSection("")
        localStorage.setItem("sections",JSON.stringify(updatedSections))
        setShowSectionForm(false)
    }

    const handleDeleteSection=()=>{
        
        const updatedTodos=todos.filter(todo=>todo.section!==selectedSection)
        setTodos(updatedTodos)
        saveTodos(updatedTodos)

        const updatedSections=sections.filter(section=>section!==selectedSection)
        setSections(updatedSections)

        localStorage.setItem('sections',JSON.stringify(updatedSections))
    }

  return (
    <Stack p={2} rowGap={1} height={'100%'} position={'relative'} bgcolor={theme.palette.primary.dark} width={is820?'100%':'43rem'} justifyContent={'space-between'}>
    
        {/* tabs */}
        <Stack color={'whitesmoke'} height={'49rem'}  sx={{overflowY:"scroll"}}>

            <TabContext value={selectedSection}>

                <TabList sx={{position:'sticky',top:0,zIndex:1,bgcolor:theme.palette.primary.dark}}   onChange={(event, newValue) => setSelectedSection(newValue)} variant='scrollable' aria-label="lab API tabs example">
                    {sections.map((section,index)=>(
                        <Tab key={index}  sx={{color:'whitesmoke'}} label={section} value={section} />
                    ))}
                </TabList>

                {
                    sections && sections.map((section,index)=>(
                        <TabPanel   key={index} value={section} sx={{color:'red',p:0,mt:2}}>
                            {
                                sectionTodos.length?
                                    sectionTodos.map((todo,index)=>(
                                    <>
                                    <TodoItem key={index} timestamp={todo.createdAt} index={index} todoTask={todo.todo} handleUpdateTodo={handleUpdateTodo} editTimestamp={editTimestamp} setEditTimestamp={setEditTimestamp} handleDeleteTodo={handleDeleteTodo} createdAt={new Date(todo.createdAt).toDateString()}/>
                                    <div style={{backgroundColor:'GrayText',height:'.1px',opacity:.4}}></div>
                                    </>
                                    ))
                                    :
                                    <Typography alignSelf={'center'} mt={5} variant='h6' color={'#ffffff'}>You have no todos</Typography>
                            }
                        </TabPanel>
                    ))
                }
            </TabContext>
        </Stack>


        {/* add section form */}
        <AnimatePresence>
        {   

            showSectionForm && 
            <motion.div
                style={formStyles}
                variants={animationVariants}
                exit="hide"
                initial="hide"
                animate={showSectionForm?"show":"hide"}
                transition={{ease:"easeInOut",type:"spring",damping:13,duration:.5}}
                >   
                <Stack bgcolor={theme.palette.primary.light} p={2} rowGap={2} width={is480?"18rem":'22rem'}>
                    <Stack flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
                        <Typography color={'white'} variant='h6'>Add section</Typography>
                        <IconButton onClick={()=>setShowSectionForm(false)}><CloseIcon sx={{color:'whitesmoke'}}/></IconButton>
                    </Stack>
                    <TextField autoFocus inputProps={{style:{color:'whitesmoke'}}} value={newSection} onChange={(e)=>setNewSection(e.target.value)}/>
                    <Button disabled={!newSection.trim()} onClick={handleAddSection} variant='outlined'>add</Button>
                </Stack>
            </motion.div>

            }
        </AnimatePresence>


        {/* <div style={{position:'fixed',width:"10rem",height:"10rem",backgroundColor:'red',justifySelf:'center',alignSelf:'center'}}></div> */}

        {/* add todo form */}
        <AnimatePresence>
            {
            showTodoForm && 
            <motion.div
            style={formStyles}
            variants={animationVariants}
            initial="hide"
            animate={'show'}
            exit='hide'
            transition={{ease:"easeInOut",type:"spring",damping:13,duration:.5}}
            >
                <Stack p={2} bgcolor={theme.palette.primary.light} rowGap={2} width={is480?"18rem":'22rem'}>
                    <Stack flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
                        <Typography variant='h6' color={'whitesmoke'}>Add todo</Typography>
                        <IconButton onClick={()=>setShowTodoForm(false)}><CloseIcon sx={{color:'whitesmoke'}}/></IconButton>
                    </Stack>
                    <TextField autoFocus value={newTodo} InputProps={{style:{color:'white'}}} onChange={(e)=>setNewTodo(e.target.value)} multiline rows={4}/>
                    <Button disabled={!newTodo.trim()} onClick={handleAddTodo} variant='outlined'>Add</Button>
                </Stack>
            </motion.div>
            }
        </AnimatePresence>

        {/* speed dial */}
        <Stack alignSelf={'flex-end'}>
            <SpeedDial direction='left' sx={{justifySelf:"flex-end",alignSelf:'flex-end'}} ariaLabel="Todo-Options"  icon={<SpeedDialIcon />}>
                {sections.length && <SpeedDialAction onClick={()=>{setShowTodoForm(!showTodoForm);setShowSectionForm(false)}} icon={<AddIcon/>} tooltipTitle={'Add Todo'}/>}
                <SpeedDialAction onClick={()=>{setShowSectionForm(!showSectionForm);setShowTodoForm(false)}} icon={<PlaylistAddIcon/>} tooltipTitle={'Add Section'}/>
                {sections?.length && <SpeedDialAction onClick={handleDeleteSection} icon={<BackspaceIcon sx={{color:'red'}}/>} tooltipTitle={'Delete Section'}/>}
            </SpeedDial>
        </Stack>

    </Stack>
  )
}
