import styled from 'styled-components';

export const Container = styled.header`    
    
    display: flex;
    align-items: center;
    padding: 8px;
    position: sticky;
    top: 0;

    background-color: white;
    border-bottom: 1px solid whitesmoke;

    .go-back-button {
        display: flex;
        align-items: center;
    }
    .recipient-area {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .contact-info {
        margin-left: 10px
    }

`