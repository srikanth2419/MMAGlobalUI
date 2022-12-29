export class TableConstants {
    public static readonly FundColumns = [
        { field: 'personName', header: 'Person Name', align: 'left !important'},
        { field: 'paymentBy', header: 'Payment By', align: 'left !important'},
        { field: 'amount', header: 'Amount', align: 'right !important'},
        { field: 'dayCall', header: 'Day or Call', align: 'right !important'},
        { field: 'totalAmount', header: 'Total Amount', align: 'right !important'},
    ];

    public static readonly ShootingScheduleColumns = [
        { field: 'name', header: 'Name', align: 'left !important'},
        { field: 'role', header: 'Role', align: 'left !important'},
        { field: 'mainCategory', header: 'Main Category', align: 'left !important'},
        { field: 'subCategory', header: 'Sub Category', align: 'left !important'},
        { field: 'phoneNo', header: 'Phone Number', align: 'right !important'},
    ];

    public static readonly ExpensesCategoryColumns = [
        { field: 'name', header: 'Name', align: 'left !important'},
        { field: 'notes', header: 'Notes', align: 'left !important'},
        { field: 'flag', header: 'Status', align: 'left !important'},
       
    ];
    public static readonly statemasterCols = [
        {field:'statename',header:'State Name',align:'left !important'},
        {field:'countrycode',header:'Country Code',align:'left !important'},
        {field:'flag',header:'Flag',align:'left !important'}


    ];
    public static readonly citymasterCols = [
        { field: 'cityname', header: 'City Name', align: 'left !important' },
        { field: 'statecode', header: 'State', align: 'left !important' },     
        {field:'flag',header:'Status',align:'left !important'}
     
    ]
}