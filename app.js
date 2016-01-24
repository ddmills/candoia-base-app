var packageDataElement = document.getElementById('package-data');
var instanceDataElement = document.getElementById('instance-data');
var queryDataElement = document.getElementById('query-data');
var queryResultsDataElement = document.getElementById('query-result-data');

function stringify(data) {
    return JSON.stringify(data, null, 2);
}

/*
 * Use api.meta to get your package data
 */
var manifest = api.meta.get();
packageDataElement.innerHTML = stringify(manifest);
console.log("manifest = ", manifest);

/*
 * Use api.store to save and retrieve data between different sessions of using the app
 */
api.store.put('pets', 26); // stores { pets : 16 }
var pets = api.store.get('pets'); // retrieves "pets"
console.log("Value of 'pets' = ", pets);

/*
 * Use api.instance to get current instance information (like what repository your app is being run on)
 */
var instance = api.instance.get();
instanceDataElement.innerHTML = stringify(instance);
console.log("This app lives at: " + instance.app.path);

/*
 * Use api.boa to run boa queries
 */
var query =
    "p: Project = input;\n" +
    "counts: output top(10) of string weight int;\n" +
    "foreach (i: int; def(p.programming_languages[i]))\n" +
    "	counts << p.programming_languages[i] weight 1;";
queryDataElement.innerHTML = query;
var results = api.boa.exec(query);
queryResultsDataElement.innerHTML = stringify(results);
console.log(results);
