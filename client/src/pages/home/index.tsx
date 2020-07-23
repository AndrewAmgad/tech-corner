import React, { useEffect, Dispatch, useState } from 'react';
import { Container, LinearProgress } from '@material-ui/core'
import { withRouter, RouteComponentProps } from 'react-router';
import { connect } from 'react-redux';
import { fetchItems, getCategories, clearItems, addToFavorites } from '../../redux/actions/items';
import HomeStyles from './styles/home';
import MetaTags from 'react-meta-tags';

// Home Page Sections
import SearchBar from '../../components/SearchBar'
import { Categories } from './categories'
import RecentItems from './recent-items';
import Category from '../../types/Category';

const PageMetaTags = () => (
    <MetaTags>
        <title>Tech Corner - Home</title>
        <meta name="description" content="Tech Corner Home Page" />
        <meta property="og:title" content="Tech Corner - Home" />
    </MetaTags>
)

interface HomeProps extends RouteComponentProps {
    response: any,
    loading: boolean,
    error: object,
    categoriesResponse: Array<Category>
    categoiresError: object,
    categoriesLoading: boolean,
    fetchItems: (page?: number, cb?: () => void) => void,
    getCategories: () => void,
    clearItems: () => void,
}


function Home(props: HomeProps) {
    const classes = HomeStyles();
    const [paginatedItems, setPaginatedItems] = useState<any>(undefined);
    const [bottomReached, setBottomReached] = useState<boolean>(false);


    // Scrolling event handler for infinite pagination
    const handleScroll = () => {
        const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
        const body = document.body;
        const html = document.documentElement;
        const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
        const windowBottom = windowHeight + window.pageYOffset;
        if (windowBottom + 1000 >= docHeight) {
            setBottomReached(true);
        } else {
            setBottomReached(false)
        }
    }

    useEffect(() => {
        props.fetchItems(1)
        props.getCategories();

        window.addEventListener('scroll', handleScroll)

        // Clean up event listener to avoid memory leaks
        return function cleanup() {
            props.clearItems()
            window.removeEventListener("scroll", handleScroll);
            setPaginatedItems(undefined)
        }
    }, []);

    // Fetch more items once the bottom is reached
    useEffect(() => {
        if (props.response.has_more) {
            if (bottomReached) {
                fetchMore()
            }
        }
    }, [bottomReached])

    const fetchMore = () => {
        props.fetchItems(props.response.page + 1)
    }

    // Append the additional items to the page when fetched
    useEffect(() => {
        if (paginatedItems !== undefined) {
            if (!paginatedItems.includes(props.response.items)) {
                setPaginatedItems([...paginatedItems, ...props.response.items])
            }
        } else paginatedItems === undefined && setPaginatedItems(props.response.items)
    }, [props.response]);


    if (!props.response.items || props.categoriesLoading) return <LinearProgress />

    return (
        <>
            <PageMetaTags />
            <div className={classes.container}>
                <Container className={classes.container} maxWidth='lg'>
                    <SearchBar />
                    <Categories categories={props.categoriesResponse} />
                    <RecentItems items={paginatedItems} />
                </Container>
            </div>
        </>
    )
}

// Map the Redux reducer's state to the component's props
const mapStateToProps = (state: any) => {
    const { response, loading, error } = state.fetchItemsReducer;
    const { response: categoriesResponse, loading: categoriesLoading, error: categoriesError } = state.categoriesReducer;

    return {
        response,
        loading,
        error,
        categoriesResponse,
        categoriesLoading,
        categoriesError
    };
};

// Map the Redux actions to the component's props
const mapDispatchToProps = (dispatch: Dispatch<any>) => {
    return {
        fetchItems: (page?: number, cb?: () => void) => {
            dispatch(fetchItems(page, cb));
        },

        clearItems: () => {
            dispatch(clearItems())
        },

        getCategories: () => {
            dispatch(getCategories());
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Home))