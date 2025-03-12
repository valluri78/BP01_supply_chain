import React, { useEffect, useRef } from "react";
import {
    Dialog,
    DialogContent,
    Grid,
    Typography,
    Button,
    FormHelperText,
    DialogTitle,
    DialogActions,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Checkbox,
    ListItemText,
} from "@material-ui/core";
import styled from "styled-components";
import { RedditTextField } from "./TextField";

export const MarginedGrid = styled(Grid)`
    &.MuiGrid-root {
        margin-top: 24px;
    }
`;

const styles = {
    label: {
        color: "#8e8e8e",
        fontWeight: "normal",
        fontSize: "14px",
    },
};

const LoginButton = styled(Button)`
    background-color: rgb(80, 92, 231);
    padding: 8px 30px;
    color: #ffffff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    &:hover {
        background-color: rgb(80, 92, 231);
    }
`;

const CancelButton = styled(Button)`
    &.MuiButton-root {
        border: 2px solid #00000;
        border-radius: 4px;
        padding: 8px 16px;
        cursor: pointer;
    }
`;

const Title = styled(Typography)`
    &.MuiTypography-root {
        font-size: 20px;
        font-weight: bold;
    }
`;

const StyledDialogContent = styled(DialogContent)`
    &.MuiDialogContent-root {
        width: 480px;
        padding-right: 16px;
        padding-left: 16px;
        padding-top: 24px;
        padding-bottom: 24px;
        max-height: 280px;
        overflow-y: auto;
    }

    /* Custom scrollbar styling */
    &::-webkit-scrollbar {
        width: 6px;
    }

    &::-webkit-scrollbar-thumb {
        background-color: #888;
        border-radius: 10px;
    }

    &::-webkit-scrollbar-thumb:hover {
        background-color: #555;
    }

    &::-webkit-scrollbar-track {
        background: #f1f1f1;
    }
`;

const StyledDialogTitle = styled(DialogTitle)`
    &.MuiDialogTitle-root {
        padding-right: 16px;
        padding-left: 16px;
        background: #f5f5f5;
    }
`;

const StyledDialogActions = styled(DialogActions)`
    &.MuiDialogActions-root {
        padding: 14px 16px;
        background: #f5f5f5;
    }
`;

const Label = styled(Typography)`
    &.MuiTypography-root {
        font-size: 14px;
    }
`;

const StyledSelect = styled(Select)`
    .MuiSelect-outlined {
    padding:23px 32px 6px 12px;
    }

    &.Mui-focused .MuiOutlinedInput-notchedOutline {
        border: 1px solid #3f51b5;
        box-shadow:rgba(63, 81, 181, 0.25) 0 0 0 1px;
    }

    &.Mui-focused:hover .MuiOutlinedInput-notchedOutline {
        border: 1px solid #3f51b5;
        box-shadow:rgba(63, 81, 181, 0.25) 0 0 0 1px;
    }   

    &:hover .MuiOutlinedInput-notchedOutline {
        border-color:lightgrey;
    }
`;
const StyledInputLabel = styled(InputLabel)`
    &.MuiInputLabel-shrink {
        transform: translate(0px, 12px) scale(0.75);
    }
    font-size:14px;
    color:rgb(142, 142, 142);
    font-weight:normal;
    &.MuiInputLabel-root {
        margin-top: -6px;
        margin-left: 12px; 
    }
`;
const StyledFormControl = styled(FormControl)`
   .MuiOutlinedInput-root{
    border-radius:0px;
    font-size:14px;
   }
`;

const FlexGrowGrid = styled(Grid)`
    flex-grow: 1;
    background: #f5f5f5;
`;
const StyledMenuItem = styled(MenuItem)`
    padding-top:0px;
    padding-bottom:0px;
`;

const StyledListItemText = styled(ListItemText)`
    .MuiTypography-body1{
        font-size:14px;
        display: flex;
        align-items: center;
        max-width: 200px;
    }
`;

