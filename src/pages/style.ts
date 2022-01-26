import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    
    .btn {
        width: 100%;
        border-top: 1px solid whitesmoke;
        border-bottom: 1px solid whitesmoke;
    }
`
export const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    position: sticky;
    top: 0;
    z-index: 100;

    padding: 15px;
    height: 80px;
    border-bottom: 1px solid whitesmoke;
`
export const IconsButton = styled.div`
    display: flex;
    align-items: center;
`
export const SearchArea = styled.div`
    display: flex;
    align-items: center;

    padding: 20px 10px;
    border-radius: 4px;

    input {
        border: none;
        outline-width: 0;
        flex: 1;
    }
`