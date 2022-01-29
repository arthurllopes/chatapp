import styled from 'styled-components';

export const Container = styled.div`
    height: 100vh;
`
export const Header = styled.header`
    background-color: red;
`
export const ChatScreen = styled.div`
    flex: 1;
    overflow: scroll;

    ::-webkit-scrollbar {
        display: none;
    }
    -ms-overflow-style: none;
    scrollbar-width: none;

`
export const SendMessageArea = styled.div`
    background-color: red;
`