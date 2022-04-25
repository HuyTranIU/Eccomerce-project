import React from 'react'
import { makeStyles, Step, StepConnector, StepLabel, Stepper, Typography } from '@material-ui/core';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import LibraryAddCheckIcon from '@material-ui/icons/LibraryAddCheck';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import { withStyles } from '@material-ui/styles';
import clsx from "clsx";

function CheckoutSteps({ activeStep }) {

    const ColorlibConnector = withStyles({
        alternativeLabel: {
            top: 22
        },
        active: {
            "& $line": {
                backgroundImage:
                    "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)"
            }
        },
        completed: {
            "& $line": {
                backgroundImage:
                    "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)"
            }
        },
        line: {
            height: 3,
            border: 0,
            backgroundColor: "#eaeaf0",
            borderRadius: 1
        }
    })(StepConnector);

    const useColorlibStepIconStyles = makeStyles({
        root: {
            backgroundColor: "#ccc",
            zIndex: 1,
            color: "#fff",
            width: 50,
            height: 50,
            display: "flex",
            borderRadius: "50%",
            justifyContent: "center",
            alignItems: "center"
        },
        active: {
            backgroundImage:
                "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
            boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)"
        },
        completed: {
            backgroundImage:
                "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)"
        }
    });


    function ColorlibStepIcon(props) {
        const classes = useColorlibStepIconStyles();
        const { active, completed } = props;

        const icons = {
            1: <LocalShippingIcon />,
            2: <LibraryAddCheckIcon />,
            3: <AccountBalanceIcon />
        };

        return (
            <div
                className={clsx(classes.root, {
                    [classes.active]: active,
                    [classes.completed]: completed
                })}
            >
                {icons[String(props.icon)]}
            </div>
        );
    }

    const steps = [
        {
            label: <Typography>Shipping Details</Typography>,
        },
        {
            label: <Typography>Confirm Order</Typography>,
        },
        {
            label: <Typography>Payment</Typography>,
        },
    ]

    return (
        <>
            <Stepper activeStep={activeStep} alternativeLabel connector={<ColorlibConnector />} >
                {steps.map((item, idx) => (
                    <Step key={idx}>
                        <StepLabel StepIconComponent={ColorlibStepIcon}>{item.label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
        </>
    )
}

export default CheckoutSteps