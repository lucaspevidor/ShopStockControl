import { css } from "styled-components";

const variables = css`
    :root {
        --main-background: #EDEDF0;
        --main-text: #04080c;
        --white-text: #FFFFFF;
        --red-text: #DC1616;
        --main-blue: #203E59;        
        --inactive-blue: rgba(32, 62, 89, 0.50);
        --main-green: #1AC774;
        --inactive-green: rgba(26, 199, 116, 0.50);
        --scroll-bar-gray: #A49F9F;
        --scroll-bar-track: #cac4c4

        --shadow: box-shadow: 0px 0px 20px 5px rgba(0, 0, 0, 0.15);
        --border-radius: 5px;

        --easing: cubic-bezier(0.645, 0.045, 0.355, 1);
        --transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);
    };
`;

export default variables;
