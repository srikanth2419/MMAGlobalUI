export class TableConstants {
    

    public static readonly ShootingScheduleColumns = [
        { field: 'first_name', header: 'Name', align: 'left !important'},
        { field: 'rolename', header: 'Role', align: 'left !important'},
        { field: 'categoryname', header: 'Main Category', align: 'left !important'},
        { field: 'subcategory_id', header: 'Sub Category', align: 'left !important'},
        { field: 'phonenumber', header: 'Phone Number', align: 'right !important'},
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
        //{field:'production_house_name',header:'Production House Name',align:'left !important'},
        {field:'created_date',header:'Created Date',align:'left !important'},
        {field:'flag',header:'Flag',align:'left !important'}
    ];

    public static readonly FundColumns = [
        { field: 'personName', header: 'Person Name', align: 'left !important'},
        { field: 'paymentBy', header: 'Payment By', align: 'left !important'},
        { field: 'amount', header: 'Amount', align: 'right !important'},
        { field: 'dayCall', header: 'Day or Call', align: 'right !important'},
        { field: 'totalAmount', header: 'Total Amount', align: 'right !important'},
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

    public static readonly locationInfoColumns = [
        { field: 'location_name', header: 'Location Name', align: 'right !important' },
        { field: 'first_name', header: 'Location Manager', align: 'right !important' },
        { field: 'first_name', header: 'Location EP', align: 'right !important' },
        { field: 'countryname', header: 'Country', align: 'right !important' },
        { field: 'statename', header: 'State', align: 'right !important' },
        { field: 'cityname', header: 'City', align: 'right !important' },
        { field: 'address1', header: 'Address 1', align: 'right !important' },
        { field: 'address2', header: 'Address 2', align: 'right !important' },
        { field: 'phonenumber', header: 'Mobile Number', align: 'right !important' },
        { field: 'pincode', header: 'Pincode', align: 'right !important' },
        { field: 'parking_note', header: 'Parking Note', align: 'right !important' },
        { field: 'parking_facility', header: 'Parking Facility', align: 'right !important' },
        { field: 'flag', header: 'Flag', align: 'right !important' },
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
public static readonly RegistrationColumns =[
      {field: 'production_house_name', header: 'ProductionHouseName', align: 'left !important'},
      { field: 'first_name', header: 'FirstName', align: 'left !important'},
      { field: 'last_name', header: 'LastName', align: 'left !important'},
      { field: 'dob', header: 'Date', align: 'left !important'},
      { field: 'mobile_number', header: 'Mobilenumber', align: 'left !important'},
      { field: 'email_id', header: 'Emailid', align: 'left !important'},
      { field: 'countryname', header: 'Country', align: 'left !important'},
      { field: 'statename', header: 'State', align: 'left !important'},
      { field: 'cityname', header: 'City', align: 'left !important'},
      { field: 'address1', header: 'Address1', align: 'left !important'},
      { field: 'address2', header: 'Address2', align: 'left !important'},
      { field: 'pincode', header: 'Pincode', align: 'left !important'},
      { field: 'flag', header: 'Status', align: 'left !important'},
];
public static readonly DailyexpensesColumns =[
      { field: 'project_name', header: 'ProjectName', align: 'right !important' },
      { field: 'budget_amount', header: 'Budget Amount', align: 'left !important' },
      { field: 'date', header: 'Date', align: 'left !important' },
      { field: 'invoice_number', header: 'Invoice No', align: 'left !important' },
      { field: 'name', header: 'Expenses category', align: 'left !important' },
      { field: 'amount', header: 'Amount', align: 'left !important' },
];
public static readonly lodginginfoColumns =[
    { field: 'location', header: 'Location', align: 'right !important' },
      { field: 'address', header: 'Address', align: 'left !important' },
      { field: 'note', header: 'Note', align: 'left !important' },
];
public static readonly transportinfoColumns =[
    { field: 'driver_name', header: 'DriverName', align: 'right !important' },
     { field: 'pickup_time', header: 'PickupTime', align: 'left !important' },
     { field: 'pickup_location', header: 'PickupLocation', align: 'left !important' },
      { field: 'drop_location', header: 'DropLocation', align: 'left !important' },
      { field: 'passenger_id', header: 'PassengerName', align: 'left !important' },
    ]
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
public static readonly ContactslistColumns=[
    {field:'first_name',header:'firstName',align:'left !important'},
    {field:'last_name',header:'lastName',align:'left !important'},
    {field:'rolename',header:'RoleName',align:'left !important'},
    {field:'categoryname',header:'Maincategory',align:'left !important'},
    {field:'subcategory_id',header:'Subcategory',align:'left !important'},
    {field:'dob',header:'DOB',align:'left !important'},
    {field:'phonenumber',header:'phonenumber',align:'left !important'},
    {field:'whatsappnumber',header:'whatsappnumber',align:'left !important'},
    {field:'email_id',header:'email_id',align:'left !important'},
    {field:'countryname',header:'country',align:'left !important'},
    {field:'statename',header:'state',align:'left !important'},
    {field:'cityname',header:'city',align:'left !important'},
    {field:'address1',header:'address1',align:'left !important'},
    {field:'address2',header:'address2',align:'left !important'},
    {field:'pincode',header:'pincode',align:'left !important'},
    {field:'isunion',header:'isunion',align:'left !important'}, 
    {field:'unionname',header:'UnionName',align:'left !important'}, 
    {field:'flagstatus',header:'Flag',align:'left !important'}
]
//#endregion
}
