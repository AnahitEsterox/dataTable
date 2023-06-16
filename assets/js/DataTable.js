class DataTable {
    constructor(columns=[], data=[]) {
        this.columns = columns;
        this.data = data;
        this.table = document.createElement('table');
        this.thead = document.createElement('thead');
        this.tbody = document.createElement('tbody');
        this.checkedArr = [];
    }

    createTable($dataTableContainer) {
        $dataTableContainer.appendChild(this.table)
        this.createThead()
        this.createTbody()
        this.checkingData()
        this.deleteTd()
    }

    createThead() {
        document.querySelector('table').appendChild(this.thead)
        const $tr = document.createElement('tr')
        this.thead.appendChild($tr)
        this.columns.forEach((i) => {
            const $th = document.createElement('th')
            $th.innerHTML = i;
            $tr.appendChild($th);
        })
        const $thCheck = document.createElement('th')
        const $thInput = document.createElement('input')
        $thInput.type = 'checkbox';
        $tr.appendChild($thCheck);
        $thCheck.appendChild($thInput);
    }
    createTbody() {
        document.querySelector('table').appendChild(this.tbody);
        this.data.forEach((i) => {
            const $tr = document.createElement('tr');
            for(let key in i) {
                const $td = document.createElement('td')
                    $tr.appendChild($td)
                    this.tbody.appendChild($tr)
                    $td.innerHTML = i[key]
            }
            let $tdcheck = document.createElement('td');
            let $input = document.createElement('input');
            $input.type = 'checkbox';
            $tr.appendChild($tdcheck);
            $tdcheck.appendChild($input);
        })
    }

    checkingData() {
        let inputArr = document.querySelectorAll('input');
        inputArr.forEach((item) => {
            item.addEventListener("click", (e) => {
                let target = e.target;
                let $checkedTr = target.closest("tr");
                if($checkedTr.closest('thead')) {
                    const allInputsArr = this.tbody.querySelectorAll('input')
                    allInputsArr.forEach((item) => {
                        item.checked = target.checked;
                    })
                }
                if(target.checked) {
                    this.checkedArr.push($checkedTr)
                    console.log('$checkedTr: ', $checkedTr)
                    console.log('checkedArr: ', this.checkedArr.$checkedTr)

                    $checkedTr.classList.add('checked')
                } else {
                    $checkedTr.classList.remove('checked')
                }
            })
        })
    }

    deleteTd() {



    }


}

export default DataTable