const inputText = document.getElementById(`searchInput`);
const searchButton = document.getElementById(`searchButton`);
const sortAlphabeticallybutton = document.getElementById(`sortAlphabet`);
const sortByDateButton = document.getElementById(`sortByDate`);
// const gridRadioButton = document.getElementById(`selectGrid`);
// const listRadioButton = document.getElementById(`selectList`);
const bookContainer = document.getElementById(`booksContainer`)
const prevButton = document.getElementById(`prev`);(`prev`);
const pageNumber = document.getElementById('page')
const nextButton = document.getElementById(`next`);
let page = 1;
let nextPageFlag, previousPageFlag;                 //this flag variable are use to know next page or prvious page are available or not
let bookList = [];                                    //it is used to store book data
bookContainer.className = "grid-view"   //selecting by default grid view
async function fetchBooks(page)        //this fuction fetch data 
{
    const url = `https://api.freeapi.app/api/v1/public/books?page=${page}`;
    const options = {method: 'GET', headers: {accept: 'application/json'}};
    
    try {
      const response = await fetch(url, options);
      const LibraryData = await response.json();
      console.log(LibraryData);
      bookList = LibraryData.data.data
      console.log(bookList);
      displayBook(bookList)
      nextPageFlag = LibraryData.data.nextPage;                //next page is available or not
      previousPageFlag = LibraryData.data.previousPage;        //previous page is available or not
      pageNumber.textContent = page;
      console.log("In fetch page is = ",page);
      
    } catch (error) {
      console.error(error);
    }
}

function displayBook(bookListArray){                    //this fuction use to display book
    bookContainer.innerHTML = "";
    bookListArray.forEach(element => {
        const {title, authors, publisher, publishedDate, imageLinks, infoLink} = element.volumeInfo;   //get all require value for each book
        const thumbnail = imageLinks?.thumbnail || `./assets/book-placeholder-resized.png`;        
        const book = document.createElement(`div`)                                                     //creating new div element for each book
        book.className = "book";
        book.innerHTML = `
        <img src =  "${thumbnail}" title = "${title}">
         <div>
                <h4>${title}</h4>
                <p><span>Written by: </span>${authors ? authors.join(", ") : "Not available"}</p>
                <p><span>Publisher: </span>${publisher || "Not available"}</p>
                <p><span>Publish Date: </span>${publishedDate || "Not available"}</p>
                <a href = "${infoLink}" target = "_blank">More Info</a>
         </div>
        `;
        bookContainer.appendChild(book);
    });
}
searchButton.addEventListener('click',() => {    //this is invoked when click on search button
    let newBookList = [];
    search = inputText.value.trim().toLowerCase();    
    newBookList = bookList.filter(book => {
       return (book.volumeInfo.title.toLowerCase().includes(search) || book.volumeInfo.authors.join(" ").toLowerCase().includes(search))
    })
    displayBook(newBookList)
})
sortAlphabeticallybutton.addEventListener('click', () => {                                                      //this is use for alphabetically sorting
    const newSortedBookList = bookList.toSorted((a,b) => a.volumeInfo.title.localeCompare(b.volumeInfo.title));
    displayBook(newSortedBookList)
})
sortByDateButton.addEventListener('click', () => {                      //this is use for  sorting by date
    const newSortedBookList = bookList.toSorted((a,b) => new Date(a.volumeInfo.publishedDate) - new Date(b.volumeInfo.publishedDate));
    displayBook(newSortedBookList)
})
const radioButtons = document.querySelectorAll('input[name="view"]');        //it is use for selecting which radio button is selected
radioButtons.forEach(button => {
    button.addEventListener('change',(e) => {
        console.log(e.target.value);
        bookContainer.className =  e.target.value                            //it will change grid view or list view
    })
})

//this is code for pagination
prevButton.addEventListener('click', () => {                                //it invoked when click on prev button
    if(previousPageFlag)
    {
        page--
        fetchBooks(page)
    }
})
nextButton.addEventListener('click', () => {                                //it is invoked when click on next button
    if(nextPageFlag){
        page++;
        fetchBooks(page)
    }
})
fetchBooks(page)
