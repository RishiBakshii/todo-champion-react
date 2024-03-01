export const getTodos=():Array<TodoItemType>=>{
    const todos=localStorage.getItem('todos')
    return todos?JSON.parse(todos):[]
}

export const saveTodos=(todos:Array<TodoItemType>):void=>{
    localStorage.setItem('todos',JSON.stringify(todos))
}

export const getSections=():Array<SectionType>=>{
    const sections=localStorage.getItem('sections')
    return sections?JSON.parse(sections):[]
}

export const saveSections=(sections:Array<SectionType>):void=>{
    localStorage.setItem('sections',JSON.stringify(sections))
}
