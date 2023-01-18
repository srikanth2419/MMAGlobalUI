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
//region vigneshwaran
    public static readonly citymasterCols = [
        { field: 'cityname', header: 'City Name', align: 'left !important' },
        { field: 'statename', header: 'State', align: 'left !important' },     
        {field:'flag',header:'Status',align:'left !important'}
    ];
    public static readonly statemasterCols = [
        {field:'statename',header:'State Name',align:'left !important'},
        {field:'countryname',header:'Country Code',align:'left !important'},
        {field:'flag',header:'Flag',align:'left !important'}
    ];

    public static readonly newprojectcreationCols = [
        {field:'project_name',header:'Project Name',align:'left !important'},
        {field: 'duration_in_days',header:'Duration Days',align:'left !important'},
        {field:'budget',header:'Budget',align:'left !important'},
        {field:'project_start_date',header:'Project Start Date',align:'left !important'},
        {field:'created_date',header:'Created Date',align:'left !important'},
        {field:'flag',header:'Flag',align:'left !important'}
    ];
    
    //vigneshwaran-end
//region sampathkumar
    public static readonly menuMasterColumns = [
        {field:'rolename',header:'Role Name'},
        {field:'parentid',header:'ParentId',align:'right !important'},
        {field:'name',header:'Menu Name',align:'left !important'},
        {field:'url',header:'URL',align:'left !important'},
        {field:'icon',header:'Icon',align:'left !important'},
        {field:'priorities',header:'Priorities'},
        {field:'isactive',header:'IsActive'},
        
    ];

    public static readonly unionMasterColumns = [
        {field: 'unionname',header:'UnionName',align:'right !important'},
        {field:'registernumber',header:'RegisterNumber',align:'left !important'},
        {field:'flag',header:'Flag',align:'left !important'},
    ];
   
    //sampathkumar-end
    

//#region  priyadharshani
public static readonly ExpensescategoryMaster =[
    {field: 'name', header: 'Name', align: 'left !important'},
    {field: 'notes', header: 'Remarks', align: 'left !important'},
    { field: 'flag', header: 'Status'},
]
public static readonly CountryMasterColumns = [
    { field: 'countryname', header: 'CountryName', align: 'left !important'},
    { field: 'flag', header: 'Status', align: 'left !important'},
];
public static readonly RoleMasterColumns = [
    { field: 'rolename', header: 'RoleName', align: 'left !important'},
    { field: 'flag', header: 'Status', align: 'left !important'},
];

//#endregion

//#region  Ananth
public static readonly UserMaster=[
    {field:'username_emailid',header:'Username/Emailid',align:'left !important'},
    {field:'rolename',header:'RoleName',align:'left !important'},
    {field:'password',header:'Password',align:'left !important'},
    {field:'flag',header:'Flag',align:'left !important'}
]
public static readonly MainCategoryMaster = [
    { field: 'categoryname', header: 'Category Name', align: 'left !important'},
    { field: 'flag', header: 'Status'},    
]

public static readonly SubCategoryMaster = [
    { field: 'categoryname', header: 'CategoryName', align: 'left !important'},
    { field: 'flag', header: 'Status'},
]
//#endregion
}
