// import dataSet from './data.js';
let parameters = {
  columns : [
    {
      title: 'Date Time',
      html: function (row) { return row.datetime; }
    },
    {
      title: 'City',
      html: function (row) { return row.city; }
    },
    {
      title: 'State',
      html: function (row) { return row.state; }  
    },
    {
      title: 'Country',
      html: function (row) { return row.country; }
    },
    {
      title: 'Shape',
      html: function (row) { return row.shape; }
    },
    {
      title: 'Comment',
      html: function (row) { return row.comments; }
    }        
  ],
  data: null,
  filtered_data: null
};

let myd3 = d3.select('#my-d3');
let Clickit = document.getElementById("button");
let form = document.getElementById("form_control")
Clickit.addEventListener("click", dateclick);
// console.log(form.value)


function dateclick() {
  parameters.filtered_data = [];
  for (let row of parameters.data) {
    if (row.datetime === form.value) {
      parameters.filtered_data.push(row);
    }
    else if (form.value == "" ) {
      parameters.filtered_data.push(row);
    }
  }
  // console.log(parameters.filtered_data);
  createTables();
}


function init(dataset) {
  parameters.data = dataset;
  parameters.filtered_data = dataset;
  createTables();
}
// console.log(dataSet)
init(dataSet)

function createTables() {
  myd3.html('');
  let table = d3.select('#my-d3').append('table').attr('class', 'table');

  table.append('thead').append('tr')
    .selectAll('th')
    .data(parameters['columns'])
    .enter()
    .append('th')
    .text(function (data) { return data.title; });

  table.append('tbody')
    .selectAll('tr') // create row for each row of data
    .data(parameters.filtered_data)
    .enter()
    .append('tr')
    .selectAll('td')
    .data(function (row) {
      // evaluate column objects against the current row
      return parameters.columns.map(function (column) {
        var cell = {};
        d3.keys(column).forEach(function (k) {
          if (typeof (column[k]) === 'function') {
            cell[k] = column[k](row)
          }
        });
        return cell;
      });
    }).enter()
    .append('td')
    .text(function (data) { return data.html; });

}

