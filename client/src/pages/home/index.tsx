import React, { useEffect, Dispatch } from 'react';
import {Container, LinearProgress} from '@material-ui/core'
import { withRouter, RouteComponentProps } from 'react-router';
import { connect } from 'react-redux';
import { fetchItems } from '../../redux/actions/items';
import HomeStyles from './styles/home';
import MetaTags from 'react-meta-tags';

// Home Page Sections
import SearchBar from '../../components/SearchBar'
import {Categories} from './categories'
import RecentItems from './recent-items';

const PageMetaTags = () => (
    <MetaTags>
        <title>Tech Corner - Home</title>
        <meta name="description" content="Tech Corner Home Page" />
        <meta property="og:title" content="Tech Corner - Home" />
    </MetaTags>
)

interface HomeProps extends RouteComponentProps {
    response: Array<any>,
    loading: boolean,
    error: object,
    fetchItems: () => void
}


function Home(props: HomeProps) {
    const classes = HomeStyles();

    useEffect(() => {
        props.fetchItems()
    }, [])

    if(props.loading){
        return (
            <LinearProgress />
        )
    }

    return (
        <>
            <PageMetaTags />
            <div className={classes.container}>
                <Container className={classes.container} maxWidth='lg'>
                    <SearchBar />
                    <Categories />
                    <RecentItems response={props.response} />
                </Container>
            </div>
        </>
    )
}

// Map the Redux reducer's state to the component's props
const mapStateToProps = (state: any) => {
    const {response, loading, error} = state.fetchItemsReducer;
    return {
        response: response,
        loading: loading,
        error: error,
    };
};

// Map the Redux actions to the component's props
const mapDispatchToProps = (dispatch: Dispatch<any>) => {
    return {
        fetchItems: () => {
            dispatch(fetchItems());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Home))