import React from 'react';
import { Header } from 'semantic-ui-react';
import { Fade } from 'react-reveal';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './SectionHeader.scss';

const SectionHeader = ({isInverted, content}) => {
    return (
        <Fade bottom duration={750} distance='50px'>
            <Header as='h1' className={`section-header ${isInverted ? 'section-header-inverted' : ''}`} content={content} />
        </Fade>
    );
}

const mapStateToProps = (state) => {
    return {
		isMobile: state.IsMobileReducer.isMobile,
        isInverted: state.IsInvertedReducer.isInverted
    };
}

SectionHeader.propTypes = {
	isInverted: PropTypes.bool.isRequired,
	content: PropTypes.string.isRequired
};

export default connect(mapStateToProps)(SectionHeader);