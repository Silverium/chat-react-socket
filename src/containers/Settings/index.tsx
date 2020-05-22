import React from 'react'
import { useTranslation } from 'react-i18next'
import upperFirst from 'lodash-es/upperFirst'

import { settings } from '../../constants'
import SelectSetting from '../../components/SelectSetting'
const { LANGUAGE } = settings

const Settings: React.FunctionComponent<{}> = () => {
  const { t, i18n } = useTranslation()

  const selectLanguageProps = {
    storageKey: LANGUAGE,
    label: upperFirst(t('language')),
    onChange: (code: string) => i18n.changeLanguage(code),
    options: ['en', 'es'].map(value => ({
      value,
      text: upperFirst(t(value))
    }))
  }

  return (
    <div className='settings'>
      <SelectSetting {...selectLanguageProps} />
    </div>
  )
}

export default Settings
