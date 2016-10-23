// Component here uses ES6 destructuring syntax in import, what is means is "retrieve the property 'Component' off of the object exported from the 'react'"
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { get } from 'lodash';

// styling
import './index.css';

// action creators
import { localAuthRequest, logoutRequest } from '../../redux/actionCreators/user';


@connect((store) => ({
  user: store.user
}))
export default class NavAuth extends Component {
  static propTypes = {
    user: PropTypes.shape({
      email: PropTypes.string,
      createdDate: PropTypes.string,
      hasPassword: PropTypes.bool,
      google: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        photo: PropTypes.string.isRequired,
        link: PropTypes.string.isRequired
      }),
      facebook: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        photo: PropTypes.string.isRequired,
        link: PropTypes.string.isRequired
      })
    }),
    dispatch: PropTypes.func.isRequired
  }

  handleLocalAuth = () => {
    const email = this.refs.email && this.refs.email.value;
    const password = this.refs.password && this.refs.password.value;
    this.props.dispatch(
      localAuthRequest(this.props.user ? this.props.user._id : null, email, password)
    );
  }

  logout = () => this.props.dispatch(logoutRequest());

  render() {
    const user = this.props.user;
    const loggedIn = !!get(user, 'email'); // if user has email property, they're logged in
    const authErrorMessage = get(user, 'authErrorMessage');

    return (
      <ul className="navbar-auth nav navbar-nav navbar-right">
        <li
          className={`nav user-photo ${get(user, 'google.photo') && 'show'}`}
          style={get(user, 'google.photo') && {backgroundImage: `url(${user.google.photo})`}}
        />
        <li
          className={`nav user-photo ${get(user, 'facebook.photo') && 'show'}`}
          style={get(user, 'facebook.photo') && {backgroundImage: `url(${user.facebook.photo})`}}
        />
        <li className="nav-button">
          {
            (!loggedIn || !user.hasPassword || !user.google || !user.facebook) // check user ""
            &&
            <span>
              LOG IN &#10161;
              {
                !get(user, 'google')
                &&
                <a href="/auth/google">
                  <i className="fa fa-google o-auth-btn"/>
                </a>
              }
              {
                !get(user, 'facebook')
                &&
                <a href="/auth/facebook">
                  <i className="fa fa-facebook o-auth-btn"/>
                </a>
              }
              {
                !loggedIn
                &&
                <input
                  className="nav-input"
                  ref="email"
                  placeholder="email"
                  type="text"
                />
              }
              {/*Repeating logic the the two below because of some CSS annoying-ness*/}
              {
                !get(user, 'hasPassword')
                &&
                <input
                  className="nav-input"
                  ref="password"
                  placeholder="password"
                  type="password"
                />
              }
              {
                !get(user, 'hasPassword')
                &&
                <button
                  className="local-auth-button"
                  onClick={this.handleLocalAuth}
                >
                  Post LocalAuth
                </button>
              }
            </span>
          }
          {
            loggedIn
            &&
            <a
              className="nav-button log-out-button show"
              href="#"
              onClick={this.logout}
            >
              LOG OUT
            </a>
          }
        </li>
        {
          authErrorMessage
          &&
          <div className="auth-error">
            {authErrorMessage}
          </div>
        }
      </ul>
    );
  }
}
