import React from 'react'

import './NavBar.scss'
import { AppTabProps } from '../../constants'
export interface NavBarProps {
  tabs: AppTabProps[];
  selected: string;
  setSelected: (name: string) => void;
}
const NavBar: React.FunctionComponent<NavBarProps> = ({ tabs, selected, setSelected }) => (
  < ul className='NavBar' > {
    tabs.map(({ name, href }) => (
      <li key={name} className={`NavBar__tab ${selected === name ? 'selected' : ''}`} onClick={() => setSelected(name)} >
        <a {...{ href }}>{name}</a>
      </li>
    ))
  }
  </ul >
)


export default NavBar