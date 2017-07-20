export class User {
    constructor(public email: string, public uid: string, public nickname: string, public id: string, public emailNotifications?: boolean, public securityQuestion?: string,
        public securityQuestionAnswer?: string, public receiveNewsletters?: boolean, public loginAlerts?: boolean, blockedUsers?: string[],
        public privacy?: string, public receiveFriendRequests?: boolean) {}
}
