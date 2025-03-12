import { MenuItem, TextField, alpha, makeStyles } from "@material-ui/core";
import { useState } from "react";
import styled from "styled-components";
import "./NumberTextfield.css";

const useStylesReddit = makeStyles((theme) => ({
    root: {
        border: "1px solid lightgray",
        overflow: "hidden",
        fontSize: 14,
        borderRadius: 0,
        backgroundColor: "white",
        transition: theme.transitions.create(["border-color", "box-shadow"]),
        "&:hover": {
            backgroundColor: "#fff",
        },
        "&$focused": {
            backgroundColor: "#fff",
            boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 1px`,
            borderColor: theme.palette.primary.main,
            borderRadius: "0px",
        },
    },
    focused: {},
    disabled: {
        backgroundColor: "#fff",
        color: "rgba(0, 0, 0, 0.87)",
    },
}));

const StyledMenuItem = styled(MenuItem)`
 &.MuiButtonBase-root.MuiListItem-root.MuiMenuItem-root {
    font-size: 14px;
    display: flex;
    align-items: center;
}
`;

const StyledMenuProps = {
    PaperProps: {
        style: {
            maxHeight: 200,
            overflowY: "auto",
            scrollbarWidth: "thin",
        },
    },
};

const customStyles = `
    ::-webkit-scrollbar {
        width: 6px;
    }
    ::-webkit-scrollbar-thumb {
        background-color: rgba(0, 0, 0, 0.3);
        border-radius: 4px;
    }
    ::-webkit-scrollbar-track {
        background: rgba(0, 0, 0, 0.1);
    }
`;

export function RedditTextField(props) {
    const classes = useStylesReddit();
    const [focused, setFocused] = useState(false);

    const handleFocus = () => {
        setFocused(true);
    };

    const handleBlur = () => {
        setFocused(false);
    };

    return (
        <>
            <style>{customStyles}</style>
            <TextField
                fullWidth
                select={props.type === "select"}
                type={props.type || "text"}
                size="small"
                disabled={props.disabled}
                InputProps={{
                    classes: {
                        root: classes.root,
                        focused: classes.focused,
                        disabled: classes.disabled,
                    },
                    disableUnderline: true,
                    ...(props.type === "tel" && { pattern: "[0-9]{10}", maxLength: 10 }),
                }}
                InputLabelProps={{
                    shrink: props.value !== "",
                }}
                SelectProps={{
                    MenuProps: {
                        ...StyledMenuProps,
                        anchorOrigin: {
                            vertical: "bottom",
                            horizontal: "left",
                        },
                        transformOrigin: {
                            vertical: "top",
                            horizontal: "left",
                        },
                    getContentAnchorEl: null, // Ensure the menu appears below the text field
                    },
                }}
                onFocus={handleFocus}
                onBlur={handleBlur}
                variant={props.variant || "outlined"}
                {...props}
                onWheel={(e) => {
                    if (props.type === "number") {
                        e.target.blur();
                        setTimeout(() => e.target.focus(), 0);
                    }
                }}
            >
                {props.options?.map((option) => (
                    <StyledMenuItem key={option} value={option}>
                        <div
                            style={{
                                maxWidth: props?.styledText === "Station" ? 170 : 200,
                                whiteSpace: "nowrap",
                                textOverflow: "ellipsis",
                                overflow: "hidden",
                            }}
                        >
                            {option}
                        </div>
                    </StyledMenuItem>
                ))}
            </TextField>
        </>
    );
}
