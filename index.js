const apiURL = 'https://api.github.com/search/repositories?q=language:javascript&sort=stars&order=desc&per_page=100'
let repositoryInfo = []

let startPosition = 0;
let endPosition = 20;
let numberPerPage = 20;

async function getData() {
    const response = await fetch(apiURL)
    const data = await response.json();

    data.items.map(
        item => {
            repositoryInfo.push({
                    full_name: item.full_name,
                    description: item.description,
                    open_issues_count: item.open_issues_count,
                    stargazers_count: item.stargazers_count,
                    forks_count: item.forks_count,
                })
            }
    )
    addPages()
    showPage(0)
}

const addPages = () => {
    let pages = repositoryInfo.length / numberPerPage;

    for(let i = 0; i < pages; i++){
        document.querySelector('.pagination').innerHTML += `
            <li class="page-item">
                <a class="page-link" onclick="showPage(${i})" href="#">${1 + i}</a>
            </li>
        `
    }
}

const showPage = (currentPage) => {
    document.getElementById('tableData').innerHTML = ''

    startPosition = currentPage * numberPerPage
    endPosition = startPosition + numberPerPage
    
    let currentShowing = repositoryInfo.filter( 
        (repository, i) => 
            i >= startPosition && i < endPosition
    )
        
    currentShowing.forEach((repository) => {
        document.getElementById('tableData').innerHTML += `
                <tr>
                    <td>${repository.full_name}</td>
                    <td>${repository.description}</td>
                    <td>${repository.stargazers_count}</td>
                    <td>${repository.open_issues_count}</td>
                    <td>${repository.forks_count}</td>
                </tr>`

    })
}

    
 getData()
 


