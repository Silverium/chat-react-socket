import React from 'react'
import { useTranslation } from 'react-i18next'
import upperFirst from 'lodash-es/upperFirst'

import { SettingsContext } from '@/context/settings'
import {
  availableSettings,
  settingsProps
} from '@/constants'
import SelectSetting from '@/components/SelectSetting'
import RadioSetting from '@/components/RadioSetting'
import Button from '@/components/Button'
const {
  EMBED_IMAGES,
  EMBED_YOUTUBE,
  LANGUAGE,
  SEND_ENTER,
  REPLACE_SMILEYS,
  THEME,
  TIME_FORMAT,
  USER_NAME
} = settingsProps
interface GetSettingsProps {
  key: string;
  constants: {
    availableSettings: {[key: string] : string[]};
    settings: {[key: string]: string}
    updateSettings: { [key: string]: (key:string)=> void}
    t: (key:string)=> string
    upperFirst: (key:string)=> string
  }
}
const getSettingsProps = (key: GetSettingsProps['key'], { availableSettings, settings, updateSettings, t, upperFirst }: GetSettingsProps['constants']) => ({
  storageKey: key,
  label: upperFirst(t(key)),
  value: settings[key],
  useChange: (value:string) => updateSettings[key](value),
  options: availableSettings[key].map((value: string) => ({
    value,
    text: upperFirst(t(value))
  }))
})
const Settings: React.FunctionComponent<{bodyHeight:number}> = ({ bodyHeight }) => {
  const { t } = useTranslation()
  const { settings, updateSettings } = React.useContext(SettingsContext)
  const constants = { availableSettings, settings, updateSettings, t, upperFirst }

  const timeFormatProps = getSettingsProps(TIME_FORMAT, constants)
  const themeProps = getSettingsProps(THEME, constants)
  const sendEnterProps = getSettingsProps(SEND_ENTER, constants)
  const embedImagesProps = getSettingsProps(EMBED_IMAGES, constants)
  const embedYoutubeProps = getSettingsProps(EMBED_YOUTUBE, constants)
  const smileysProps = getSettingsProps(REPLACE_SMILEYS, constants)
  const languageProps = getSettingsProps(LANGUAGE, constants)

  const [preferencesHeight, setPreferencesHeight] = React.useState(0)

  const footerRef = React.useRef(null)
  React.useEffect(() => {
    setPreferencesHeight(bodyHeight - footerRef.current.clientHeight)
  })
  // TODO: create input text for userName
  return (
    <SettingsContext.Consumer>
      {({ settings, updateSettings, resetSettings }) => (
        <section className='flex flex-column align-items-center'>
          <div style={{ height: preferencesHeight }} className='overflow-y-auto settings'>
            <div className='flex flex-column'>
              <label>{upperFirst(t('userName'))}</label>
              <input type='text' value={settings[USER_NAME]} onChange={(event) => updateSettings[USER_NAME](event.currentTarget.value)} />
            </div>
            <RadioSetting {...timeFormatProps} />
            <RadioSetting {...themeProps} />
            <RadioSetting {...sendEnterProps} />
            <RadioSetting {...smileysProps} />
            <RadioSetting {...embedYoutubeProps} />
            <RadioSetting {...embedImagesProps} />
            <SelectSetting {...languageProps} />
          </div>
          <footer ref={footerRef} className='sticky sticky-bottom centered'>
            <Button color='danger' onClick={resetSettings}>{upperFirst(t('reset'))}</Button>
          </footer>
        </section>
      )}
    </SettingsContext.Consumer>
  )
}

export default Settings
