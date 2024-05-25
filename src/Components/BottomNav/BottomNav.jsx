import React from 'react';
import { Grid, Icon, List, Header, Container, Button } from 'semantic-ui-react';
import Fade from 'react-reveal/Fade';
import { connect } from 'react-redux';

import SiteLogo from '../Shared/SiteLogo/SiteLogo';

import './BottomNav.scss';

const BottomNav = (props) => {
	const {isInverted, isMobile, scrollToTop} = props;

	const contactIcons = [
		{text: 'Gmail', link: 'mailto:mcolligan91@gmail.com', icon: 'mail'},
		{text: 'LinkedIn', link: 'https://www.linkedin.com/in/michael-colligan-189aa196', icon: 'linkedin square'},
		{text: 'GitHub', link: 'https://github.com/mcolligan91', icon: 'github'}
	];

	const contactLinksContent = (
		<Container>
			<SiteLogo classes={'logo-text-static footer-logo'} />
			<Grid textAlign='center'>
				<Grid.Row className='contact-icons-row'>
					<List className='contact-icons-list-container' horizontal relaxed size={isMobile ? 'large' : 'huge'}>
						{contactIcons.map((item, i) => {
							const {text, link, icon} = item;
							return (
								<List.Item key={i} as='a' className='contact-icons-list-item' href={link} target='_blank'>		
										<span>
											<Icon name={icon} className='contact-link-icon' />
										</span>
										<span className={`contact-link-span ${isInverted ? 'contact-link-text-inverted' : 'contact-link-text'}`}>
											{text}
										</span>
								</List.Item>
							);
						})}			
					</List>
				</Grid.Row>
			</Grid>
		</Container>
	);

	const scrollToTopButton = (
		<Fade bottom distance={isMobile ? '10%' : '100%'}>
			<Button className={isInverted ? `explore-button` : 'explore-button-inverted'} circular icon size='huge' inverted onClick={scrollToTop}>
				<Icon name='arrow up' />
			</Button>
		</Fade>
	);

	const footerGridColumns = [
		{
			content: contactLinksContent, 
			columnClass: 'contact-links-container'
		},
		{
			content: <div>© 2024 - Michael Colligan</div>, 
			columnClass: 'copyright-text'
		}
	];

	return (
		<>
			<Grid id='contact-content' className={`bottom-nav-container ${isInverted ? 'bottom-nav-container-inverted' : ''}`} textAlign='center' stackable>
				{footerGridColumns.map((col, i) => {
					const {content, columnClass} = col;
					return (
						<Grid.Row key={i} className={columnClass}>
							{content}
						</Grid.Row>
					);
				})}
			</Grid>
			<Grid className={`bottom-nav-container ${isInverted ? 'bottom-nav-container-inverted' : ''}`} textAlign='center'> 
				<Grid.Row className='scroll-up-botton-container'>
					{scrollToTopButton}
				</Grid.Row>
			</Grid>
		</>
	);
}

const mapStateToProps = (state) => {
    return {
        isInverted: state.IsInvertedReducer.isInverted,
		isMobile: state.IsMobileReducer.isMobile
    }
}

export default connect(mapStateToProps)(BottomNav);