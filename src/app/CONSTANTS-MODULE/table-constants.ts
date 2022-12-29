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
    public static readonly CountryMasterColumns = [
        { field: 'countryname', header: 'CountryName', align: 'left !important'},
        { field: 'flag', header: 'Status', align: 'left !important'},
    ];
    public static readonly RoleMasterColumns = [
        { field: 'rolename', header: 'RoleName', align: 'left !important'},
        { field: 'flag', header: 'Status', align: 'left !important'},
    ]

    public static readonly MainCategoryMaster = [
        { field: 'categoryname', header: 'Category Name', align: 'left !important'},
        { field: 'flag', header: 'Status'},    
    ]

    public static readonly SubCategoryMaster = [
        { field: 'categoryname', header: 'CategoryName', align: 'left !important'},
        { field: 'flag', header: 'Status'},
    ]
    public static readonly ExpensescategoryMaster =[
        {field: 'name', header: 'Name', align: 'left !important'},
        {field: 'notes', header: 'Notes', align: 'left !important'},
        { field: 'flag', header: 'Status'},
    ]



}