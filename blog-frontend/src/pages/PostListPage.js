import React from 'react';
import HeaderContainer from '../containers/common/HeaderContainer';
import PostListContainer from '../containers/post/PostListContainer';
import PaginationContainer from '../containers/post/PaginationContainer';

const PostListPage = () => {
    return (
        <>
            <HeaderContainer />
            <PostListContainer />
            <PaginationContainer />
        </>
    );
};

export default PostListPage;
