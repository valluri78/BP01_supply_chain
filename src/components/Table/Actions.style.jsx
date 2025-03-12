import React from 'react';
import styled from 'styled-components';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { Grid, Divider, Typography, IconButton, Button, Paper, Checkbox, Popover, MenuItem } from "@material-ui/core";

export const ActionLayoutPadding = styled(props => <div {...props} />)`

    padding: ${({ theme }) => theme.spacing(1.5)}px ${({ theme }) => theme.spacing(3)}px ${({ theme }) => theme.spacing(1.5)}px ${({ theme }) => theme.spacing(3)}px;
    margin-top:${({ theme }) => theme.spacing(1)}px;
    
`;

export const ActionPopoverPadding = styled(props => <div {...props} />)`
    padding: 8px 0px;
`;

export const ActionButton = styled(props => <Button {...props} />)`
    & .MuiButton-startIcon {
    margin-right:${({ theme }) => theme.spacing(2.5)}px;
    margin-left:${({ theme }) => theme.spacing(0)}px;
    }
    &.MuiButton-text{
        padding:${({ theme }) => theme.spacing(0)}px;
    }
    text-transform: none;  
`;
export const ActionMenuItem = styled(props => <MenuItem {...props} />)`
    &.MuiMenuItem-root {
        padding: ${({ theme }) => theme.spacing(1.75)}px ${({ theme }) => theme.spacing(3)}px;
        text-transform: none;
    }
`;

export const ActionMenuItemWidthBorder = styled(props => <MenuItem {...props} />)`
    &.MuiMenuItem-root {
        padding: ${({ theme }) => theme.spacing(1.75)}px ${({ theme }) => theme.spacing(3)}px;
        margin-top:${({ theme }) => theme.spacing(1)}px;
        text-transform: none;
        border-bottom: 1px solid #D5D5DA;
    }
`;

export const ListItem = styled(props => <ListItemIcon {...props} />)`
    min-width: 0;
    margin-right: ${({ theme }) => theme.spacing(2.5)}px;
`;

export const ActionButtonAlignment = styled(props => <Button {...props} />)`
    &.MuiButton-root {
        display: flex;
        justify-content: flex-end;
    }  
`;

export const TextDisabled = styled(props => <Typography {...props} />)`
    &.MuiTypography-root {
        text-transform: none;
    }  
`;

export const DisplayText = styled(props => <Typography {...props} />)`
    &.MuiTypography-root {
        text-transform: none;
    }  
`;

export const PaddingRightGrid = styled(props => <Grid {...props} />)`
    &.MuiGrid-root {
        padding-right: ${({ theme }) => theme.spacing(2.5)}px;
        height:${({ theme }) => theme.spacing(3)}px;
    }  
`;

export const CenterAlignGrid = styled(props => <Grid {...props} />)`
    &.MuiGrid-root {
        display: flex;
        align-items: center;
        height:${({ theme }) => theme.spacing(3)}px;
    },
`;

export const DividerStyles = styled(props => <Divider {...props} />)`
&.MuiDivider-root {
    height: 1px;
    background-color: #D5D5DA;
}
`;

export const SpanWithBorder = styled(props => <span {...props} />)`
    border-bottom: 1px solid #D5D5DA;

`;

export const DivWithBorder = styled(props => <div {...props} />)`
    border-bottom: 1px solid #D5D5DA;

`;