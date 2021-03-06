import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Container, Content, Profile } from './styles';

import Notifications from '../Notifications';

import purpleIcon from '../../assets/images/icon-purple.svg';

export default function Header() {
  const profile = useSelector(state => state.user.profile);
  return (
    <Container>
      <Content>
        <nav>
          <img src={purpleIcon} alt="GoBarber" />
          <Link to="/Dashboard"> DASHBOARD </Link>
        </nav>

        <aside>
          <Notifications />
          <Profile>
            <div>
              <strong> {profile.name}</strong>
              <Link to="/profile"> Meu Perfil</Link>
            </div>
            <img
              src={
                profile.avatar.url ||
                'https://api.adorable.io/avatars/50/abott@adorable.png'
              }
              alt="Renan Melo"
            />
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
