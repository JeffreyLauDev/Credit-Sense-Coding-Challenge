const _ = require("lodash");

function listWithQuery(data, query) {

    const defaultQuery = { _end: 1000, _order: "id", _sort: "desc", _start: 0, _search: null, _searchParam: "name" };
    let { _end, _order, _sort, _start, _search, _searchParam } = { ...defaultQuery, ...query };

    let processingData = data;

    if (!!_search) {
        //FIND OBJECTS THAT MATCHES THE SEARCH PARRAM. SEARCH PARAM IS NOT CASE-SENSITIVE 
        processingData = processingData.filter(obj => obj[_searchParam].toLowerCase().includes(_search.toLowerCase()));
    }

    //DATA SORTING
    processingData = _.orderBy(processingData, _order, _sort);

    //LIMIT & STARING POINT
    processingData = processingData.slice(parseInt(_start), parseInt(_start) + parseInt(_end));

    return processingData

}

module.exports ={
    listWithQuery
}
