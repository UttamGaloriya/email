export interface EmailReports {
    daily?: Array<userProfile>
    weekly?: Array<userProfile>
    other?: Array<userProfile>
}
export interface userProfile {
    id?: number
    email: string,
    username?: string
}
