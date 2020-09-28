// Dependencies
import React, {Component} from 'react';
import {connect} from 'react-redux';

// Material-UI
import AppBar from '@material-ui/core/AppBar';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Divider from '@material-ui/core/Divider';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';


// Components
import Selection from 'components/partials/Selection';
import Options from 'components/partials/Options';
import AlternativeSelections from 'components/partials/AlternativeSelections';

// Assets
import FlowChordLogo from 'assets/svg/flowchord-logo-white.svg';

// Stylesheets
import style from 'components/partials/MainAppBar.module.scss';

class MainAppBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDrawerOpen: false
    };
    this.handleDrawerOpen = this.handleDrawerOpen.bind(this);
    this.handleDrawerClose = this.handleDrawerClose.bind(this);
  }

  handleDrawerOpen() {
    this.setState({isDrawerOpen: true});
  };
  handleDrawerClose() {
    this.setState({isDrawerOpen: false});
  };

  render() {
    return (<React.Fragment>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="Open drawer" onClick={this.handleDrawerOpen}>
            <MenuIcon/>
          </IconButton>
          <img src={FlowChordLogo} alt="FlowChord logo" className={style.appBarLogo} />
          <Selection/>
          <AlternativeSelections />
        </Toolbar>
      </AppBar>
      <SwipeableDrawer anchor='left' open={this.state.isDrawerOpen} onClose={this.handleDrawerClose} onOpen={this.handleDrawerOpen}>
        <div>
          <IconButton onClick={this.handleDrawerClose}>
            <ChevronLeftIcon/>
          </IconButton>
        </div>
        <Divider/>
        <Options/>
      </SwipeableDrawer>
    </React.Fragment>);
  }
}



export default connect(null, null)(MainAppBar);
