import styled from "styled-components";
import { ListItem } from "@material-ui/core";

export const ExpandedListItem = styled(ListItem)`
    background-color: #2e2559;
    cursor: pointer;
    &:hover {
        background-color: #3a2e6e;
    }
    ${({ active }) => active && "font-weight: bold;"}
`;

export const IconSubListItem = styled(ListItem)`
    background-color: #2e2559;
    padding-left: 40px;
    cursor: pointer;
    &:hover {
        background-color: #3a2e6e;
    }
    ${({ active }) => active && "font-weight: bold;"}
`;

export const StyledListIcon = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: ${({ width }) => width || "50px"};
`;

export const StyledListIconForSubList = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 30px;
`;

export const HoverContainer = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
`;

export const StyledListItemText = styled.span`
    font-size: 14px;
    color: white;
`;

export const SubListTypography = styled.span`
    font-size: 14px;
    color: ${({ active }) => (active ? "#00bcd4" : "white")};
`;
