import styled from 'styled-components';

export const Loading = styled.div`
    color: #fff;
    font-size: 30px;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;

export const Owner = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    a {
        color: #7159c1;
        font-size: 16px;
        text-decoration: none;
    }

    img {
        width: 120px;
        border-radius: 50%;
        margin-top: 20px;
    }

    h1 {
        font-size: 24px;
        margin-top: 10px;
    }

    p {
        margin-top: 5px;
        font-size: 14px;
        color: #666;
        line-height: 1.4;
        text-align: center;
        max-width: 400px;
    }
`;

export const IssuesList = styled.ul`
    padding-top: 30px;
    margin-top: 30px;
    border-top: 1px solid #eee;
    list-style: none;

    li {
        display: flex;
        padding: 15px 10px;
        border: 1px solid #eee;
        border-radius: 4px;

        & + li {
            margin-top: 10px;
        }

        img {
            width: 36px;
            height: 36px;
            border-radius: 50%;
            border: 2px solid #eee;
        }

        div {
            flex: 1;
            margin-left: 15px;

            strong {
                font-size: 16px;

                a {
                    text-decoration: none;

                    &:hover {
                        color: #7159c1;
                    }
                }

                span {
                    background: #eee;
                    color: #333;
                    border-radius: 2px;
                    font-size: 12px;
                    font-weight: 600;
                    height: 20px;
                    padding: 3px 4px;
                    margin-left: 10px;
                }
            }

            p {
                margin-top: 5px;
                font-size: 12px;
                color: #999;
            }
        }
    }

    strong {
        margin-left: 5px;
    }
`;

export const Buttons = styled.div`
    display: flex;
    margin-bottom: 20px;
    align-items: center;
    justify-content: space-around;

    button.all {
        background: transparent;
        padding: 5px 20px;
        border-radius: 5px;
        border: 2px solid blue;
        color: blue;
        font-weight: bold;

        &:hover {
            color: #fff;
            background: blue;
        }
    }

    button.open {
        background: transparent;
        padding: 5px 20px;
        border-radius: 5px;
        border: 2px solid green;
        color: green;
        font-weight: bold;

        &:hover {
            color: #fff;
            background: green;
        }
    }

    button.closed {
        background: transparent;
        padding: 5px 20px;
        border-radius: 5px;
        border: 2px solid red;
        color: red;
        font-weight: bold;

        &:hover {
            color: #fff;
            background: red;
        }
    }
`;

export const IssueState = styled.div`
    display: inline;
    background: ${props => props.background};
    color: #fff;
    border-radius: 2px;
    font-size: 12px;
    font-weight: 600;
    padding: 3px 4px;
    margin-left: 10px;
`;

export const Nav = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    button {
        margin: 20px 10px;
        background: #7159c1;
        padding: 5px 20px;
        color: #fff;
        border: 0;
        border-radius: 5px;
    }
`;
