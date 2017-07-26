export class User {
    constructor(public email: string, public uid: string, public nickname: string, public id: string, public emailNotifications?: boolean,
        public securityQuestionIndex?: number, public securityQuestionAnswer?: string, public receiveNewsletters?: boolean,
        public loginAlerts?: boolean, blockedUsers?: string[], public privacy?: string, public receiveFriendRequests?: boolean) {}
}
