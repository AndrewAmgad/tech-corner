import React, { useEffect, useState, Dispatch } from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router';
import MetaTags from 'react-meta-tags';
import { LinearProgress, Container, Typography } from '@material-ui/core';
import { displaySnackBar } from '../../redux/actions/notifications';
import Inputs from './inputs';
import { createItem, uploadImages, fetchItems, getCategories } from '../../redux/actions/items';
import Upload from './image-upload';
import useStyles from './styles/styles';
import Category from '../../types/Category';

// Metatags
const PageMetaTags = () => (
    <MetaTags>
        <title>Tech Corner - Sell Item</title>
        <meta name="description" content="Sell a new item on Tech Corner" />
        <meta property="og:title" content="Tech Corner - Sell Item" />
    </MetaTags>
)

interface Props extends RouteComponentProps {
    displaySnackBar: (open: boolean, content: string, severity: string) => void,
    createItem: (body: any, cb: any) => void,
    uploadImages: (itemId: string, body: any, cb: any) => void,
    fetchItems: () => void,
    getCategories: () => void,
    authError: object,
    response: object,
    error: object,
    history: any,
    checkAuthLoading: boolean,
    categories: Array<Category>,
}

function SellItemPage(props: Props) {
    const [inputs, setInputs] = useState<any>();
    const [images, setImages] = useState<any>();
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState<boolean>(false);
    const classes = useStyles();

    const {
        authError, history, displaySnackBar, response, error,
        checkAuthLoading, createItem, uploadImages, fetchItems,
        categories, getCategories
    } = props;

    // Redirect to sign in page if user is not authenticated
    useEffect(() => {
        getCategories()
        if (authError && !checkAuthLoading) {
            displaySnackBar(true, 'You have to sign in before selling an item', 'warning');
            history.push('/signin');
        }
    }, [authError]);

    // Get inputs value from child inputs component
    const getInputData = (inputData: any) => {
        setInputs(inputData);
    }

    // Get images from the Upload component
    const getImageData = (imageData: any) => {
        setImages(imageData);
        setErrors({ ...errors, images: null })
    }

    // Submit data to the API
    const onSubmit = () => {
        const { title, details, price, category } = inputs;
        let errorsObject = {};
        let error: boolean = false;

        // Error handling
        if (category === 'none') { errorsObject = { ...errorsObject, category: "Please select a category" }; error = true }
        else { errorsObject = { ...errorsObject, category: null }; error = false }

        if (!images) { errorsObject = { ...errorsObject, images: "Please select at least 1 image" }; error = true }
        else { errorsObject = { ...errorsObject, images: null }; error = false }

        if (error) return setErrors(errorsObject);
        else setErrors({});

        const payload = { title, details, price, category };
        setLoading(true);

        // POST Action
        createItem(payload, (response: any, error: any) => {

            if(response) displaySnackBar(true, 'Post is currently processing...', 'info');
            setLoading(false)

            if (error) return setErrors(error.reason);

            let formData = new FormData();
            Array.from(images).forEach((image: any) => {
                formData.append('itemImages', image, image.name);
            });

            // Start image upload once the item is created
            uploadImages(response._id, formData, () => {

                // Display success snackbar & refetch the homepage posts once the images are uploaded
                displaySnackBar(true, 'Your post is now active', 'success');
            });

            // Redirect to the home page
            history.push('/');
        })
    }

    // Return loading progress bar if check auth is loading
    if (checkAuthLoading) return <LinearProgress />

    return (
        <Container component='main'>
            <PageMetaTags />
            {loading && <LinearProgress />}
            <div className={classes.paper}>
                <Typography component="h1" variant="h4" className={classes.title}>Add a new item</Typography>
                <Upload sendDataToParent={getImageData} errors={errors} />
                <Container component='main' maxWidth='xs'>
                    <Inputs
                        onSubmit={onSubmit}
                        sendDataToParent={getInputData}
                        errors={errors}
                        loading={loading}
                        categories={categories} />
                </Container>

            </div>
        </Container>
    )
}

// Map the reducers' state to the component's props
const mapStateToProps = (state: any) => {
    const { checkAuthError, checkAuthLoading } = state.authReducer;
    const { response, error, loading } = state.createItemReducer;
    const { response: categories } = state.categoriesReducer;

    return {
        authError: checkAuthError,
        checkAuthLoading: checkAuthLoading,
        response: response,
        categories: categories,
        error: error,
        loading: loading
    }
};

// Map redux actions to the component props
const mapDispatchToProps = (dispatch: Dispatch<any>) => {
    return {
        displaySnackBar: (open: boolean, content: string, severity: string) => {
            dispatch(displaySnackBar(open, content, severity))
        },

        createItem: (body: any, cb: (response: any, error: any) => void) => {
            dispatch(createItem(body, cb))
        },

        uploadImages: (itemId: string, body: any, cb: () => void) => {
            dispatch(uploadImages(itemId, body, cb))
        },

        fetchItems: () => {
            dispatch(fetchItems())
        },

        getCategories: () => {
            dispatch(getCategories())
        }
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SellItemPage));