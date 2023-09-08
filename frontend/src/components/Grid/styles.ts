import styled from "styled-components";
import variables from "../../styles/variables";

const Styled = styled.div`
    ${variables}    

    margin-top: 20px;
    opacity: 0;
    transform: translateY(50px);

    transition: opacity 0.4s ease-out, transform 0.4s ease-out;

    &.fadeIn {
        opacity: 1;
        transform: translateY(0);
    }

    table {               
        font-size: 12px;
    }

    tr:nth-child(odd) {
        background-color: rgba(0,0,0,0.05);
    }

    tr:nth-child(even) {
        background-color: rgba(0,0,0,0.02);
    }

    th {
        color: var(--white-text);
        background-color: var(--main-blue);
        padding: 5px 20px;
        font-weight: 300;
    }

    td {
        max-width: 250px;
        padding: 5px 20px
    }

    ul {
        padding-left: 0;
        list-style-position: inside;
    }

    li {
        padding-left: 1em;
        text-indent: -1em;
    }

    .errorTd {
        color: var(--red-text)
    }

`;

export { Styled };
