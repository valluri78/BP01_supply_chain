export const trimAdditionalSpace = val => {
    if(typeof val === "string"){

        const dataValue = val.trimStart();
        
        if(dataValue.indexOf("  ") !== -1) {
            return dataValue.replace("  "," ");
        }
        
        return dataValue;
    }
    return val
}