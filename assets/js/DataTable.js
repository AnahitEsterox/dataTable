class DataTable {
    constructor(columns= [], data= [])
    {
        this.columns = columns;
        this.data = data;
        this.table = document.createElement('table');
        this.thead = document.createElement('thead');
        this.tbody = document.createElement('tbody');
        this.perPageLimit = 10;
        this.start = '';
        this.end = '';
    }

    createTable($dataTableContainer) {
        $dataTableContainer.appendChild(this.table)
        this.createThead();
        this.createTbody();
        this.renderData();
        this.pagination();
        // this.displayList()
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
        const $thCheck = document.createElement('th');
        const $thInput = document.createElement('input');
        $thInput.type = 'checkbox';
        $thInput.setAttribute('class', 'th-input')
        $tr.appendChild($thCheck);
        $thCheck.appendChild($thInput);
        const $thDelete = document.createElement('th');
        const $deleteIcon = document.createElement('i');
        $deleteIcon.classList.add('fa', 'fa-trash-o');
        $thDelete.appendChild($deleteIcon);
        $tr.appendChild($thDelete);
        $thDelete.classList.add('th-delete');

    }
    createTbody() {
        document.querySelector('table').appendChild(this.tbody)
    }

    renderData() {
        this.displayList(0, this.perPageLimit)
    }

    pagination() {
        const $pageWrapper = document.createElement('div')
        $pageWrapper.setAttribute('class', 'page-wrapper');
        const $itemsCountInput = document.createElement('input');
        const $pageBox = document.createElement('div');
        document.querySelector('.data-table-container').appendChild($pageBox);
        $pageBox.classList.add('page-box');

        $itemsCountInput.type = 'text';
        $pageWrapper.appendChild($itemsCountInput);
        document.querySelector('.data-table-container').appendChild($pageWrapper);
        $itemsCountInput.addEventListener('change', (e) => {
            this.perPageLimit = parseInt($itemsCountInput.value);
            document.querySelector('tbody').replaceChildren();
            let itemsCount = parseInt(e.target.value) + 1;
            const pagesCount = Math.ceil(this.data.length / itemsCount);
            for(let page = 1; page <= pagesCount; page++) {
                const $pagebtn = document.createElement('button');
                $pagebtn.classList.add('page-btn')
                $pagebtn.innerHTML = page;
                $pageBox.appendChild($pagebtn);
                if(page === 1) {
                    $pagebtn.classList.add('active-page')
                    this.start = 0;
                    this.end = this.perPageLimit;
                    document.querySelector('tbody').replaceChildren();

                    this.displayList(this.start, this.end);
                    this.handleDelete();
                }
            }

            document.querySelectorAll('.page-btn').forEach((btn) => {
                btn.addEventListener('click', () => {
                    if(document.querySelector('.active-page')){
                        document.querySelector('.active-page').classList.remove('active-page')
                    }
                    btn.classList.add('active-page');
                    this.start = this.perPageLimit * parseInt(btn.innerHTML - 1);
                    this.end = this.perPageLimit + this.start;
                    document.querySelector('tbody').replaceChildren();
                    this.displayList(this.start, this.end);
                    this.handleDelete();
                })
            })

            for(let page = 1; page <= pagesCount; page++) {
                const startIndex = (page - 1) * itemsCount;
                this.start = startIndex;
                const endIndex = startIndex + itemsCount - 1;
                this.end = endIndex;
                this.displayList(startIndex, endIndex)
                this.handleDelete();
                this.perPageLimit = parseInt($itemsCountInput.value);
            }
            e.target.value = ' ';
        })
        this.handleDelete();
    }

    // pagination() {
    //     const $pageWrapper = document.createElement('div')
    //     $pageWrapper.setAttribute('class', 'page-wrapper');
    //     const $itemsCountInput = document.createElement('input');
    //     const $pageBox = document.createElement('div');
    //     document.querySelector('.data-table-container').appendChild($pageBox);
    //     $pageBox.classList.add('page-box');
    //
    //     $itemsCountInput.type = 'text';
    //     $pageWrapper.appendChild($itemsCountInput);
    //     document.querySelector('.data-table-container').appendChild($pageWrapper);
    //     $itemsCountInput.addEventListener('change', (e) => {
    //         const trs = document.querySelectorAll('.tbody-tr')
    //         trs.forEach((tr) =>  {
    //             tr.remove();
    //         })
    //         let itemsCount = parseInt(e.target.value) + 1;
    //         const pagesCount = Math.ceil(this.data.length / itemsCount);
    //         for(let page = 1; page <= pagesCount; page++) {
    //             const $page = document.createElement('div');
    //             $pageBox.appendChild($page);
    //             $page.innerHTML = page;
    //         }
    //         for(let page = 1; page <= pagesCount; page++) {
    //             const startIndex = (page - 1) * itemsCount;
    //             this.start = startIndex;
    //             const endIndex = startIndex + itemsCount - 1;
    //             this.end = endIndex;
    //             this.displayList(startIndex, endIndex)
    //             this.handleDelete();
    //             this.perPageLimit.innerHTML = " ";
    //         }
    //
    //         e.target.value = ' ';
    //     })
    //     this.handleDelete();
    // }

    handleDelete() {
        const trs = document.querySelectorAll('.tbody-tr');
        document.querySelector('.th-input').addEventListener('click', (e) => {
            trs.forEach((tr) => {
                let input = tr.querySelector('.td-input');
                if(document.querySelector('.th-input').checked){
                    input.checked = true;
                    document.querySelector('.th-delete').addEventListener('click', (e) => {
                        this.tbody.innerHTML = null;
                    })
                } else {
                    input.checked = false;
                }
            })
        })
        document.querySelectorAll('.td-input').forEach((input) => {
            input.addEventListener('click', (e) => {
                if(input.checked) {
                    const checkedTr = input.closest('tr')
                    checkedTr.querySelector('.td-delete').addEventListener('click', (e) => {
                        checkedTr.remove()
                    })
                }
            })
        })
        document.querySelector('.th-delete').addEventListener('click', (e) => {
            trs.forEach((tr) => {
                if(tr.querySelector('.td-input').checked) {
                    tr.remove()
                }
            })
        })
    }
    displayList(startCount, endCount) {
        const eachPageItems = this.data.slice(startCount, endCount);
        eachPageItems.forEach((item) => {
            const $tr = document.createElement('tr');
            $tr.setAttribute('class', 'tbody-tr')
            for(let key in item) {
                const $td = document.createElement('td')
                $tr.appendChild($td)
                this.tbody.appendChild($tr)
                $td.innerHTML = item[key]
            }
            let $tdcheck = document.createElement('td');
            let $input = document.createElement('input');
            $input.setAttribute('class','td-input')
            $input.type = 'checkbox';
            $tr.appendChild($tdcheck);
            $tdcheck.appendChild($input);
            if($input.checked) {
                $input.closest($tr).setAttribute('class', 'checked');
            }
            const $tdDelete = document.createElement('td');
            const $deleteIcon = document.createElement('i');
            $deleteIcon.classList.add('fa', 'fa-trash-o');
            $tdDelete.setAttribute('class', 'td-delete');
            $deleteIcon.dataset.currentRowId = item.id;
            $tdDelete.appendChild($deleteIcon);
            $tr.appendChild($tdDelete);
        })
    }
}

export default DataTable