import React, { useState } from 'react';
import MaterialUiPhone from 'material-ui-phone-number';
import TextField from '@material-ui/core/TextField';
import Styles from './styles/input-styles';
import { MenuItem } from '@material-ui/core';

/**
 * Input Component  
 */
const Input = (props: any) => {
    const classes = Styles();
    const [selected, setSelected] = useState<any>('none');

    // Styling classes for the inputLabel
    const InputLabelProps = {
        classes: {
            // root: classes.inputLabel,
            focused: classes.inputFocusedLabel
        }
    };

    // Styling classes for the inputs
    const InputProps = {
        classes: {
            root: classes.inputField,
            notchedOutline: props.error ? classes.inputNotchedOutlineError : classes.inputNotchedOutline,
        }
    }

    if (props.type === "phone") {
        return (
            <MaterialUiPhone defaultCountry='eg'
                regions={['middle-east', 'north-africa']}
                variant="outlined"
                label="Phone Number"
                name="phone"
                required
                fullWidth
         
                // Work-around to pass phoneInput to onInputChange(), as MaterialUiPhone doesn't support inputRef
                onChange={(value: any) => {
                    props.onChange(value)
                }}

                InputLabelProps={InputLabelProps}
                InputProps={InputProps}
                error={props.error ? true : false}
                helperText={props.error} />
        )
    } else if (props.type === "select") return (
        <TextField
            select
            fullWidth
            onChange={(e) => {
                props.value && props.value(e.target.value);
                props.onChange && props.onChange();
            }}
            inputRef={props.inputRef} 
            label={props.name}
            required
            InputLabelProps={InputLabelProps}
            InputProps={InputProps}
            variant="outlined"
            // defaultValue={'none'}
            value={selected}
            error={props.error ? true : false}
            helperText={props.error}>
            <MenuItem value="none" disabled>{props.title}</MenuItem>
            {props.selectOptions.length > 0 && props.selectOptions.map((option: any, index: number) => (
                <MenuItem key={index} value={option._id ? option._id : option.id} 
                onClick={() => {
                    setSelected(option.id ? option.id : option._id)
                }}>{option.name}</MenuItem>
            ))}
        </TextField>
        
    )
    return (
        <TextField
            inputProps={{ maxLength: props.maxLength }}
            error={props.error ? true : false}
            autoComplete={props.name}
            name={props.name}
            variant="outlined"
            type={props.type ? props.type : ""}
            required
            fullWidth
            helperText={props.error}
            label={props.name}
            autoFocus
            inputRef={props.inputRef} onChange={props.onChange}
            InputLabelProps={InputLabelProps}
            InputProps={InputProps}
            rows={props.rows}
            multiline={props.multiline}
            value={props.value}

        />
    )
}

export default Input;
