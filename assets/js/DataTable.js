class DataTable {
    constructor(columns=[], data=[]) {
        this.columns = columns;
        this.data = data;
    }

    createTable($dataTableContainer) {
        const $table = document.createElement('table');
        this.table = $table
        $dataTableContainer.appendChild(this.table)
        // console.log(this.table)
        this.createThead()
        this.createTbody()
        this.deleteTd()
    }

    createThead() {
        const $thead = document.createElement('thead');
        const $tr = document.createElement('tr');
        $thead.appendChild($tr)
        document.querySelector('table').appendChild($thead)
        this.columns.forEach((i) => {
            const $th = document.createElement('th');
            $th.innerHTML = i;
            $tr.appendChild($th);
        })
        let $thcheck = document.createElement('th');
        let $input = document.createElement('input');
        $input.type = 'checkbox';
        $tr.appendChild($thcheck);
        $thcheck.appendChild($input);
        console.log($thcheck);
    }
    createTbody() {
        const $tBody = document.createElement('tbody');
        document.querySelector('table').appendChild($tBody);
        this.data.forEach((i) => {
            const $tr = document.createElement('tr');
            for(let key in i) {
                const $td = document.createElement('td')
                    $tr.appendChild($td)
                    $tBody.appendChild($tr)
                    $td.innerHTML = i[key]
            }
            let $tdcheck = document.createElement('td');
            let $input = document.createElement('input');
            $input.type = 'checkbox';
            $tr.appendChild($tdcheck);
            $tdcheck.appendChild($input);
        })
    }

    deleteTd() {
        let inputArr = document.querySelectorAll('input')
        console.log(inputArr)
        inputArr.forEach((item) => {
            item.addEventListener("click", (e) => {
                let target = e.target.value
            })
        })

    }


}

export default DataTable