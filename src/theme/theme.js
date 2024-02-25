import { createTheme } from "@mui/material";

export const theme=createTheme({
    palette:{
      primary:{
        main:"#7f7ff7",
        light:"#181832",
        dark:"#101025",
        contrastText:"white"
      }
    },
    typography: {
        fontFamily:"Poppins, sans-serif",
        h1: {  // -1rem rule
          fontSize: "6rem",
    
          "@media (max-width:960px)": {
            fontSize: "5rem",
          },
          "@media (max-width:600px)": {
            fontSize: "4rem",
          },
          "@media (max-width:414px)": {
            fontSize: "2.5rem",
          },
        },
        h2: {  // -7 formula
          fontSize: "3.75rem",
          "@media (max-width:960px)": {
            fontSize: "3.4rem",
          },
    
          "@media (max-width:662px)": {
            fontSize: "3rem",
          },
          "@media (max-width:414px)": {
            fontSize: "2.4rem",
          },
        },
        h3: {  // -6 formula
          fontSize: "3rem",
          "@media (max-width:960px)": {
            fontSize: "2.9rem",
          },
          
          "@media (max-width:662px)": {
            fontSize: "2.6rem",
          },
          "@media (max-width:414px)": {
            fontSize: "2rem",
          },
    
        },
        h4: {
           fontSize: "2.125rem",
          "@media (max-width:960px)": {
            fontSize: "1.5rem",
          },
          "@media (max-width:600px)": {
            fontSize: "1.25rem",
          },
        },
        h5: {
          fontSize: "1.5rem",
          "@media (max-width:960px)": {
            fontSize: "1.4rem",
          },
          "@media (max-width:600px)": {
            fontSize: "1.3rem",
          },
        },
        h6: {
          fontSize: "1.25rem",
          "@media (max-width:960px)": {
            fontSize: "1.1rem",
          },
          // "@media (max-width:600px)": {
          //   fontSize: "1.050rem",
          // },
        },
        body1: {
          fontSize: "1rem",
          "@media (max-width:960px)": {
            fontSize: "1rem",
          },
          // "@media (max-width:600px)": {
          //   fontSize: ".9rem",
          // },
        },
        body2: {
          fontSize: "1rem",
          "@media (max-width:960px)": {
            fontSize: "1rem",
          },
          "@media (max-width:600px)": {
            fontSize: "1rem",
          },
          "@media (max-width:480px)": {
            fontSize: ".97rem",
          },
        },
      },
})