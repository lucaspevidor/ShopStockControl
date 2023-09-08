import { ReactNode } from "react";
import styled from "styled-components";

const StyledContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;    
    min-height: 100vh;
    box-sizing: border-box;
    min-width: 100vw;
    padding: 20px 0;
`;

interface LayoutProps {
    children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {    
    return (
        <>
            <StyledContent>
                {children}
            </StyledContent>
        </>
    );
};

export default Layout;
