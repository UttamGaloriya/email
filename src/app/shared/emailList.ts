import { userProfile } from "./interface/email-reports"

// export const emailList = ['uttam@gmail.com', 'raj@gmail.com', 'user1@gmail.com', 'meet@gmail.com']
export const reportName: reportName[] = [
    { id: 1, name: 'daily' },
    { id: 2, name: 'weekly' },
    { id: 3, name: 'other' },
]

interface reportName {

    toggle?: boolean;
    id: number,
    name: 'daily' | 'weekly' | 'other'
}
export const emailList: userProfile[] = [
    { id: 0, email: 'uttam@gmail.com', username: 'uttam' },
    { id: 0, email: 'dttam@gmail.com', username: 'wttam' },
    { id: 0, email: 'tttam@gmail.com', username: 'dttam' },
    { id: 0, email: 'xttam@gmail.com', username: 'xttam' },
]