import React from 'react'
import { Card, CardBody } from '@windmill/react-ui'

function InfoCard({ title,subtitle, value, children: icon }) {
  return (
    <Card className="">
      <CardBody className="flex items-center">
       
        <div className='mr-15 flex-auto'>
          <p className="mb-0 text-lg font-medium text-gray-600 dark:text-gray-400">{title}</p>
          <p className="text-xl	 font-medium text-gray-700 dark:text-gray-200">{value}</p>
          <p className="mb-2 text-xs font-medium text-gray-600 dark:text-gray-400">{subtitle}</p>
        </div>
       {icon}
      </CardBody>
    </Card>
  )
}

export default InfoCard
