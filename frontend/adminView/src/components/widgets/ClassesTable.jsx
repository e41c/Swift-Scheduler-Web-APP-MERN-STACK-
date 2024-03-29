import React from 'react'
import DataTable from './DataTable'
let data = [
    {
        "_id": "65f967cf1ae95386c7fb3af7",
        "firstName": "Chris2",
        "lastName": "Tri2",
        "email": "test21232@example.com",
        "password": "$2a$10$ck00k2WXVODIKebuPAVd4.3LxiY/iqS1k9deEb0zOFPtNP3EzH52O",
        "__v": 0
    },
    {
        "_id": "65f967f11ae95386c7fb3afc",
        "firstName": "Chris2",
        "lastName": "Tri2",
        "email": "test2132@example.com",
        "password": "$2a$10$cIL.q537qCGilypEezV68u805P23ARNBLGei.hYUlt6jv96AI8ZnG",
        "__v": 0
    },
    {
        "_id": "65f967f61ae95386c7fb3aff",
        "firstName": "Chris2",
        "lastName": "Tri2",
        "email": "test212@example.com",
        "password": "$2a$10$kwiUwUwxnHqllgRzCUo29ehas/DrFR667zs5Y9WmeCjgRTsKXn16W",
        "__v": 0
    },
    {
        "_id": "65f967fb1ae95386c7fb3b02",
        "firstName": "Chris2",
        "lastName": "Tri2",
        "email": "test21@example.com",
        "password": "$2a$10$s7aHQ.Oboz/KYLpD2SHJZORLc2g.caS9JB3/KjgaZBnjJhI1iO4Jq",
        "__v": 0
    }
]

const ClassesTable = () => {
  return (
    <div>
      <DataTable data={data}/>
    </div>
  )
}

export default ClassesTable
