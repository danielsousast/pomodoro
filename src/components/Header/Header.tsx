/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import { Scroll, Timer } from 'phosphor-react'
import { HeaderContainer } from './Header.styles'
import Logo from '../../assets/logo.svg'
import { NavLink } from 'react-router-dom'

export const Header: React.FC = () => {
  return (
    <HeaderContainer>
      <img src={Logo} />
      <nav>
        <NavLink to="/" title="Timer">
          <Timer size={24} />
        </NavLink>
        <NavLink to="/history" title="Histórico">
          <Scroll size={24} />
        </NavLink>
      </nav>
    </HeaderContainer>
  )
}
