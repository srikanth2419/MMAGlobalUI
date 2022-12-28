export class ResponseMessage {
    //severity
    public static readonly SuccessSeverity = 'success';
    public static readonly ErrorSeverity = 'error';
    public static readonly WarnSeverity = 'warn';
    public static readonly InfoSeverity = 'info';

    //summary
    public static readonly Alert = 'Alert !';
    public static readonly Warn = 'Warning !';
    private static readonly Error = 'Error !';

    public static readonly SuccessMessage = 'Saved successfully !';
    public static readonly ErrorMessage = 'Error occurred, Please try again !';
    public static readonly WarningMessage = 'Warning Message !';
}
