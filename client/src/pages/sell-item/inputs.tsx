import React, {useState, SyntheticEvent, useRef } from 'react';
import Styles from './styles/styles';
import { Grid, CircularProgress, Button } from '@material-ui/core';
import Input from '../../components/InputComponent';

function Inputs(props: any) {
    const classes = Styles();
    const [button, setButton] = useState<boolean>(false);

    const titleInput = useRef<HTMLInputElement>(null);
    const detailsInput = useRef<HTMLInputElement>(null);
    const priceInput = useRef<HTMLInputElement>(null);
    const categoryInput = useRef<HTMLInputElement>(null);

    /**
     * Send input values to the parent component
     */
    const onInputChange = () => {

        const title = titleInput.current?.value;
        const details = detailsInput.current?.value;
        const category = categoryInput.current?.value;
        const price = priceInput.current?.value;
        let inputData = { title, details, price, category };

        if(!title || !details || !category || !price) setButton(false);
        else setButton(true);

        console.log(category)

        props.sendDataToParent(inputData)
    };

    /**
     * Perform the onSubmit props function once the submit button is clicked
     */

    const onSubmit = (e: SyntheticEvent) => {
        e.preventDefault();
        props.onSubmit();
    };

    return (
        <form className={classes.form} noValidate onSubmit={(e) => onSubmit(e)}>

            <Grid item xs={12}>
                <Input name="Title" inputRef={titleInput} onChange={onInputChange} error={props.errors.title} />
            </Grid>
            <br />

            <Grid item xs={12}>
                <Input
                    name="Product Information"
                    inputRef={detailsInput}
                    onChange={() => onInputChange()}
                    multiline={true}
                    rows={12}
                    error={props.errors.details} 
                />
            </Grid>

            <br />

            <Grid item xs={12}>
                <Input name="Price" inputRef={priceInput} onChange={onInputChange} type='number'/>
            </Grid>

            <br />

            <Grid item xs={12}>
                <Input
                    name="Select Category"
                    inputRef={categoryInput}
                    onChange={onInputChange}
                    type='select'
                    error={props.errors.category}
                    selectOptions={props.categories}
                />
            </Grid>

            <Button disabled={!button ? !button : props.loading} type="submit" fullWidth variant="contained" color="primary" onClick={() => onInputChange()}
                className={classes.submit}>
                {props.loading ? <CircularProgress size={26} /> : "Submit"}
            </Button>
        </form>
    )
}

export default Inputs;