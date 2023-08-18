export interface EmailReports {
    daily?: Array<userProfile>
    weekly?: Array<userProfile>
    other?: Array<userProfile>
}
export interface userProfile {
    id?: number
    validStatus?: string
    emailDuplicate?: Boolean
    email: string,
    username?: string
}
