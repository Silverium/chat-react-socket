import React from 'react'
import { useTranslation } from 'react-i18next'
import upperFirst from 'lodash-es/upperFirst'

import './NavBar.scss'
import { AppTabProps } from '@/constants' // eslint-disable-line no-unused-vars
export interface NavBarProps {
  tabs: AppTabProps[];
  activeTab: string;
  onTabSelect: (name: string) => void;
  unreadMsg: number;
  onHeightChange: (n:number)=> void;
}
const NavBar: React.FunctionComponent<NavBarProps> = ({ tabs, activeTab, onTabSelect, unreadMsg, onHeightChange }) => {
  const ref = React.useRef(null)
  React.useEffect(() => {
    onHeightChange(ref.current.clientHeight)
  })
  const { t } = useTranslation()
  return (
    <ul ref={ref} className='NavBar sticky'> {
      tabs.map(({ name, href }) => (
        <li key={name} className={`NavBar__tab ${activeTab === name ? 'selected' : ''}`} onClick={() => onTabSelect(name)}>
          <a {...{ href }}>
            {upperFirst(t(name))}
            {name === 'chat' && unreadMsg > 0 && <strong> {unreadMsg}</strong>}
          </a>
        </li>
      ))
    }
    </ul>
  )
}

export default NavBar
