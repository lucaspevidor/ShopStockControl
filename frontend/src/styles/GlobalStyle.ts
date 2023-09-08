import { createGlobalStyle } from "styled-components";
import variables from "./variables";

const GlobalStyle = createGlobalStyle`
    ${variables};

    html: {
        box-sizing: border-box;
        width: 100%;
        scroll-behavior: smooth;        
    }

    * {
        box-sizing: inherit;
        font-family: "Inter", Arial, Helvetica, sans-serif;
    }

    // Scroll bar
    html {
        scrollbar-width: thin;
        scrollbar-color: var(--scroll-bar-gray) var(--scroll-bar-gray);
    }
    ::-webkit-scrollbar {
        width: 12px;
    }
    ::-webkit-scrollbar-track {
        background: var(--scroll-bar-track);
    }
    ::-webkit-scrollbar-thumb {
        background-color: var(--scroll-bar-gray);
        border: 3px solid var(--scroll-bar-track);
        border-radius: 10px;
    }

    body {
        margin: 0;
        width: 100%;
        min-height: 100%;
        overflow-x: hidden;
        -moz-osx-font-smoothing: grayscale;
        -webkit-font-smoothing: antialiased;
        background-color: var(--main-background);     
        color: var(--main-text);           
    }

    h1, h2, h3 {
        color: var(--main-blue);
    }

    #root {
        min-height: 100vh;
        display: grid;
        grid-template-rows: 1fr auto;
        grid-template-columns: 100%;
    }

    button {
        color: var(--white-text);
        background-color: var(--main-blue);
        border-radius: var(--border-radius);
        box-sizing: content-box;
        padding: 10px 10px;
        outline: none;
        border: none;
        font-size: 14px;
    }
`;

export default GlobalStyle;
