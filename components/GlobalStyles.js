//style file which stores global styles

import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
    html,
    body {
        padding: 0;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
        
    }
    
    * {
        box-sizing: border-box;
        max-width: 800px; 
        margin: 0 auto !important; 
        float: none !important; 
        position: center;

    }

    :root {
        --background-gradient: linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(0,112,192,1) 100%); 
        --primary: #0070C0;

    }
`;

export default GlobalStyles;
