const fetch = require('node-fetch');

function getData(foodName) {
    const params = {
        api_key: 'gpyve241cpK2G9ATVhApZKwygxMdsHkfgP1hK2Bt',
        query: foodName,
        dataType: ["Survey (FNDDS)"],
        pagesize: 1
    }

    const api_url = `https://api.nal.usda.gov/fdc/v1/foods/list?api_key=${encodeURIComponent(params.api_key)}&query=${encodeURIComponent(params.query)}&dataType=${encodeURIComponent(params.dataType)}`

    return fetch(api_url).then(response => response.json())
}

function getNutrients(foodName) {
    const dict = {};
const allNutrients = getData(foodName).then(data => {
    //console.log(data);
    for (let i = 0;i< data.length;i++) {
        for (let j=0; j<data[i].foodNutrients.length;j++) {
            //console.log(data[i].foodNutrients[j].name + " " + data[i].foodNutrients[j].amount)
            if (dict[data[i].foodNutrients[j].name] == undefined) {
                dict[data[i].foodNutrients[j].name] = data[i].foodNutrients[j].amount;
            } else {
                dict[data[i].foodNutrients[j].name] += data[i].foodNutrients[j].amount;
            }
        }
    }
    console.log(dict);
    return dict;
    // console.log(data[0].foodNutrients[0]);
});
    return allNutrients;
}
