import React from 'react'
import { useTranslation } from 'react-i18next'
import upperFirst from 'lodash-es/upperFirst'

import './NavBar.scss'
import { AppTabProps } from '../../constants' // eslint-disable-line no-unused-vars
export interface NavBarProps {
  tabs: AppTabProps[];
  selected: string;
  setSelected: (name: string) => void;
}
const NavBar: React.FunctionComponent<NavBarProps> = ({ tabs, selected, setSelected }) => {
  const { t } = useTranslation()
  return (
    <ul className='NavBar'> {
      tabs.map(({ name, href }) => (
        <li key={name} className={`NavBar__tab ${selected === name ? 'selected' : ''}`} onClick={() => setSelected(name)}>
          <a {...{ href }}>{upperFirst(t(name))}</a>
        </li>
      ))
    }
    </ul>
  )
}

export default NavBar
