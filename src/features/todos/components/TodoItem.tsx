import { Checkbox, IconButton, Stack, TextField, Typography, useMediaQuery, useTheme } from "@mui/material"
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useState } from "react";
import DoneIcon from '@mui/icons-material/Done';

type PropTypes={
    todo:TodoItemType
    handleDeleteTodo:(id:TodoItemType['id'])=>void
    handleUpdateTodo:(id:TodoItemType['id'],newTitle:TodoItemType['title'])=>void
    handleToggleCompleteTodo:(id:TodoItemType['id'],isCompleted:TodoItemType['isCompleted'])=>void
}

export const TodoItem = ({todo,handleDeleteTodo,handleUpdateTodo,handleToggleCompleteTodo}:PropTypes) => {

    const theme=useTheme()

    // breakpoints
    const is480=useMediaQuery(theme.breakpoints.down(480))

    const [editActive,setEditActive]=useState<boolean>(false)
    const [title,setTitle]=useState<TodoItemType['title']>(todo.title)

    const handleSave=()=>{
        setEditActive(false)
        handleUpdateTodo(todo.id,title)
    }

  return (
    <>    
    <Stack bgcolor={theme.palette.primary.dark} p={2} rowGap={2}>

        <Stack flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>

            {
                editActive?
                <TextField inputProps={{style:{color:"whitesmoke"}}} autoFocus value={title} onChange={e=>setTitle(e.target.value)}/>
                :
                <Stack flexDirection={'row'} alignItems={'center'} columnGap={is480?1:2}>
                    <Checkbox sx={{color:'whitesmoke',alignSelf:'flex-start'}} checked={todo.isCompleted} onChange={e=>handleToggleCompleteTodo(todo.id,e.target.checked)}/>
                    <Typography variant="body2" sx={{textDecoration:todo.isCompleted?"line-through":""}} color={'whitesmoke'}>{todo.title}</Typography>
                </Stack>
            }

            <Stack alignSelf={'flex-start'} ml={is480?1:2} flexDirection={'row'} alignItems={'center'}>
                {
                    editActive?
                    <IconButton onClick={handleSave}><DoneIcon sx={{color:"whitesmoke"}}/></IconButton>
                    :
                    <IconButton onClick={()=>setEditActive(true)}><EditNoteIcon sx={{color:"whitesmoke"}}/></IconButton>
                }
                <IconButton onClick={()=>handleDeleteTodo(todo.id)}><DeleteOutlineIcon sx={{color:"whitesmoke"}}/></IconButton>
            </Stack>

        </Stack>
        
        <Stack flexDirection={'row'} alignSelf={'flex-end'} alignItems={'center'} columnGap={2}>
            <p style={{color:"GrayText",fontSize:".8rem",fontWeight:400}}>{new Date(todo.id).toDateString()}</p>
            {/* <Typography  color={'GrayText'} variant='body2' fontSize={'.9rem'}></Typography> */}
            {todo.isCompleted && <p style={{color:'green',fontSize:".8rem",fontWeight:400}}>Completed</p> }
        </Stack>

    </Stack>
    <div style={{backgroundColor:"GrayText",opacity:0.3,height:".2px"}} />
    </>
  )
}
