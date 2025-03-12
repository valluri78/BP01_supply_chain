import React from 'react';
import {Grid, MenuItem, IconButton, Button, Typography, Tooltip} from '@material-ui/core';


import { ActionLayoutPadding, ActionButton, ActionButtonAlignment, TextDisabled, DisplayText, PaddingRightGrid, CenterAlignGrid, DividerStyles, 
    SpanWithBorder,
    DivWithBorder,
    ActionMenuItemWidthBorder,
    ActionPopoverPadding

} from './Actions.style';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';




const Actions = (props) =>
{
    const { row, actions, closePopUp, index, isIconButton, ariaLabel, isRowSelected, source } = props;

    const theme = useTheme();
    const isXs = useMediaQuery(theme.breakpoints.only('xs'));
    const isSm = useMediaQuery(theme.breakpoints.only('sm'));

    const [multiClickDisabled, setMultiClickDisabled] = React.useState(false);

    function onSelectAction(act) 
    {
        if (act.callbackArguments)
        {
            if (act.callbackArguments.length === 0)
            {
                act.callback();
            }
            else if (act.callbackArguments.length === 1)
            {
                act.callback(row[act.callbackArguments[0]]);
            }
            else if (act.callbackArguments.length === 2)
            {
                act.callback(row[act.callbackArguments[0]], row[act.callbackArguments[1]]);
            }
            else if (act.callbackArguments.length === 3)
            {
                act.callback(row[act.callbackArguments[0]], row[act.callbackArguments[1]], row[act.callbackArguments[2]]);
            }
            else if (act.callbackArguments.length === 4)
            {
                act.callback(row[act.callbackArguments[0]], row[act.callbackArguments[1]], row[act.callbackArguments[2]], row[act.callbackArguments[3]]);
            }
            else if (act.callbackArguments.length === 5)
            {
                act.callback(row[act.callbackArguments[0]], row[act.callbackArguments[1]], row[act.callbackArguments[2]], row[act.callbackArguments[3]], row[act.callbackArguments[4]]);
            }
            else if (act.callbackArguments.length === 6)
            {
                act.callback(row[act.callbackArguments[0]], row[act.callbackArguments[1]], row[act.callbackArguments[2]], row[act.callbackArguments[3]], row[act.callbackArguments[4]], row[act.callbackArguments[5]]);
            }
            else if (act.callbackArguments.length === 7)
            {
                act.callback(row[act.callbackArguments[0]], row[act.callbackArguments[1]], row[act.callbackArguments[2]], row[act.callbackArguments[3]], row[act.callbackArguments[4]], row[act.callbackArguments[5]], row[act.callbackArguments[6]]);
            }
            else if (act.callbackArguments.length === 8)
            {
                act.callback(row[act.callbackArguments[0]], row[act.callbackArguments[1]], row[act.callbackArguments[2]], row[act.callbackArguments[3]], row[act.callbackArguments[4]], row[act.callbackArguments[5]], row[act.callbackArguments[6]], row[act.callbackArguments[7]]);
            }
            else if (act.callbackArguments.length === 9)
            {
                act.callback(row[act.callbackArguments[0]], row[act.callbackArguments[1]], row[act.callbackArguments[2]], row[act.callbackArguments[3]], row[act.callbackArguments[4]], row[act.callbackArguments[5]], row[act.callbackArguments[6]], row[act.callbackArguments[7]], row[act.callbackArguments[8]]);
            }
            else if (act.callbackArguments.length === 10)
            {
                act.callback(row[act.callbackArguments[0]], row[act.callbackArguments[1]], row[act.callbackArguments[2]], row[act.callbackArguments[3]], row[act.callbackArguments[4]], row[act.callbackArguments[5]], row[act.callbackArguments[6]], row[act.callbackArguments[7]], row[act.callbackArguments[8]], row[act.callbackArguments[9]]);
            }
            else if (act.callbackArguments.length === 11)
            {
                act.callback(row[act.callbackArguments[0]], row[act.callbackArguments[1]], row[act.callbackArguments[2]], row[act.callbackArguments[3]], row[act.callbackArguments[4]], row[act.callbackArguments[5]], row[act.callbackArguments[6]], row[act.callbackArguments[7]], row[act.callbackArguments[8]], row[act.callbackArguments[9]],  row[act.callbackArguments[10]]);
            }
            setMultiClickDisabled(true);
            closePopUp();
        }
    }

    function onSelectCustomAction(act)
    {
        act.callback(index)
        setMultiClickDisabled(true);
        closePopUp();
    }

    function cellDisplayContent(column) 
    {
        let value = '';

        if (column.customCell && column.customColumns)
        {
            if (column.customColumns.length === 0)
            {
                value = column.customCell();
            }
            else if (column.customColumns.length === 1)
            {
                value = column.customCell(row[column.customColumns[0]]);
            }
            else if (column.customColumns.length === 2)
            {
                value = column.customCell(row[column.customColumns[0]], row[column.customColumns[1]]);
            }
            else if (column.customColumns.length === 3)
            {
                value = column.customCell(row[column.customColumns[0]], row[column.customColumns[1]], row[column.customColumns[2]]);
            }
        }

        return value;
    }

    function isDisabled(action)
    {

        if (isIconButton)
        {
            return isRowSelected;
        }
        else if (multiClickDisabled)
        {
            return true;
        }
        else if (action.conditionallyDisabled)
        {
            return action.isDisableRow(row);
        }

        return false;
    }

    function getIcon(action)
    {
        if (action.conditionallyDisabled && action.disableIcon && action.isDisableRow(row))
        {
            return action.disableIcon;
        }

        return action.icon;
    }

    function showActions(action)
    {
        if (action && action.conditionallyHidden)
        {
            return action.isHiddenRow(row, action);
        }

        return true;
    }

    return (
        <ActionPopoverPadding>
            {source === "Allcontacts" ?
                
                    (actions && actions.map((action, index) => (
                        showActions(action) && (!isDisabled(action)) &&
                        <MenuItem aria-label={actions.text} onClick={() => action.customCallBack ? onSelectCustomAction(action) : onSelectAction(action)} data-testid={index == 0 ? "action" : "action" + index} >
                            {!isIconButton ?
                                <>
                                    <ListItemIcon style={{ minWidth: '0px', marginRight: '20px' }}>
                                        {getIcon(action)}
                                    </ListItemIcon>
                                    <Typography variant="body2" weight="light" textColor="gray"> <DisplayText noWrap={true}>&nbsp;{action && action.customColumns && action.customColumns.length > 0 ? cellDisplayContent(action) : action.text}</DisplayText></Typography>
                                </>
                                :
                                <Tooltip >
                                    <span>
                                        <IconButton aria-label={ariaLabel} style={{ textTransform: 'none' }} onClick={() => action.customCallBack ? onSelectCustomAction(action) : onSelectAction(action)} data-testid={index == 0 ? "action" : "action" + index} >
                                            {getIcon(action)}
                                        </IconButton>
                                    </span>
                                </Tooltip>

                            }
                            {action.isDivider && <DividerStyles />}
                        </MenuItem>
                    )))

                :
                    (actions && actions.map((action, index) => (
                        
                            (showActions(action) && (!isDisabled(action)) &&
                               
                                (!isIconButton ?
                                    // <>
                                    (source === "Invite Tenants" && (isXs || isSm) ?
                                        (action.isDivider ?
                                            <DivWithBorder key={index}>
                                                <ActionButtonAlignment sdsButtonType="tertiary" onClick={() => action.customCallBack ? onSelectCustomAction(action) : onSelectAction(action)} data-testid={index == 0 ? "action" : "action" + index} >
                                                    {getIcon(action)} <DisplayText noWrap={true}>{action && action.customColumns && action.customColumns.length > 0 ? cellDisplayContent(action) : action.text}</DisplayText>
                                                </ActionButtonAlignment>
                                            </DivWithBorder>

                                            :

                                            <div key={index}>
                                                <ActionButtonAlignment sdsButtonType="tertiary" onClick={() => action.customCallBack ? onSelectCustomAction(action) : onSelectAction(action)} data-testid={index == 0 ? "action" : "action" + index} >
                                                    {getIcon(action)} <DisplayText noWrap={true}>{action && action.customColumns && action.customColumns.length > 0 ? cellDisplayContent(action) : action.text}</DisplayText>
                                                </ActionButtonAlignment>
                                            </div>
                                        )
                                        :
                                        ( action.isDivider ?
                                            <ActionMenuItemWidthBorder key={index} onClick={() => action.customCallBack ? onSelectCustomAction(action) : onSelectAction(action)} data-testid={index == 0 ? "action" : "action" + index} >
                                                <DisplayText noWrap={true}>
                                                    <CenterAlignGrid container wrap='nowrap'>
                                                        {getIcon(action) &&
                                                        <PaddingRightGrid item>
                                                            {getIcon(action)}
                                                        </PaddingRightGrid>                                                    
                                                        }
                                                        <Grid item>
                                                            {action && action.customColumns && action.customColumns.length > 0 ? cellDisplayContent(action) : action.text}
                                                        </Grid>
                                                    </CenterAlignGrid>
                                                </DisplayText>
                                            </ActionMenuItemWidthBorder>

                                            :

                                            <MenuItem key={index} onClick={() => action.customCallBack ? onSelectCustomAction(action) : onSelectAction(action)} data-testid={index == 0 ? "action" : "action" + index} >
                                                <DisplayText noWrap={true}>
                                                    <CenterAlignGrid container wrap='nowrap'>
                                                            {getIcon(action) &&
                                                            <PaddingRightGrid item>
                                                                {getIcon(action)}
                                                            </PaddingRightGrid> 
                                                            }
                                                        <Grid item>
                                                            {action && action.customColumns && action.customColumns.length > 0 ? cellDisplayContent(action) : action.text}
                                                        </Grid>
                                                    </CenterAlignGrid>
                                                </DisplayText>
                                            </MenuItem>
                                        )
                                        
                                    )

                                        
                                    // </>
                                    :
                                    (action.isDivider ?

                                        <SpanWithBorder>
                                            <IconButton aria-label={ariaLabel} style={{ textTransform: 'none' }} onClick={() => action.customCallBack ? onSelectCustomAction(action) : onSelectAction(action)} data-testid={index == 0 ? "action" : "action" + index} >
                                                {getIcon(action)}
                                            </IconButton>
                                        </SpanWithBorder>

                                        :
                                        
                                        <span>
                                            <IconButton aria-label={ariaLabel} style={{ textTransform: 'none' }} onClick={() => action.customCallBack ? onSelectCustomAction(action) : onSelectAction(action)} data-testid={index == 0 ? "action" : "action" + index} >
                                                {getIcon(action)}
                                            </IconButton>
                                        </span>

                                    )

                                )

                            )
                        
                    )))
                }
         </ActionPopoverPadding> 
        
    );
};


export default Actions;