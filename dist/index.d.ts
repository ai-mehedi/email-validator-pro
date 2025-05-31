type ValidateOptions = {
    email: string;
    fromEmail: string;
    smtpCheck?: boolean;
    debug?: boolean;
};
export declare function validateEmail({ email, fromEmail, smtpCheck, debug, }: ValidateOptions): Promise<{
    email: string;
    username: string;
    domain: string;
    formatValid: boolean;
    hasMX: boolean;
    isDisposable: boolean;
    isGeneric: boolean;
    isFree: boolean;
    provider: string;
    mxRecord: string | null;
    canReceiveEmail: {
        smtpSuccess: boolean;
        message: string;
        catchAll: boolean;
    };
    qualityScore: number;
}>;
export {};
