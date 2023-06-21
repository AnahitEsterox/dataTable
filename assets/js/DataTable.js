class DataTable {
    constructor(columns=[], data=[], {
        rowClassName = '',
        tableClassName = '',
        tdClassName = '',

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
        this.pageItemClassName = '';

    }

    createTable($dataTableContainer) {



        $dataTableContainer.appendChild(this.table)
        this.table.setAttribute('class', this.tableClassName);
        this.createThead()
        this.handlePagination()

        this.createTbody()
        // this.checkingData()
        this.handleDelete()
        // this.displayList2(0, 10);


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

        // this.data.forEach((i) => {
        //     const $tr = document.createElement('tr');
        //     $tr.setAttribute('class', this.rowClassName);
        //
        //     for(let key in i) {
        //         const $td = document.createElement('td')
        //         $tr.appendChild($td)
        //         this.tbody.appendChild($tr)
        //         $td.innerHTML = i[key]
        //     }
        //     let $tdcheck = document.createElement('td');
        //     let $input = document.createElement('input');
        //     $input.type = 'checkbox';
        //     $tr.appendChild($tdcheck);
        //     $tdcheck.appendChild($input);
        //     const $tdDelete = document.createElement('td');
        //     const $deleteIcon = document.createElement('i');
        //     $deleteIcon.classList.add('fa', 'fa-trash-o');
        //     $tdDelete.setAttribute('class', this.tdClassName);
        //     $deleteIcon.dataset.currentRowId = i.id;
        //     $tdDelete.appendChild($deleteIcon);
        //     $tr.appendChild($tdDelete);
        // })
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
        this.perPageLimit.value = ' ';

        $pageWrapper.setAttribute('class', 'pagination-wrapper');
        this.perPageLimit.type = 'text';
        document.querySelector('.data-table-container ').appendChild($pageWrapper)
        this.displayList2(0, 10);
        this.perPageLimit.addEventListener('change', (e) => {
            this.displayList(this.perPageLimit.value)
            this.perPageLimit.value = " ";
        })

    }

    pageInputValidation() {
        // const itemsCount = this.data.length;
        const countMassage = document.createElement('span');
        // countMassage.innerHTML = `max: ${itemsCount}`;
        document.querySelector('.pagination-wrapper').appendChild(countMassage);
        const enteredValue = this.perPageLimit.value;
        const numbersOnly = /^\d+$/;
        // if(!numbersOnly.test(enteredValue)) {
        //     alert('enter a valid number')
        // }

    }
    displayList2(startCount, endCount) {
        const eachPageItems = this.data.slice(startCount, endCount);
        eachPageItems.forEach((item) => {
            const $tr = document.createElement('tr');
            this.tbody.appendChild($tr)
            $tr.setAttribute('class', this.rowClassName);
            for(let key in item) {
                const $td = document.createElement('td')
                $td.innerHTML = item[key]
                $tr.appendChild($td)
                this.tbody.appendChild($tr)
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
            $deleteIcon.dataset.currentRowId = item.id;
            $tdDelete.appendChild($deleteIcon);
            $tr.appendChild($tdDelete);
        })
    }

    displayList() {

        this.pageInputValidation()
        let pages;

        if(this.data.length == this.perPageLimit.value) {
            pages = this.data.length / this.perPageLimit.value;
        } else if(this.data.length / this.perPageLimit.value !== 0 && this.perPageLimit.value < this.data.length) {
            pages = Math.floor(this.data.length / this.perPageLimit.value) + 1;
        } else if(this.perPageLimit.value > this.data.length) {
            alert('ups')
        }
        const $paginationBox = document.createElement('div');
        $paginationBox.setAttribute('class', 'pagination-box')
        document.querySelector('.data-table-container').appendChild($paginationBox);
        document.querySelector('table').appendChild(this.tbody);

        for(let i=1; i <= pages; i++) {
            const $pageButton = document.createElement('button');
            this.pageItemClassName = 'page-btn';
            $pageButton.innerHTML = i ;
            $pageButton.setAttribute('class', this.pageItemClassName);
            $paginationBox.appendChild($pageButton);
            console.log(i)
            if (i == 1) {
                $pageButton.classList.add('page__item--active');
                this.displayList2(0, 10);
            }
            document.querySelectorAll('.page-btn').forEach((eachItem) => {
                eachItem.addEventListener('click', function() {
                    console.log('here');

                    if(document.querySelector('.page__item--active')){
                        document.querySelector('.page__item--active').classList.remove('page__item--active');
                    }
                    this.classList.add('page-active');
                    let startIndex =  this.perPageLimit.value * parseInt(this.innerHTML);
                    let endIndex= startIndex + this.perPageLimit.value;
                    // document.querySelector('tbody').replaceChildren();
                    DataTable.displayList2(startIndex, endIndex);
                    console.log('startIndex: ', startIndex);
                    console.log('endIndex: ', endIndex);
                })
            })
            // const pageItems = this.data.slice(startIndex, startIndex + this.perPageLimit.value);
            // pageItems.forEach((item) => {
            //     const $tr = document.createElement('tr');
            //     this.tbody.appendChild($tr)
            //     $tr.setAttribute('class', this.rowClassName);
            //     for(let key in item) {
            //         const $td = document.createElement('td')
            //         $td.innerHTML = item[key]
            //         $tr.appendChild($td)
            //         this.tbody.appendChild($tr)
            //     }
            //     let $tdcheck = document.createElement('td');
            //     let $input = document.createElement('input');
            //     $input.type = 'checkbox';
            //     $tr.appendChild($tdcheck);
            //     $tdcheck.appendChild($input);
            //     const $tdDelete = document.createElement('td');
            //     const $deleteIcon = document.createElement('i');
            //     $deleteIcon.classList.add('fa', 'fa-trash-o');
            //     $tdDelete.setAttribute('class', this.tdClassName);
            //     $deleteIcon.dataset.currentRowId = i.id;
            //     $tdDelete.appendChild($deleteIcon);
            //     $tr.appendChild($tdDelete);
            // })
        }
    }
}

export default DataTable