marked.setOptions({
    gfm: true,        // Enable GitHub Flavored Markdown (GFM)
    breaks: true,     // Convert line breaks to <br>
  });
  
const reset = document.getElementById(`reset`);
const inputTextArea = document.getElementById('input');
const parsedTextArea = document.getElementById('parsed');

inputTextArea.addEventListener('input',()=>{
    htmlFormat = marked.parse(inputTextArea.value);       //it will convert ol text data in html format    
    parsedTextArea.innerHTML = htmlFormat;
});

reset.addEventListener('click', () => {
  inputTextArea.value = "";
  parsedTextArea.innerHTML = inputTextArea.value
})