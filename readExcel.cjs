const xlsx = require('xlsx');
const workbook = xlsx.readFile('D:/joppy/Website Creation.xlsx');
const sheet_name_list = workbook.SheetNames;
sheet_name_list.forEach(function(y) {
    const worksheet = workbook.Sheets[y];
    const data = xlsx.utils.sheet_to_json(worksheet, { header: 1 });
    console.log("Sheet:", y);
    console.log(JSON.stringify(data, null, 2));
});
