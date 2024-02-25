import { IconButton, Stack, TextField, Typography, useMediaQuery, useTheme } from '@mui/material'
import React, { useEffect, useState } from 'react'
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CheckIcon from '@mui/icons-material/Check';

export const TodoItem = ({index,todoTask,editTimestamp,setEditTimestamp,handleDeleteTodo,handleUpdateTodo,createdAt,timestamp}) => {


  // theme
  const theme=useTheme()

  // breakpoints
  const is480=useMediaQuery(theme.breakpoints.down(480))

  const inEditState=timestamp===editTimestamp
  const [todoUpdate,setTodoUpdate]=useState('')


  useEffect(()=>{
    if(inEditState){
      setTodoUpdate(todoTask)
    }
  },[inEditState])

  return (
    <Stack borderRadius={'.6rem'} rowGap={1} p={is480?'16px 0px':2}>

      {/* upper (todo and action buttons) */}
        <Stack flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
          {
            inEditState?
            <TextField value={todoUpdate} fullWidth multiline InputProps={{style:{color:"white"}}} sx={{mr:2}}  onChange={(e)=>setTodoUpdate(e.target.value)}/>
            :<Typography mr={2} variant='body2' color={'whitesmoke'}>{todoTask}</Typography>
          }

          {/* action buttons */}
          <Stack flexDirection={'row'} alignSelf={'flex-start'}>
            {
              inEditState?
              <IconButton onClick={()=>handleUpdateTodo(todoUpdate)}><CheckIcon sx={{color:'whitesmoke'}}/></IconButton>
              :
              <IconButton onClick={()=>setEditTimestamp(timestamp)}><EditNoteIcon sx={{color:'whitesmoke'}}/></IconButton>
            }
              <IconButton onClick={()=>handleDeleteTodo(index)}><DeleteOutlineIcon sx={{color:'whitesmoke'}}/></IconButton>
          </Stack>


        </Stack>
          
        {/*  */}
        <Typography  color={'GrayText'} variant='body2' fontSize={'.9rem'} alignSelf={'flex-end'}>{createdAt}</Typography>
    </Stack>
  )
}
