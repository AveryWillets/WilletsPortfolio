/**
 * 
 * @param {Array<string>} filters 
 */
async function main(filters){
    document.getElementById("container").innerHTML = "";
    const resposne = await fetch("projects.json");

    /**
     * @type {Array<*>}
     */
    const data = (await resposne.json()).projects;
     

    // Filter the array by checking if the word is in allowedWords
    const filteredArray = data.filter(item => 
        item.tag.some(tag => filters.includes(tag))
    );

    filteredArray.forEach(item => {
        document.getElementById("container").appendChild(createproject(item))
    })

}


function createproject(data){
    const title = document.createElement("h3");
    title.innerHTML = data.title;

    return title;
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("form").addEventListener("submit", (event) => submit(event))
});




/**
 * 
 * @param {SubmitEvent} event 
 */
function submit(event){
    event.preventDefault();

    const form = document.getElementById("form");

    const inputs = form.querySelectorAll("input");

    var filters = []

    inputs.forEach((item) => {
        if(item.checked) {
            filters.push(item.value)
        }
    })

    main(filters)
    
}