import React, { useState } from 'react';
import { AccordionTitle, AccordionContent, Accordion, Icon, Header, Grid, List, ListItem } from 'semantic-ui-react';
import { Fade } from 'react-reveal';
import { connect } from 'react-redux';

import './JobAccordion.scss';

const JobAccordion = (props) => {
    const [activeIndex, setActiveIndex] = useState(0);

    const handleClick = (e, titleProps) => {
        const {index} = titleProps;
        setActiveIndex( activeIndex === index ? -1 : index );
    }
   
    const {isInverted, accordionIdx, job} = props,
        {jobHeader, positions, companyLink} = job;

    return (
        <Grid textAlign='center' className={accordionIdx != 0 ? 'trailing-job-accordion' : ''}>
            <Grid.Row className='job-header-row'>
                <a href={companyLink} target='_blank'>
                    <Header as='h2' className='job-accordion-header' content={jobHeader} />
                </a>
            </Grid.Row>
            <Grid.Row className='job-accordion-row'>
                <Accordion styled className={`job-accordion ${isInverted ? 'job-accordion-inverted' : ''}`}>
                    {positions.map((position, i) => {
                        const { positionTitle, positionDates, positionBullets } = position;
                        return (
                            <React.Fragment key={i}>
                                <Accordion.Title active={activeIndex === i} index={i} className={activeIndex === i ? 'open-accordion-title' : 'closed-accordion-title'} onClick={handleClick}>
                                    <Icon name={activeIndex === i ? 'chevron down' : 'chevron right'} />
                                    <span className='job-title-text'>{positionTitle}</span>
                                    &nbsp;
                                    <span className='job-title-text-divider'>//</span>
                                    &nbsp;
                                    <i className='job-dates-text'>{positionDates}</i>
                                </Accordion.Title>
                                <Accordion.Content active={activeIndex === i}>
                                    <List bulleted relaxed className='job-accordion-list'>
                                        {positionBullets.map((bullet, j) => (
                                            <List.Item key={j}>{bullet}</List.Item>
                                        ))}
                                    </List>
                                </Accordion.Content>
                            </React.Fragment>
                        )
                    })}
                </Accordion>
            </Grid.Row>
        </Grid>
    )
}


const mapStateToProps = (state) => {
    return {
		isMobile: state.IsMobileReducer.isMobile,
        isInverted: state.IsInvertedReducer.isInverted
    }
}

export default connect(mapStateToProps)(JobAccordion);