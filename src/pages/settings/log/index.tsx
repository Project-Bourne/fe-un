import SettingsLayout from '@/layout/SettingsLayout'
import { ActivityCard } from '@/pages/collaborators/components/ActivityCard';
import { LogData } from '@/utils/constants';
import React from 'react'

const LogSettings = () => {
  return (
    <SettingsLayout>
      <div className='w-full h-full overflow-y-scroll'>
        {
          LogData.map((item, index) => (
            <ActivityCard
               time={item.time}
               actionText={item.action}
               activityText={'Redesigned Naira: CBN launches Cash Swap Programme for rural '}
               docId={item.id}
             />
          ))
        }
      </div>
    </SettingsLayout>
  )
}

export default LogSettings;