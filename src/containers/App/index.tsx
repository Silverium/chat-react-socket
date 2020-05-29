import React from 'react'
import each from 'lodash-es/each'
import { useTranslation } from 'react-i18next'

import '../../i18n'
import './App.scss'
import { useLocal, useChatMessage, useChatHistory, useWindowSize } from '@/effects'
import {
  SocketMessage // eslint-disable-line no-unused-vars
} from '@/socket'
import { SettingsContext } from '@/context/settings'

import { defaultSettings, settingsProps, appTabs } from '@/constants'
import { getTimeFormatter } from '@/helpers'

const Chat = React.lazy(() => import(/* webpackChunkName: "content" */ '@/containers/Chat'))
const Settings = React.lazy(() => import(/* webpackChunkName: "content" */ '@/containers/Settings'))
const NavBar = React.lazy(() => import(/* webpackChunkName: "content" */ '@/components/NavBar'))

const App: React.FunctionComponent<{}> = function () {
  const updateSettings: { [key: string]: React.Dispatch<React.SetStateAction<string>> } = {}
  const settings: { [key: string]: string } = {}
  each(defaultSettings, (defaultValue: string, key: string) => {
    const [settingValue, updateValue] = useLocal(key)
    settings[key] = settingValue || defaultValue
    updateSettings[key] = (toUpdate: string) => {
      settings[key] = toUpdate
      updateValue(toUpdate)
      if (key === settingsProps.LANGUAGE) i18n.changeLanguage(toUpdate)
    }
  })
  const { i18n } = useTranslation()
  const resetSettings = () => {
    each(defaultSettings, (value: string, key: string) => {
      updateSettings[key](value)
    })
    i18n.changeLanguage(defaultSettings[settingsProps.LANGUAGE])
  }
  React.useEffect(() => {
    const rootEl = document.getElementById('chatApp')
    rootEl.className = `themes-${settings[settingsProps.THEME]}`
  }, [settings[settingsProps.THEME]])

  const chatsTab = appTabs[0].name
  const [activeTab, setActiveTab] = React.useState(chatsTab)
  const [unreadMsg, setUnreadMsg] = React.useState(0)
  const [messagesList, setMessagesList] = React.useState([])
  useChatHistory((history) => {
    setMessagesList(history)
  })
  useChatMessage((msgProps: SocketMessage) => {
    setMessagesList(messagesList.concat(msgProps))
    if (activeTab !== chatsTab) setUnreadMsg(unreadMsg + 1)
  })
  const onTabSelect = (tab:string) => {
    setActiveTab(tab)
    if (tab === chatsTab) setUnreadMsg(0)
  }
  const windowSize = useWindowSize()
  const [bodyHeight, setBodyHeight] = React.useState(windowSize.height)
  const onHeightChange = (n:number) => {
    setBodyHeight(windowSize.height - n)
  }

  const APP_CONTENT: { [key: string]: JSX.Element } = {
    chat: <Chat {...{ messagesList, bodyHeight }} />,
    settings: <Settings {...{ bodyHeight }} />
  }
  const timeFormatter = getTimeFormatter(settings[settingsProps.TIME_FORMAT])

  return (
    <SettingsContext.Provider value={{ settings, updateSettings, resetSettings, timeFormatter }}>
      <div className={`App__wrapper themes-${settings.theme}`}>
        <NavBar tabs={appTabs} {...{ activeTab, onTabSelect, unreadMsg, onHeightChange }} />
        <section className='App__content '>
          {APP_CONTENT[activeTab]}
        </section>
      </div>
    </SettingsContext.Provider>
  )
}

export default App
