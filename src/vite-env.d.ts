/// <reference types="vite/client" />

interface SectionType {
    readonly id:string
    name:string
}

interface TodoItemType {
    readonly id:string
    title:string
    section:SectionType['name']
    isCompleted:boolean
}