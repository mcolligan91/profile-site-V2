import React, { useState } from 'react';
import { Accordion, Icon, Header, Grid, List } from 'semantic-ui-react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './JobAccordion.scss';

const JobAccordion = ({isInverted, accordionIdx, job}) => {
    const {jobHeader, positions, companyLink} = job;

    const [activeIndex, setActiveIndex] = useState(0);

    const handleClick = (e, {index}) => {
        setActiveIndex(prevIndex => (prevIndex === index ? -1 : index));
    };

    const renderPositions = (positions, activeIndex, handleClick) => {
        return positions.map(({positionTitle, positionDates, positionBullets}, i) => (
            <React.Fragment key={i}>
                <Accordion.Title active={activeIndex === i} index={i} className={activeIndex === i ? 'open-accordion-title' : 'closed-accordion-title'} onClick={handleClick}>
                    <Icon name={activeIndex === i ? 'chevron down' : 'chevron right'} />
                    <span className='job-title-text'>{positionTitle}</span>
                    &nbsp;
                    <span className='job-title-text-divider'>&#47;&#47;</span>
                    &nbsp;
                    <i className='job-dates-text'>{positionDates}</i>
                </Accordion.Title>
                <Accordion.Content active={activeIndex === i}>
                    <List bulleted relaxed className='job-accordion-list'>
                        {positionBullets.map((bullet, j) => (
                            <List.Item key={j} className='job-bullet'>{bullet}</List.Item>
                        ))}
                    </List>
                </Accordion.Content>
            </React.Fragment>
        ));
    };

    const headerRow = (
        <Grid.Row className='job-header-row'>
            <a href={companyLink} target='_blank' rel="noreferrer">
                <Header as='h2' className='job-accordion-header' content={jobHeader} />
            </a>
        </Grid.Row>
    );

    const accordionRow = (
        <Grid.Row className='job-accordion-row'>
            <Accordion styled className={`job-accordion ${isInverted ? 'job-accordion-inverted' : ''}`}>
                {renderPositions(positions, activeIndex, handleClick)}
            </Accordion>
        </Grid.Row>
    );

    return (
        <Grid textAlign='center' className={accordionIdx !== 0 ? 'trailing-job-accordion' : ''}>
            {headerRow}
            {accordionRow}
        </Grid>
    );
};

const mapStateToProps = ({IsInvertedReducer: {isInverted}, IsMobileReducer: {isMobile}}) => ({
	isInverted,
	isMobile
});

JobAccordion.propTypes = {
	isInverted: PropTypes.bool.isRequired,
	accordionIdx: PropTypes.number.isRequired,
    job: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(JobAccordion);
