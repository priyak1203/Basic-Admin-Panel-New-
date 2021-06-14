var url = 'http://www.filltext.com/?rows=32&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D';


const tableBody = document.getElementById('table-body');
const searchInput = document.getElementById('search-box');
let userData = [];

const infoContent = document.getElementById('info-content');
const searchForm = document.getElementById('form');


// ==================== Fetch data using Api and Create Table Rows ============================// 
fetch(url).then(resp => resp.json())
            .then(data => {
                userData = data; 
                data.map(({id: userId, firstName, lastName, email, phone, address}, index) => {
                    const columnTds = `
                    <td class="column1">${userId}</td>
                    <td class="column2">${firstName}</td>
                    <td class="column3">${lastName}</td>
                    <td class="column4">${email}</td>
                    <td class="column5">${phone}</td>
                    `
                    let tableRow = document.createElement('tr');
                    tableRow.classList.add("data-row")
                    tableRow.innerHTML = columnTds;
                    tableBody.appendChild(tableRow);
                    
                    // ======== Highlighting the row on click ============= // 
                    tableRow.onclick = function() {
                        $('.data-row').removeClass('active');
                        tableRow.classList.add('active');
                        
                        const infoDivs = infoContent.getElementsByTagName('div');
                        infoDivs[0].innerHTML = `<b>User selected:</b> ${firstName} ${lastName}`;
                        infoDivs[2].innerHTML = `<b>Address:</b> ${address.streetAddress}`;
                        infoDivs[3].innerHTML = `<b>City:</b> ${address.city}`;
                        infoDivs[4].innerHTML = `<b>State:</b> ${address.state}`;
                        infoDivs[5].innerHTML = `<b>Zip:</b> ${address.zip}`;
                        infoContent.style.display = "block";
                        
                    }
                })
            })



// ================= Implementing Search Function ============================= // 
searchInput.onkeyup = function() {
    const inputValue = searchInput.value.toUpperCase();
    let tableRows = document.getElementsByTagName('tr');
    
    for(let i=1; i<tableRows.length; i++) {
        const tdFirst = tableRows[i].getElementsByTagName('td')[1];
        const tdSecond = tableRows[i].getElementsByTagName('td')[2];
        

        if(tdFirst || tdSecond) {
            infoContent.style.display = "none";
            const textFirst = tdFirst.innerText;
            const textSecond = tdSecond.innerText;
    
            tableRows[i].style.display = (textFirst.toUpperCase().includes(inputValue) || textSecond.toUpperCase().includes(inputValue)) ? '' : 'none';
        }

    }
}


// ================ Preventing Default Behaviour of the Form Element ==================== //
searchForm.onsubmit = function(e) {
    e.preventDefault();
}