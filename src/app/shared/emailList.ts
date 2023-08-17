export const emailList = ['uttam@gmail.com', 'raj@gmail.com', 'user1@gmail.com', 'meet@gmail.com']
export const reportName: reportName[] = [
    {
        id: 1,
        name: 'daily'
    },
    {
        id: 2,
        name: 'weekly'
    },
    {
        id: 3,
        name: 'other'
    },
]

interface reportName {
    id: number,
    name: 'daily' | 'weekly' | 'other'
}