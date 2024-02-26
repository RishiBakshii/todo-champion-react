import { Checkbox, FormControlLabel, IconButton, Stack, TextField, Typography, useMediaQuery, useTheme } from '@mui/material'
import React, { useEffect, useState } from 'react'
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CheckIcon from '@mui/icons-material/Check';
import { CheckBox } from '@mui/icons-material';

export const TodoItem = ({index,todoTask,editTimestamp,setEditTimestamp,handleDeleteTodo,handleToggleComplete,isCompleted,handleUpdateTodo,createdAt,timestamp}) => {


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
            <TextField autoFocus value={todoUpdate} fullWidth multiline InputProps={{style:{color:"white"}}} sx={{mr:2}}  onChange={(e)=>setTodoUpdate(e.target.value)}/>
            :
            <Stack flexDirection={'row'} alignItems={'center'} columnGap={is480?1:2}>
                <FormControlLabel sx={{m:0,p:0}} onChange={(e)=>handleToggleComplete(timestamp,e.target.checked)}  checked={isCompleted} control={<Checkbox sx={{color:'white'}}/>} />
                <Typography sx={{textDecoration:isCompleted?"line-through":''}} mr={2} variant='body2' color={'whitesmoke'}>{todoTask}</Typography>
            </Stack>
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
        <Stack flexDirection={'row'} alignSelf={'flex-end'} alignItems={'center'} columnGap={2}>
            <Typography  color={'GrayText'} variant='body2' fontSize={'.9rem'}>{createdAt}</Typography>
            {isCompleted && <p style={{color:'green',fontSize:".8rem",fontWeight:400}}>Completed</p>}
        </Stack>
    </Stack>
  )
}
