class DataTable {
    constructor(columns=[], data=[], {
        perPageLimit = 5,
        rowClassName = '',
        tableClassName = '',
        thClassName = '',
        tdClassName = '',
        paginationBoxClassName = '',
        pageItemClassName = '',
        searchFieldClassName = '',
        labelClassName = '',
        checkAllClassName = '',
        pageContainerClassName = '',
        pageActiveClassName = '',
    })
    {
        this.columns = columns;
        this.data = data;
        this.table = document.createElement('table');
        this.thead = document.createElement('thead');
        this.tbody = document.createElement('tbody');
        this.checkedItems = [];
        this.perPageLimit = document.createElement('input');
        this.rowClassName = `data__row ${rowClassName}`;
        this.tableClassName = `datatable ${tableClassName}`;
        this.tdClassName = `td__item ${tdClassName}`;
    }

    createTable($dataTableContainer) {
        this.handlePagination()

        $dataTableContainer.appendChild(this.table)
        this.table.setAttribute('class', this.tableClassName);
        this.createThead()
        this.createTbody()
        // this.checkingData()
        this.handleDelete()

    }

    createThead() {
        document.querySelector('table').appendChild(this.thead)
        const $tr = document.createElement('tr')
        $tr.setAttribute('class', this.rowClassName);

        this.thead.appendChild($tr)
        this.columns.forEach((i) => {
            const $th = document.createElement('th')
            $th.innerHTML = i;
            $tr.appendChild($th);
        })
        const $thCheck = document.createElement('th');
        const $thInput = document.createElement('input');
        $thInput.type = 'checkbox';
        $tr.appendChild($thCheck);
        $thCheck.appendChild($thInput);
        const $thDelete = document.createElement('th');
        const $deleteIcon = document.createElement('i');
        $deleteIcon.classList.add('fa', 'fa-trash-o');
        $thDelete.appendChild($deleteIcon);
        $tr.appendChild($thDelete);

    }
    createTbody() {

        document.querySelector('table').appendChild(this.tbody);
        this.data.forEach((i) => {
            const $tr = document.createElement('tr');
            $tr.setAttribute('class', this.rowClassName);

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
            const $tdDelete = document.createElement('td');
            const $deleteIcon = document.createElement('i');
            $deleteIcon.classList.add('fa', 'fa-trash-o');
            $tdDelete.setAttribute('class', this.tdClassName);
            $deleteIcon.dataset.currentRowId = i.id;
            $tdDelete.appendChild($deleteIcon);
            $tr.appendChild($tdDelete);
        })
    }

    // checkingData() {
    //     let inputArr = document.querySelectorAll('input');
    //     inputArr.forEach((item) => {
    //         item.addEventListener("click", (e) => {
    //             let target = e.target;
    //             let $checkedTr = target.closest("tr");
    //             if($checkedTr.closest('thead')) {
    //                 this.checkedItems = [];
    //                 const allInputsArr = this.tbody.querySelectorAll('input');
    //                 allInputsArr.forEach((item) => {
    //                     item.checked = target.checked;
    //                     if (item.checked) {
    //                         this.checkedItems.push($checkedTr);
    //                     } else {
    //                         const index = this.checkedItems.indexOf($checkedTr);
    //                         if (index !== -1) {
    //                             this.checkedItems.splice(index, 1);
    //                         }
    //                     }
    //                 });
    //             } else if(target.checked) {
    //                 this.checkedItems.push($checkedTr);
    //             } else if(!target.checked && $checkedTr.closest("tbody")){
    //                 const index = this.checkedItems.indexOf($checkedTr);
    //                 if (index !== -1) {
    //                     this.checkedItems.splice(index, 1);
    //                 }
    //             }
    //         })
    //     })
    // }
    handleDelete() {
        const btnDeleteArr = document.querySelectorAll('.fa-trash-o')
        btnDeleteArr.forEach((i) => {
            i.addEventListener('click', (e) => {
                const clickedTr = e.target.closest('tr')
                const deletedTr = this.checkedItems.find((item) => item ===  clickedTr);
                const findToDelete = this.data.findIndex((obj) => obj.id == i.dataset.currentRowId)

                if (findToDelete !== -1 && deletedTr) {
                    this.data.splice(findToDelete, 1)
                    clickedTr.remove();
                    this.createTbody();
                } else if(clickedTr.closest('thead')) {
                    const allInputsArr = this.tbody.querySelectorAll('input');
                    allInputsArr.forEach((item) => {
                        if(item.checked) {
                            const deleteTrs =  item.closest('tr')
                            deleteTrs.remove();
                            this.createTbody();
                        }
                    });
                } else {
                    this.data.splice(findToDelete, this.checkedItems.length)
                    clickedTr.remove();
                    this.createTbody();
                }
            })
        })
    }

    handlePagination() {
        const $pageWrapper = document.createElement('div');
        const $label = document.createElement('label');
        $label.classList.add('pagination-label');
        $pageWrapper.classList.add('pagination-wrapper');
        $label.classList.add('pagination-label')
        $label.innerHTML = 'Per page count';
        $pageWrapper.appendChild($label);
        $pageWrapper.appendChild(this.perPageLimit);
        $pageWrapper.setAttribute('class', 'pagination-wrapper');
        this.perPageLimit.type = 'text';
        document.querySelector('.data-table-container ').appendChild($pageWrapper)

        this.perPageLimit.addEventListener('change', (e) => {

            this.displayList(this.perPageLimit.value)
            this.perPageLimit.value = " ";
        })
    }

    pageInputValidation() {
        const itemsCount = this.data.length;
        const countMassage = document.createElement('span');
        countMassage.innerHTML = `max: ${itemsCount}`;
        document.querySelector('.pagination-wrapper').appendChild(countMassage);
        const enteredValue = this.perPageLimit.value;
        const numbersOnly = /^\d+$/;
        if(!numbersOnly.test(enteredValue)) {
            alert('enter a valid number')
        }
    }

    displayList(count) {
        this.pageInputValidation()
        let pages;

        if(this.data.length == this.perPageLimit.value) {
            pages = this.data.length / this.perPageLimit.value;
            console.log('its ok: ', pages)

        } else if(this.data.length / this.perPageLimit.value !== 0 && this.perPageLimit.value < this.data.length) {
            pages = Math.floor(this.data.length / this.perPageLimit.value) + 1;
            console.log('more',pages)
        } else if(this.perPageLimit.value > this.data.length) {
            alert('ups')
        }
        for(let i=0; i < pages; i++) {
            console.log(i)
        }
        // pages.forEach((perPage) => {
        //     console.log(perPage)
        // })

    }
}

export default DataTable