function CustomDialog({
    open,
    onClose,
    handleSubmit,
    title,
    fields,
    errors,
    handleChange,
    type,
    source,
    buttonSingleClick
}) {
    let buttonContent;
    if (title.includes("SMS Contacts") || title.includes("Remote Users")) {
        buttonContent = "Login";
    } else {
        buttonContent = "Save";
    }
    const fieldRefs = useRef({});

    useEffect(() => {
        if (errors && Object.keys(errors).length > 0) {
            scrollToFirstError();
        }
    }, [errors]);

    const scrollToFirstError = () => {
        const firstErrorField = Object.keys(errors).find((fieldName) => errors[fieldName]);
        if (firstErrorField) {
            const fieldRef = fieldRefs.current[firstErrorField];
    
            let element;
            if (fieldRef?.node) {
                // Case for structured object refs
                element = fieldRef.node;
            } else {
                // Case for plain input element refs
                element = fieldRef;
            }
    
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    };
    
    const saveForm = (e) => {
        e.preventDefault();

        handleSubmit(e);

        // Scroll immediately if validation fails
        if (Object.keys(errors).length > 0) {
            scrollToFirstError();
        }
    }

    const handleKeyPress =(e,field)=>{
        const keys = ["e", "E", "+", "-"];
        
        if (field.type === "number") {
            if(!field?.enableDot && !keys.includes(".")){
                keys.push(".")
            }
            if (keys.includes(e.key)) {
                e.preventDefault();
            }
        }
    }

    return (
        <Dialog open={open} disablePortal style={{ zIndex: 1300, position: "fixed" }}>
            <Grid container>
                <FlexGrowGrid item>
                    <StyledDialogTitle className="dialogTitle">
                        <Title>{title}</Title>
                    </StyledDialogTitle>
                </FlexGrowGrid>
            </Grid>
            <StyledDialogContent dividers className="dialogContent">
                <Grid container spacing={1}>
                    {fields.map((field, index) => {
                        if (field !== null) {
                            return (
                                <React.Fragment key={index}>
                                    <Grid item md={source === 'Station' ? 6 : 5} xs={6} style={{marginTop:"13px"}}>
                                        <Label variant="body1" className="dialogContentText">
                                            {field.label}
                                        </Label>
                                    </Grid>
                                    <Grid item md={source === 'Station' ? 6 : 7} xs={6}>
                                        {field.type === "checkBoxField" ? (
                                            <StyledFormControl fullWidth>
                                                <StyledInputLabel id={`${field.name}-label`} type={type} required={field.isRequired}>
                                                    {field.label}
                                                </StyledInputLabel>
                                                <StyledSelect
                                                    labelId={`${field.name}-label`}
                                                    id={field.name}
                                                    multiple
                                                    value={Array.isArray(field.value) ? field.value : []}
                                                    onChange={(e) => { handleChange(field.name, e.target.value); }}
                                                    renderValue={(selected) => Array.isArray(selected) ? selected.join(", ") : ""}
                                                    variant="outlined"
                                                    required={field.isRequired}
                                                    MenuProps={{
                                                        disablePortal: true,
                                                        getContentAnchorEl: null,
                                                        anchorOrigin: {
                                                            vertical: "bottom",
                                                            horizontal: "left",
                                                        },
                                                        transformOrigin: {
                                                            vertical: "top",
                                                            horizontal: "left",
                                                        },
                                                        PaperProps: {
                                                            style: {
                                                                maxHeight: 200,
                                                                overflowY: "auto",
                                                                scrollbarWidth: "thin",
                                                            },
                                                        },
                                                    }}
                                                    inputRef={(el) => (fieldRefs.current[field.name] = el)}
                                                >
                                                    {Array.isArray(field.options) && field.options.map((option) => (
                                                        <StyledMenuItem 
                                                        key={option} 
                                                        value={option}
                                                        >
                                                            <Checkbox
                                                                checked={Array.isArray(field.value) ? field.value.includes(option) : false}
                                                                color="primary"
                                                            />
                                                            <StyledListItemText>
                                                                <div style={{ maxWidth: "180px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                                                                    {option}
                                                                </div>
                                                            </StyledListItemText>
                                                            
                                                        </StyledMenuItem>
                                                    ))}
                                                </StyledSelect>

                                                {/* {errors && errors[field.name] && (
                                                    <FormHelperText error>
                                                        {errors[field.name]}
                                                    </FormHelperText>
                                                )} */}
                                            </StyledFormControl>
                                        ) :
                                        field.readOnly ? (
                                            <RedditTextField
                                                label={field.label}
                                                value={field.value}
                                                variant="filled"
                                                id={field.name}
                                                InputLabelProps={{
                                                    style: styles.label,
                                                }}
                                                type={field?.type}
                                                disabled={field.disabled}
                                            />
                                        ) : (
                                            <RedditTextField
                                                required={field.isRequired}
                                                label={field.label}
                                                value={field.value}
                                                onClick={(e) => e.stopPropagation()}
                                                styledText={source}
                                                onChange={(e) => {
                                                    console.log(
                                                        "e",
                                                        e.target.value
                                                    );

                                                    const value = e.target.value;

                                                    if (field.type === "number" && Number(value) < 0) {
                                                        return;
                                                    }

                                                    handleChange(
                                                        field.name,
                                                        e.target.value,
                                                        field.type
                                                    );
                                                }}
                                                variant="filled"
                                                id={field.name}
                                                inputRef={(el) => (fieldRefs.current[field.name] = el)}
                                                InputLabelProps={{
                                                    style: styles.label,
                                                }}
                                                type={field?.type}
                                                onKeyDown={(e) => handleKeyPress(e,field)}
                                                options={field?.options}
                                                disabled={field.disabled}
                                            />
                                        )}
                                        {errors && errors[field.name] && (
                                            <FormHelperText error>
                                                {errors[field.name]}
                                            </FormHelperText>
                                        )}
                                    </Grid>
                                </React.Fragment>
                            );
                        }
                        return null;
                    })}
                </Grid>
            </StyledDialogContent>
            <StyledDialogActions className="dialogFooter">
                <CancelButton variant="outlined" onClick={onClose} className="cancelButton">
                    Cancel</CancelButton>
                <LoginButton
                    type="submit"
                    variant="contained"
                    color="primary"
                    onClick={(e)=> handleSubmit(e)}
                    className="saveButton"
                >
                    {buttonContent}
                </LoginButton>
            </StyledDialogActions>
        </Dialog>
    );
}

export default CustomDialog;
