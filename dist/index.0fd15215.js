const spinner = document.getElementById("spinner");
fetch("https://nrg.radio/wp-json/wp/v2/posts").then(function(response) {
    // The API call was successful!
    if (response.ok) return response.json();
    else return Promise.reject(response);
}).then(function(data) {
    var blogNumber = data.length;
    if (blogNumber > 6) {
        spinner.remove();
        for(let i = 0; i < 6; i++){
            cardCreation = '<div class="sm:col-span-6 md:col-span-4  p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">';
            cardCreation += '<h5  class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">' + data[i].title.rendered + "</h5>";
            cardCreation += '<div class="mb-3 font-normal text-black dark:text-white">' + data[i].excerpt.rendered + "</div>";
            cardCreation += '<a href="#" class="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Read More <svg aria-hidden="true" class="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg></a>';
            cardCreation += "</div>";
            document.querySelector("#wrapper").insertAdjacentHTML("beforeend", cardCreation);
        }
    }
}).catch(function(err) {
    // There was an error
    spinner.remove();
    errorMsg = '<div class="alert alert-danger" role="alert">';
    errorMsg += "Sorry, we can't retrieve posts at the moment. Please visit www.ourblog.com";
    errorMsg += "</div>";
    console.warn("Something went wrong.", err);
});

//# sourceMappingURL=index.0fd15215.js.map
