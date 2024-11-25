import { Divider as MuiDivider, SxProps } from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";

export interface DividerProps {
    orientation?: "horizontal" | "vertical";
    variant?: "fullWidth" | "inset" | "middle";
    sx?: SxProps;
    children?: React.ReactNode;
    textAlign?: "left" | "right";
    borderBottomWidth?: string;
    height?: string;
    id?: string;
}

const StyledDivider = styled(MuiDivider, {
    shouldForwardProp: (prop) => prop !== "borderBottomWidth" && prop !== "height",
})<DividerProps>(({ theme, borderBottomWidth, height }) => ({
    borderColor: theme.palette.Borders.highEmphasis,
    color: theme.palette.text.mediumEmphasis,
    borderBottomWidth: borderBottomWidth ?? undefined,
    height: height ?? undefined,
    "&::before, &::after": {
        width: "100%",
        borderTop: "thin solid #413F4D",
    },
}));


const Divider: React.FC<DividerProps> = ({ orientation, variant, sx, children, textAlign, id, borderBottomWidth, height }) => {
   

    return (
            <StyledDivider
                orientation={orientation}
                variant={variant}
                textAlign={textAlign}
                sx={sx}
                borderBottomWidth = {borderBottomWidth}
                height= {height}
                data-testid={id}
            >
                {children}
            </StyledDivider>
    );
}

export default Divider;