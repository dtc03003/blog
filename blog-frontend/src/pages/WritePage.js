import React from 'react';
import TagBox from '../components/write/TagBox';
import WriteActionButtons from '../components/write/WriteActionButtons';
import Responsive from '../components/common/Responsive';
import EditorContainer from '../containers/write/EditorContainer';

const WritePage = () => {
    return (
        <Responsive>
            <EditorContainer />
            <TagBox />
            <WriteActionButtons />
        </Responsive>
    );
};

export default WritePage;
