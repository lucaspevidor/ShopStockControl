import styled from "styled-components";
import variables from "../../styles/variables";

export const Style = styled.div`
    ${variables}    

    display: flex;
    flex-direction: column;        

    div {
        display: flex;
        align-items: center;
        justify-content: center;        
    }

    .logoDiv {
        margin-top: 30vh;
        margin-bottom: 100px;
        transition: all 0.4s ease-out;
        opacity: 0;
        transform: translateY(50px);

        &.fadeIn {
            opacity: 1;
            transform: translateY(0);
        }

        &.smaller {
            margin-top: 5vh;
            margin-bottom: 20px;
        }
    }

    .mainButtonDiv {
        opacity: 0;
        transform: translateY(50px);
        transition: all 0.4s ease-out;        

        &.fadeIn {
            opacity: 1;
            transform: translateY(0);
            transition-delay: 0.3s;
        }
    }

    .mainButtonDiv, .subButtonDiv {
        flex-direction: row;      
        justify-content: space-between;

        button + button {
            margin-left: 10px;
        }

        #validateBtn {
            background-color: var(--main-green);
        }
    }

    input {
        display: none;
    }

    .infoText {
        margin-top: 2px;
        font-size: 12px;
        color: var(--red-text);
        justify-content: flex-end;
    }        
`;

interface Props {
    $faded?: boolean;
}

export const Button = styled.button<Props>`    
    opacity: ${p => p.$faded ? 0.5 : 1};
    cursor: ${p => p.disabled ? "arrow" : "pointer"};
    transition: opacity 0.1s linear;
    min-width: 60px;

    &:hover {
        opacity: ${p => {
        if (p.disabled) {
            return p.$faded ? 0.5 : 1;
        } else {
            return p.$faded ? 0.5 : 0.8;
        }
    }}    
    }
`;
